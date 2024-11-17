import Address from '@/app/ui/address';
import { Place } from '@/models';
import Link from 'next/link';

const PlacesList = ({ className, places }: { className: string; places: Array<Place> }) => {
  return (
    <ul className={`list-none ${className}`}>
      {places.map((place) => (
        <li key={place.id} className="py-2 border-solid first:border-t border-b border-primary">
          <Link href={`places/${place.id}`}>
            <div className="font-bold">{place.name}</div>
            <Address value={place.address} />
            {place.phoneNumber && <div>{place.phoneNumber}</div>}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PlacesList;
