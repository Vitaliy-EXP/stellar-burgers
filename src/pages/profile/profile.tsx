// import { ProfileUI } from '@ui-pages';
// import { FC, SyntheticEvent, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from '@store';
// import { fetchUserThunk, getUser, getUserLoading } from '@slices';

// export const Profile: FC = () => {
//   const dispatch = useDispatch();
//   const user = useSelector(getUser);
//   const isLoading = useSelector(getUserLoading);

//   const [formValue, setFormValue] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });

//   useEffect(() => {
//     setFormValue((prevState) => ({
//       ...prevState,
//       name: user?.name || '',
//       email: user?.email || ''
//     }));
//   }, [user]);

//   const isFormChanged =
//     formValue.name !== user?.name ||
//     formValue.email !== user?.email ||
//     !!formValue.password;

//   const handleSubmit = (e: SyntheticEvent) => {
//     e.preventDefault();
//   };

//   const handleCancel = (e: SyntheticEvent) => {
//     e.preventDefault();
//     setFormValue({
//       name: user.name,
//       email: user.email,
//       password: ''
//     });
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormValue((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value
//     }));
//   };

//   return (
//     <ProfileUI
//       formValue={formValue}
//       isFormChanged={isFormChanged}
//       handleCancel={handleCancel}
//       handleSubmit={handleSubmit}
//       handleInputChange={handleInputChange}
//     />
//   );

//   return null;
// };

import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@store';
import {
  fetchUserThunk,
  getUser,
  getUserLoading,
  updateUserThunk
} from '@slices';
import { ProfileUI } from '@ui-pages';
import { TRegisterData } from '@api';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const isLoading = useSelector(getUserLoading);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (!user && !isLoading) {
      dispatch(fetchUserThunk())
        .unwrap()
        .catch((error) => {
          console.log('Profile: Ошибка загрузки пользователя:', error);
        });
    }
  }, [dispatch, user, isLoading]);

  useEffect(() => {
    if (user) {
      setFormValue((prevState) => ({
        ...prevState,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const isFormChanged =
    formValue.name !== (user?.name || '') ||
    formValue.email !== (user?.email || '') ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const dataToSend: Partial<TRegisterData> = {
      name: formValue.name,
      email: formValue.email
    };

    if (formValue.password) {
      dataToSend.password = formValue.password;
    }

    dispatch(updateUserThunk(dataToSend))
      .unwrap()
      .then(() => {
        setFormValue((prev) => ({
          ...prev,
          password: ''
        }));
      })
      .catch((err) => {
        console.log('Ошибка обновления профиля:', err);
      });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!user) {
    return <div>Ошибка загрузки данных</div>;
  }

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
