import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCreateRegisterMutation } from '../../store/Endpoint';


const Registerform = () => {
  const navigate = useNavigate()
  // const { data: registerDatas, isSuccess } = useGetRegisterQuery()
  const [createUser]=useCreateRegisterMutation()
  const [icon, setIcon] = useState(false)
  // form validation rules
  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(5, 'firstName must be at least 5 characters').max(16, 'firstName lessthan 16 characters').trim(),
    email: Yup.string().required('Email is required').email('Email is invalid').trim(),
    password: Yup.string().required('Password is required').matches(/[A-Z]/, 'Please Give One UpperCase Letter').matches(/[0-9]/, 'Please One Number').matches(/[-!$%^&*()_+|~=`{}[\]:/;<>?,.@#]/, 'Please Give Special Character.. like @#$').trim().min(8, 'Password must be at least 8 characters'),
    role:Yup.string(),
  });

  // functions to build form returned by useForm() hook
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'all'

  });


  const onSubmit = async (data) => {
    console.log(data);
    
    try {
      const getData = await createUser(data)
      if (getData.error && getData.error.data) {
        const errorMessage = getData.error.data.message
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER
        });
      } else {
        const successMsg = getData.data.message
        toast.success(successMsg, {
          position: toast.POSITION.TOP_CENTER
        });
        navigate('/login')
        // navigate('/Dashboard')
      }
    } catch (err) {
      console.log(err.message);
      // const errorMessage = err.response.data.message
      // toast.error(errorMessage, {
      //   position: toast.POSITION.TOP_CENTER
      // });
    }
  }

  return (
    <div className=' container d-grid justify-content-around'>
      <div className="card m-3">
        <h5 className="card-header">
          React - Form Validation Example with React Hook Form
        </h5>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} >
            <div>
              <div>
                <label htmlFor='' className='form-label'>Name</label>
                <input
                  name="name"
                  type="text"
                  {...register('name')}
                  className={`form-control mb-3 ${errors?.name ? 'is-invalid' : ''
                    }`}
                />
                <div className="invalid-feedback">
                  {errors?.name?.message}
                </div>
              </div>
              <div className="">
                <label className='form-label' htmlFor=''>Email</label>
                <input
                  name="email"
                  type="email"
                  {...register('email')}
                  className={`form-control mb-3 ${errors?.email ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors?.email?.message}</div>
              </div>
              <div>
                <label htmlFor="password" className='form-label'>Password</label>
                <div className="input-group mb-3">
                  <input
                    type={icon ? 'text' : 'password'}
                    className={`form-control ${errors?.password ? 'is-invalid' : ''
                      }`}
                    name='password'
                    {...register('password')}
                  />

                  <span onClick={() => setIcon(!icon)} className="input-group-text" id="basic-addon1">{icon ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}</span>

                  <div className="invalid-feedback">{errors?.password?.message}</div>
                </div>
                <div>
    <label htmlFor='' className='form-label'>Role</label>
    <input
        name="role"
        type="text"
        {...register('role')}
        className={`form-control mb-3 ${errors?.role ? 'is-invalid' : ''}`}
    />
    <div className="invalid-feedback">
        {errors?.role?.message}
    </div>
</div>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary me-1">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <button onClick={getAllData} type="button" className=' btn btn-primary'>Click To display Data</button>
      {
        formData.map((item) => (
          <li key={item._id}>
            <p>{item.name}</p>
            <p>{item.age}</p>
          </li>
        ))
      } */}
    </div>
  );
}

export default Registerform