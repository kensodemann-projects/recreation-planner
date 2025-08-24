import { ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { ComponentPropsWithoutRef, useEffect, useRef } from 'react';

interface AlertDialogProperties extends ComponentPropsWithoutRef<'dialog'> {
  title: string;
  message: string;
  isOpen: boolean;
  alertType?: 'info' | 'warning' | 'error';
  onResponse: (value: boolean) => void;
}

const AlertDialog = ({ title, message, isOpen, alertType, onResponse }: AlertDialogProperties) => {
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
        <div className="flex align-middle gap-4 py-4">
          {alertType &&
            (alertType === 'error' ? (
              <XCircleIcon className="text-error w-24" />
            ) : alertType === 'warning' ? (
              <ExclamationTriangleIcon className="text-warning w-24" />
            ) : (
              <InformationCircleIcon className="text-info w-24" />
            ))}
          <div>{message}</div>
        </div>
        <div className="modal-action">
          <button className="btn" onClick={() => onResponse(true)} autoFocus={true}>
            OK
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AlertDialog;
