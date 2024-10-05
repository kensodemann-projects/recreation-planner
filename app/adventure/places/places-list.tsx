import Address from '@/app/ui/address';
import { Place } from '@/models';

const PlacesList = ({ className, places }: { className: string; places: Array<Place> }) => {
  return (
    <ul className={`list-none ${className}`}>
      {places.map((place) => (
        <li key={place.id} className="py-2 border-solid first:border-t border-b border-primary">
          <div className="font-bold">{place.name}</div>
          <Address value={place.address} />
          {place.phoneNumber && <div>{place.phoneNumber}</div>}
        </li>
      ))}
    </ul>
  );
};

export default PlacesList;
