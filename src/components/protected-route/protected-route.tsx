import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIsAuthChecked, userSelector } from '@slices';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  element: JSX.Element;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(userSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  return user ? (
    element
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export const UnauthRoute: FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(userSelector);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  return !user ? element : <Navigate to='/profile' replace />;
};
