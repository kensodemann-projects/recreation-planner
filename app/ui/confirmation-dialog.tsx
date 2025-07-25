import { ComponentPropsWithoutRef, useEffect, useRef } from 'react';

interface ConfirmationDialogProperties extends ComponentPropsWithoutRef<'dialog'> {
  title: string;
  message: string;
  isOpen: boolean;
  onResponse: (value: boolean) => void;
}

const ConfirmationDialog = ({ title, message, isOpen, onResponse, ...props }: ConfirmationDialogProperties) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle" onCancel={() => onResponse(false)}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button className="btn" onClick={() => onResponse(true)} autoFocus={true}>
            Yes
          </button>
          <button className="btn" onClick={() => onResponse(false)}>
            No
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmationDialog;
