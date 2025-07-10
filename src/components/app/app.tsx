import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';
import { fetchIngredients, fetchUserThunk, getIsAuthChecked } from '@slices';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import { AppHeader, IngredientDetails, OrderInfo, Modal } from '@components';
import styles from './app.module.css';
import { ProtectedRoute, UnauthRoute } from '@components';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(getIsAuthChecked);

  useEffect(() => {
    dispatch(fetchIngredients());

    if (!isAuthChecked) {
      dispatch(fetchUserThunk());
    }
  }, [dispatch, isAuthChecked]);

  const location = useLocation();
  const state = location.state as { background?: Location };
  const backgroundLocation = state?.background;
  const navigate = useNavigate();

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route path='/login' element={<UnauthRoute element={<Login />} />} />
        <Route
          path='/register'
          element={<UnauthRoute element={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<UnauthRoute element={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<UnauthRoute element={<ResetPassword />} />}
        />
        <Route
          path='/profile'
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute element={<ProfileOrders />} />}
        />
        <Route
          path='/profile/orders/:number'
          element={<ProtectedRoute element={<OrderInfo />} />}
        />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute
                element={
                  <Modal onClose={() => navigate(-1)}>
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
