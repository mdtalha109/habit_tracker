import { ReactNode, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import Button from './Button';

const ModalContext = createContext<any>(null);

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  width?: string;
  closeOverlay?: boolean;
  variant?: 'dialog' | 'full-screen';
}

function Modal({ children, isOpen, onClose, width, variant= 'dialog' }: ModalProps) {


  const variants = {
    'full-screen': 'w-[90vw] h-[90vh]',
    'dialog': ''
  }

  return (
    <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed top-0 left-0 z-[1000] w-full h-full flex items-center justify-center bg-gray-950 backdrop-blur-[2px] bg-opacity-60  "
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.1}}
          animate={{ opacity: 1,scale:1 }}
          exit={{ opacity: 0, scale: 0.1 }}
          transition={{ duration: 0.5}}
          className={clsx(`bg-white z-[1001] max-w-[90vw] max-h-[90vh] overflow-auto  flex flex-col rounded-2xl ${width}  `,
            variants[variant])}
          onClick={(e) => e.stopPropagation()}
        >
          <ModalContext.Provider value={onClose}>
            {children}
          </ModalContext.Provider>
        </motion.div>
      </motion.div>
    )} 
  </AnimatePresence>
  );
}

interface ModalSubComponentProps {
  className?: string;
  children: ReactNode;
}

Modal.Header = function Header({ className, children }: ModalSubComponentProps) {
  return <div className={` bg-primary text-white text-lg flex gap-2 z-[1002] md:p-4 rounded-t-2xl p-2 ${className}`}>{children }</div>
};

Modal.Body = function Body({ children }: { children: ReactNode }) {
  return <div className="md:p-4 p-2 relative z-[1002] grow overflow-auto ">{children}</div>;
};

Modal.Footer = function Footer({ children }: { children: ReactNode }) {
  const onClose = useContext(ModalContext);
  return (
   <>
    <hr/>
    <div className="p-2 flex   justify-end items-center">
      
      <Button onClick={onClose} variant='danger'>
          <span className='flex items-center'>
         
          CLOSE
          </span>
         
      </Button>

      {children}
    </div>
   </>
  );
};

export default Modal;