'use client';

import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import SectionHeading from './section-heading';

interface CannotDeleteProps {
  entityName: string;
  onClick: () => void;
}

const CannotDelete = ({ entityName, onClick }: CannotDeleteProps) => {
  return (
    <>
      <SectionHeading className="text-center">{entityName} cannot be removed</SectionHeading>
      <div className="my-8">
        {entityName} is in use and cannot be removed. If you would like to remove this item, please modify the items
        that are currently using it and then try again.
      </div>

      <div className="text-center">
        <button className="btn btn-primary w-24" onClick={onClick}>
          OK
          <CheckCircleIcon className="w-6" />
        </button>
      </div>
    </>
  );
};

export default CannotDelete;
