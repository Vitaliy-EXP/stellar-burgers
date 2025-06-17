import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import { fetchUserOrdersThunk, userOrdersSelector } from '@slices';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(userOrdersSelector);

  useEffect(() => {
    dispatch(fetchUserOrdersThunk());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
