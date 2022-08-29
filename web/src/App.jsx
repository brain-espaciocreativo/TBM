import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from './container/home/Home';
import Dashboard from './container/dashboard/Dashboard';
import Login from './container/login/Login';
import Register from './container/register/Register';


function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
