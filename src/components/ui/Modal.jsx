import React, {
  cloneElement,
  createContext,
  useContext,
  useState
} from 'react';
import { createPortal } from 'react-dom';
import { useCloseOutside } from '../../hooks/useCloseOutside';

export const ModalContext = createContext();

function Modal({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children }) {
  const { setOpen } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => {
      console.log('button is clicked');
      setOpen(true);
    }
  });
}

function Close({ children }) {
  const { setOpen } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => {
      console.log('close button isClicked');
      setOpen(false);
    }
  });
}

function Window({ children }) {
  const { open, setOpen } = useContext(ModalContext);
  const closeRef = useCloseOutside({ keepOpen: setOpen });

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] backdrop-blur-sm transition-all duration-500">
      <div
        ref={closeRef}
        className="fixed top-1/2 left-1/2 z-[1001] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-8 transition-all duration-500"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}


Modal.Open = Open;
Modal.Close = Close;
Modal.Window = Window;

export default Modal;
