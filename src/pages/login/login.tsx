// import { FC, SyntheticEvent, useState } from 'react';
// import { LoginUI } from '@ui-pages';
// import { useDispatch } from '@store';
// import { loginUserThunk } from '@slices';
// import { useNavigate } from 'react-router-dom';

// export const Login: FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorText, setErrorText] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = (e: SyntheticEvent) => {
//     e.preventDefault();
//     const loginData = { email, password };
//     dispatch(loginUserThunk(loginData))
//       .unwrap()
//       .then(() => {
//         navigate('/');
//       })
//       .catch(() => {
//         setErrorText('Неверный email или пароль');
//       });
//   };

//   return (
//     <LoginUI
//       errorText={errorText}
//       email={email}
//       setEmail={setEmail}
//       password={password}
//       setPassword={setPassword}
//       handleSubmit={handleSubmit}
//     />
//   );
// };

import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useDispatch } from '@store';
import { loginUserThunk } from '@slices';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const loginData = { email, password };

    dispatch(loginUserThunk(loginData))
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrorText(error || 'Неверный email или пароль');
      });
  };

  return (
    <div>
      <LoginUI
        errorText={errorText}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
