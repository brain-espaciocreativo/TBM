import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './container/dashboard/Dashboard';
import Login from './container/login/Login';
import Home from './container/home/Home';
import Work from './container/work/WorkContainer';
import WorkForm from './components/works/WorkForm';
import WorkEdit from './components/works/WorkEdit';
import WorkId from './components/works/WorkId';
import Users from './container/users/Users';
import PasswordReset from './components/forgotPassword/PasswordReset';
import ForgotPassword from './components/forgotPassword/ForgotPassword';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Home />} />
        <Route path='/admin' element={<Dashboard />} />
        <Route path='/users' element={<Users />} />
        <Route path='/work' element={<Work/>}/>
        <Route path='/work/create' element={<WorkForm/>}/>
        <Route path='/work/:id' element={<WorkId/>}/>
        <Route path='/work/edit/:id' element={<WorkEdit/>}/>
        <Route path='/resset-password' element={<PasswordReset/>}/>
        <Route path='/reset' element={<ForgotPassword/>}/>
      </Routes>
    </div>
  )
}

export default App
