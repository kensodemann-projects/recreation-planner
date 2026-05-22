import Address from '@/app/ui/address';
import { Place } from '@/models';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import PlaceTypeIcon from './place-type-icon';

export interface PlaceCardProps {
  place: Place;
  callingPage?: string;
}

const PlaceCard = ({ place, callingPage }: PlaceCardProps) => {
  const searchParams = callingPage ? `?callingPage=${callingPage}` : '';

  return (
    <div className="card card-border bg-base-100">
      <div className="card-body">
        <h3 className="card-title justify-between">
          <Link href={`/adventure/places/${place.id}${searchParams}`}>{place.name}</Link>
          <PlaceTypeIcon typeName={place.type.name} />
        </h3>
        <h4 className="card-sub-title">{place.type.name}</h4>

        <Address value={place.address} />
        {place.phoneNumber && <div>{place.phoneNumber}</div>}

        <div className="grow" />

        <div className="card-actions justify-end items-center mt-6">
          <Link
            href={`/adventure/places/${place.id}/delete${searchParams}`}
            className="btn btn-error btn-outline btn-circle"
            aria-label="Delete the place"
          >
            <TrashIcon className="w-6" />
          </Link>
          <Link
            href={`/adventure/places/${place.id}/update${searchParams}`}
            className="btn btn-secondary btn-outline btn-circle"
            aria-label="Edit the place"
          >
            <PencilSquareIcon className="w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
