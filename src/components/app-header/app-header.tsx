import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { getUser } from '@slices';

export const AppHeader: FC = () => {
  const user = useSelector(getUser);
  return <AppHeaderUI userName={user?.name ?? ''} />;
};
