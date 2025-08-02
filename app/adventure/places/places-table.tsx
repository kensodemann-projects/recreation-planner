import Address from '@/app/ui/address';
import EntityDropdownMenu from '@/app/ui/entity-dropdown-menu';
import { Place } from '@/models';
import Link from 'next/link';

const PlacesTable = ({ className, places }: { className?: string | undefined; places: Array<Place> }) => {
  return (
    <table className={`table-zebra ${className || ''}`}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Phone Number</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {places.map((place) => (
          <tr key={place.id}>
            <th>
              <Link href={`places/${place.id}`}>{place.name}</Link>
            </th>
            <td>{place.address && <Address value={place.address} />}</td>
            <td>{place.phoneNumber}</td>
            <td>{place.type.name}</td>
            <td>
              <EntityDropdownMenu href={`places/${place.id}`} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PlacesTable;
