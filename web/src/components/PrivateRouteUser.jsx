import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRouteUser = ({ children }) => {

    const userSelect = useSelector((state) => state.users.user)

    return Object.keys(userSelect).length ? children : <Navigate to={'/'} />
}

export default PrivateRouteUser
