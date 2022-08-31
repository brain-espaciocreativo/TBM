import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './container/dashboard/Dashboard';
import Login from './container/login/Login';
import Home from './container/home/Home'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/admin' element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
