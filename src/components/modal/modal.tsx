import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';
import { useNavigate } from 'react-router-dom';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  const navigate = useNavigate();
  // Используем onClose из props или fallback
  const handleClose = onClose ?? (() => navigate(-1));
  useEffect(() => {
    const onClose = () => {
      navigate(-1); // Возврат к предыдущей странице
    };
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [handleClose]);

  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={handleClose}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
