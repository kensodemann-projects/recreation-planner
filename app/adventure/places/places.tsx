import { Place } from '@/models';
import PlacesList from './places-list';
import PlacesTable from './places-table';

const Places = ({ places }: { places: Array<Place> }) => {
  return (
    <>
      <PlacesTable className="hidden md:table" places={places} />
      <PlacesList className="block md:hidden" places={places} />
    </>
  );
};

export default Places;
