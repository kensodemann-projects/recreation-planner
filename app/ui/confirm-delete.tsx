'use client';

import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import SectionHeader from './section-header';
import SubtitleHeading from './subtitle-heading';

interface ConfirmDeleteProps {
  entityName: string;
  onConfirm: () => void;
  onDeny: () => void;
}

const ConfirmDelete = ({ entityName, onConfirm, onDeny }: ConfirmDeleteProps) => {
  return (
    <section>
      <SectionHeader className="text-center">
        <SubtitleHeading>{entityName} can be removed</SubtitleHeading>
      </SectionHeader>
      <div className="my-8">
        {entityName} is unused and can be removed. While it is safe to remove this item, doing so cannot be reversed.
        Are you sure you would like to proceed?
      </div>

      <div className="flex justify-center gap-4">
        <button className="btn btn-primary w-24" onClick={onConfirm}>
          Yes
          <CheckCircleIcon className="w-6" />
        </button>
        <button className="btn btn-secondary w-24" onClick={onDeny}>
          No
          <XCircleIcon className="w-6" />
        </button>
      </div>
    </section>
  );
};

export default ConfirmDelete;
