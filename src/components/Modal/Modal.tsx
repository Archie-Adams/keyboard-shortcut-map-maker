import React, { PropsWithChildren, useEffect, useRef } from "react";
import './Modal.scss';

interface IProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal = ({ isOpen, onClose, title, children }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickListener = (event: any) => {
    if (!(ref && ref.current?.contains(event.target))) {
      onClose();
    };
  }

  const handleEscKey = (event: any) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickListener);
    document.addEventListener('keyup', handleEscKey, false);

    return () => {
      document.removeEventListener('mousedown', handleClickListener);
      document.removeEventListener('keyup', handleEscKey, false);
    };
  }, []);

  if (!isOpen) return <></>;

  return (
    <div className="modal-backdrop">
      <div ref={ref} className="modal">
        <div className="modal-header">
          <h4>{title}</h4>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="x-modal-body">
          {children}
          hi
        </div>
      </div>
    </div>
  );
};

export default Modal;
