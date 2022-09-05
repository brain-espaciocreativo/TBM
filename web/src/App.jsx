import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './container/dashboard/Dashboard';
import Login from './container/login/Login';
import Home from './container/home/Home';
import PrivateRouteUser from './components/PrivateRouteUser';
import PrivateRouteAdmin from './components/PrivateRouteAdmin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Home />} />
        <Route path='/admin' element={<Dashboard />} />
        {/* <Route exact path="/home" element={<PrivateRouteUser><Home /></PrivateRouteUser>} />
        <Route exact path='/admin' element={<PrivateRouteAdmin><Dashboard /></PrivateRouteAdmin>} />  */}
      </Routes>
    </div>
  )
}

export default App
