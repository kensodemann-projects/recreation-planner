import { Place } from '@/models';
import { cityStatePostal } from '@/utils/formatters';

const PlacesTable = ({ className, places }: { className?: string | undefined; places: Array<Place> }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`table table-zebra ${className || ''}`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {places.map((place) => (
            <tr key={place.id}>
              <th>{place.name}</th>
              <td>
                {place.line1 && <div>{place.line1}</div>}
                {place.line2 && <div>{place.line1}</div>}
                {(place.city || place.state || place.postal) && (
                  <div>{cityStatePostal(place.city, place.state, place.postal)}</div>
                )}
              </td>
              <td>{place.phoneNumber}</td>
              <td>{place.typeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlacesTable;
