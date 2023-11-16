import './App.css'
import { Route, Routes } from 'react-router-dom';
import Registerform from './TrainProject/register/Registerform';
import Dashboard from './TrainProject/dashboard/Dashboard';
import EditList from './TrainProject/trainlist/EditList';
import Loginform from './TrainProject/login/Loginform';
import Header from './TrainProject/header/Header';
import AdminPanel from './TrainProject/trainlist/AdminPanel';
// import Updateform from './components/Updateform';
// import Imageupload from './components/Imageupload';

function App() {
  return (
      <div className='container-fluid'>       
      <Routes>
      <Route path='/' element={<Header/>}/>
      <Route path='/register' element={<Registerform/>}/>
      <Route path='/login' element={<Loginform/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>
      <Route path='/editUSer/:id' element={<EditList/>}/>
      <Route path='/adminPanel' element={<AdminPanel/>} />
      {/* <Route path='/update' element={<Updateform/>}/>
      <Route path='/upload' element={<Imageupload/>}/> */}
      </Routes>
      </div>
  );
}

export default App;