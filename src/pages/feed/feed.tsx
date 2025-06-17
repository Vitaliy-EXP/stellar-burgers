import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';

import { getFeedsThunk, ordersSelector, isFeedsLoadingSelector } from '@slices';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(isFeedsLoadingSelector);
  const orders = useSelector(ordersSelector);

  const handleGetFeeds = () => {
    dispatch(getFeedsThunk());
  };

  useEffect(() => {
    handleGetFeeds();
  }, []);

  if (isLoading || !orders || !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
