import PageHeader from '@/app/ui/page-header';
import { Place } from '@/models';
import PlacesList from './places-list';
import PlacesTable from './places-table';

const Places = ({ places }: { places: Array<Place> }) => {
  return (
    <>
      <PageHeader>Places</PageHeader>
      <PlacesTable className="hidden md:table" places={places} />
      <PlacesList className="block md:hidden" places={places} />
      <div className="mt-2">
        For each place, you will be able to:
        <ul className="list-disc list-inside">
          <li className="list-item">Create and view notes (lists, etc)</li>
          <li className="list-item">Create Todos</li>
          <li className="list-item">Log visits including a rating of the experience</li>
          <li className="list-item">View prior visit information</li>
        </ul>
      </div>
    </>
  );
};

export default Places;
