import { Place } from '@/models';
import PlaceCard from './ui/place-card';

const Places = ({ places }: { places: Array<Place> }) => {
  return (
    <>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
        {places.map((x) => (
          <PlaceCard place={x} key={x.id} />
        ))}
      </div>
    </>
  );
};

export default Places;
