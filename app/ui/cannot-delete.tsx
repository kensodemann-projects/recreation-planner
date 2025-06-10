'use client';

import { CheckCircleIcon } from '@heroicons/react/24/outline';
import SectionHeader from './section-header';
import SubtitleHeading from './subtitle-heading';

interface CannotDeleteProps {
  entityName: string;
  onClick: () => void;
}

const CannotDelete = ({ entityName, onClick }: CannotDeleteProps) => {
  return (
    <section>
      <SectionHeader className="text-center">
        <SubtitleHeading>{entityName} cannot be removed</SubtitleHeading>
      </SectionHeader>
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
    </section>
  );
};

export default CannotDelete;
