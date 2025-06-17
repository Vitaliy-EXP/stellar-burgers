import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '@store';
import { registerUserThunk } from '@slices';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const registerData = { name: userName, email, password };
    dispatch(registerUserThunk(registerData))
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        const errorMessage =
          typeof error === 'string'
            ? error
            : error.payload || 'Ошибка регистрации. Попробуйте снова.';
        setErrorText(errorMessage);
      });
  };

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
