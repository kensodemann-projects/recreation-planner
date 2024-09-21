import { Place } from '@/models';
import { cityStatePostal } from '@/utils/formatters';

const PlacesList = ({ className, places }: { className: string; places: Array<Place> }) => {
  return (
    <ul className={`list-none ${className}`}>
      {places.map((place) => (
        <li key={place.id} className="py-2 border-solid first:border-t border-b border-primary">
          <div className="font-bold">{place.name}</div>
          {place.line1 && <div>{place.line1}</div>}
          {place.line2 && <div>{place.line2}</div>}
          {(place.city || place.state || place.postal) && (
            <div>{cityStatePostal(place.city, place.state, place.postal)}</div>
          )}
          {place.phoneNumber && <div>{place.phoneNumber}</div>}
        </li>
      ))}
    </ul>
  );
};

export default PlacesList;
