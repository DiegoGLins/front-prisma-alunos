import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const userRedux = useAppSelector((state) => state.alunoLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (userRedux.id === '') {
      navigate('/login');
    }
  }, [userRedux]);

  return <>{children}</>;
};

export default PrivateRoute;
