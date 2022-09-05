import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRouteAdmin = ({ children }) => {

  const userSelect = useSelector((state) => state.users.user)

    return userSelect.role === 'admin' ? children : <Navigate to={'/'} />
}

export default PrivateRouteAdmin