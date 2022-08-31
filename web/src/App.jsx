import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './container/dashboard/Dashboard';
import Login from './container/login/Login';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/admin' element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
