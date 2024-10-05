import Address from '@/app/ui/address';
import { Place } from '@/models';

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
                <Address value={place.address} />
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
