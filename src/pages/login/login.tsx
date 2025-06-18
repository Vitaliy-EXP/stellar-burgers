import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch } from '@store';
import { loginUserThunk } from '@slices';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginUI } from '@ui-pages';
import { useForm } from '@hooks';

export const Login: FC = () => {
  const [form, handleChange] = useForm({ email: '', password: '' });
  const [errorText, setErrorText] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(loginUserThunk(form))
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
        email={form.email}
        setEmail={(value) =>
          handleChange({ target: { name: 'email', value } } as any)
        }
        password={form.password}
        setPassword={(value) =>
          handleChange({ target: { name: 'password', value } } as any)
        }
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
