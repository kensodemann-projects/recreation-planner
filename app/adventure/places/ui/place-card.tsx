import Address from '@/app/ui/address';
import LabeledField from '@/app/ui/labeled-field';
import { Place } from '@/models';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export interface PlaceCardProps {
  place: Place;
  callingPage?: string;
}

const PlaceCard = ({ place, callingPage }: PlaceCardProps) => {
  const searchParams = callingPage ? `?callingPage=${callingPage}` : '';

  return (
    <div className="card card-border bg-base-100">
      <div className="card-body">
        <h3 className="card-title">
          <Link href={`/adventure/places/${place.id}${searchParams}`}>{place.name}</Link>
        </h3>
        <h4 className="card-sub-title">{place.type.name}</h4>

        <Address value={place.address} />
        {place.phoneNumber && <div>{place.phoneNumber}</div>}

        <div className="card-actions justify-end items-center mt-6">
          <Link href={`/adventure/places/${place.id}/delete${searchParams}`}>
            <button className="btn btn-error btn-outline btn-circle" aria-label="Delete the place">
              <TrashIcon className="w-6" />
            </button>
          </Link>
          <Link href={`/adventure/places/${place.id}/update${searchParams}`}>
            <button className="btn btn-secondary btn-outline btn-circle" aria-label="Edit the place">
              <PencilSquareIcon className="w-6" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
