import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// validations using React Hooks //

const validationSchema = Yup.object().shape({
    TrainNumber: Yup.string()
      .required('Train Number is required')
      .matches(/^[\d]{5}\/[\d]{2}$/, 'Train Number must match the pattern: 12345/67'),
  
    TrainName: Yup.string()
      .required('Train Name is required')
      .matches(/^[A-Za-z\s]+$/, 'Train Name must contain only text'),
  
    TotalSeats: Yup.number()
      .typeError('Total Seats must be a number')
      .required('Total Seats is required')
      .positive('Total Seats must be a positive number')
      .min(1, 'Total Seats must be at least 1')
      .max(500, 'Total Seats cannot exceed 500'),
  
    StartPointLocation: Yup.string()
      .required('Start Point is required')
      .matches(/^[A-Za-z\s]+$/, 'Start Point must contain only text'),
  
    EndPointLocation: Yup.string()
      .required('End Point is required')
      .matches(/^[A-Za-z\s]+$/, 'End Point must contain only text'),
  });


  
    const AddTrain = () => {
    const navigate = useNavigate();

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema), mode: "onBlur"
    });

    // the Added values stored in local stoarge onsubmit function by RAJASEKAR //

    function onSubmit(data) {
    
        const currentLogin = JSON.parse(localStorage.getItem('login') || "[]")
        let getval = JSON.parse(localStorage.getItem(`${currentLogin.email}TrainList`) || "[]")
        let id = getval.length + 1;
        localStorage.setItem(`${currentLogin.email}TrainList`, JSON.stringify([...JSON.parse(localStorage.getItem(`${currentLogin.email}TrainList`)) || [], {
            id: id,
            TrainNumber: data.TrainNumber,
            TrainName: data.TrainName,
            TotalSeats: data.TotalSeats,
            StartPointLocation: data.StartPointLocation,
            EndPointLocation: data.EndPointLocation
        }]))

        // Show the toast message
    toast.success('Train added successfully!', {
        position: "bottom-lefy",
        autoClose: 2000, // Duration in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });

    // Redirect to Trainlist after a delay

    setTimeout(() => {
        window.location.href = 'Trainlist'; 

    }, 2000); 
}
   
    // Register form design by RAJASEKAR //

    return (
        <div className='container-fluid d-flex justify-content-center backimage'>            
            <div className="card m-3 bg-transparent">
                <h3 className="card-header text-warning">
                    Add your Train tickets
                </h3>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="form-row">

                            <div className="form-group col text-white">

                                <div className="invalid-feedback">
                                    {errors.id?.message}
                                </div>
                            </div>
                            <div className="form-group col mt-3 text-white">
                                <label>Train Number</label>
                                <input
                                    name="TrainNumber"
                                    type="text"
                                    {...register('TrainNumber')}
                                    className={`form-control ${errors.TrainNumber ? 'is-invalid' : ''
                                        }`}
                                />
                                <div className="invalid-feedback">{errors.TrainNumber?.message}</div>
                            </div>
                        </div>
                        <div className="form-row">

                            <div className="form-group col mt-3 text-white">
                                <label>Train Name</label>
                                <input
                                    name="TrainName"
                                    type="text"
                                    {...register('TrainName')}
                                    className={`form-control ${errors.TrainName ? 'is-invalid' : ''}`}
                                />
                                <div className="invalid-feedback">{errors.TrainName ?.message}</div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col mt-3 text-white">
                                <label>Total Seats</label>
                                <input
                                    name="TotalSeats"
                                    type="number"
                                    {...register('TotalSeats')}
                                    className={`form-control ${errors.TotalSeats ? 'is-invalid' : ''
                                        }`}
                                />
                                <div className="invalid-feedback">{errors.TotalSeats?.message}</div>
                            </div>
                            <div className="form-group col mt-3 text-white">
                                <label>Start Point Location</label>
                                <input
                                    name="StartPointLocation"
                                    type="text"
                                    {...register('StartPointLocation')}
                                    className={`form-control ${errors.StartPointLocation ? 'is-invalid' : ''
                                        }`}
                                />
                                <div className="invalid-feedback">{errors.StartPointLocation?.message}</div>
                            </div>
                            <div className="form-group col mt-3 text-white">
                                <label>End Point Location</label>
                                <input
                                    name="EndPointLocation"
                                    type="text"
                                    {...register('EndPointLocation')}
                                    className={`form-control ${errors.EndPointLocation ? 'is-invalid' : ''
                                        }`}
                                />
                                <div className="invalid-feedback">{errors.EndPointLocation?.message}</div>
                            </div>
                            

                            <div className="form-group mt-4 text-white">
                                <button className="btn btn-warning mr-1 buttons">
                                    AddTrain
                                </button>
                                <button className="btn button5 ms-3 buttons text-black" type="button" onClick={() => reset()}>
                                    clear
                                </button>
                                
                            </div>
                        </div>
                    </form>
                   
                </div>
            </div>
            <div className='button'>
            <button className='btn button3 ms-5 mt-4 buttons' onClick={() => navigate('/Dashboard')}>
                Go to Dashboard
              </button>
              </div>
              <ToastContainer/>
        </div>
    )
}



export default AddTrain;