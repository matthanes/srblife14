import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
  modalText: string;
  buttonLeft?: string;
  buttonRight?: string;
  leftButtonFunc?: () => void;
  rightButtonFunc?: () => void;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({
  modalText,
  buttonLeft,
  buttonRight,
  leftButtonFunc,
  rightButtonFunc,
  onClose,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [modalContainer] = useState(() => document.createElement('div'));

  useEffect(() => {
    setIsBrowser(true);
    document.body.appendChild(modalContainer);
    return () => {
      document.body.removeChild(modalContainer);
    };
  }, [modalContainer]);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? onClose() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onClose]);

  useEffect(() => {
    // Prevent scrolling on the body when the portal is open
    document.body.style.overflow = 'hidden';

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleLeftButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (leftButtonFunc) {
      leftButtonFunc();
    }
  };

  const handleRightButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (rightButtonFunc) {
      rightButtonFunc();
    }
  };

  if (isBrowser) {
    return ReactDOM.createPortal(
      <div className="fixed bg-slate-700 bg-opacity-60 flex justify-center items-center inset-0 z-50">
        <div className="bg-white px-16 py-8 rounded-md text-center shadow-lg shadow-slate-800 drop-shadow-xl">
          <p className="text-xl mb-4 font-bold text-slate-500 whitespace-pre-wrap">
            {modalText ?? 'No event description'}
          </p>
          {buttonLeft && (
            <button
              onClick={handleLeftButton}
              className="bg-primary px-7 py-2 rounded-md text-md text-white font-semibold"
            >
              {buttonLeft}
            </button>
          )}
          {buttonRight && (
            <button
              onClick={handleRightButton}
              className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
            >
              {buttonRight}
            </button>
          )}
        </div>
      </div>,
      modalContainer
    );
  } else {
    return null;
  }
}

export default Modal;
