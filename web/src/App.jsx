import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from './container/home/Home';
import Dashboard from './container/dashboard/Dashboard';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
