import { Place } from '@/models';
import PlacesList from './places-list';
import PlacesTable from './places-table';

const Places = ({ places }: { places: Array<Place> }) => {
  return (
    <>
      <PlacesTable className="hidden md:table" places={places} />
      <PlacesList className="block md:hidden" places={places} />
      <div className="mt-2">
        When this area is completed you will be able to do the following for each place:
        <ul className="list-disc list-inside">
          <li className="list-item">Create and view notes (lists, etc)</li>
          <li className="list-item">Log visits including a rating of the experience</li>
          <li className="list-item">View prior visit information</li>
        </ul>
      </div>
    </>
  );
};

export default Places;
