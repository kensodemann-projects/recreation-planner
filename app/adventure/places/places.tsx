import PageHeader from '@/app/ui/page-header';
import { Place } from '@/models';
import PlacesTable from './places-table';
import PlacesList from './places-list';

const DUMMY_DATA: Array<Place> = [
  {
    id: '1',
    name: 'Burnet State Park',
    line1: '23125 255th St.',
    city: 'Cornell',
    state: 'WI',
    postal: '54732',
    typeName: 'State Park',
    phoneNumber: '(715) 239-6888',
  },
  {
    id: '2',
    name: 'Indianapolis Motor Speedway',
    line1: '4790 West 16th Street',
    city: 'Speedway',
    state: 'IN',
    typeName: 'Race Track',
  },
  {
    id: '3',
    name: 'Richard Bong State Park',
    line1: '26313 Burlington Rd.',
    city: 'Kansasville',
    state: 'WI',
    postal: '53139',
    typeName: 'State Park',
    phoneNumber: '(262) 878-5600',
  },
  {
    id: '4',
    name: 'LaBahn Arena',
    line1: '105 East Campus Mall',
    city: 'Madison',
    state: 'WI',
    postal: '53715',
    typeName: 'Sports Arena',
  },
];

const Places = () => {
  return (
    <>
      <PageHeader className="text-center mb-8">Places</PageHeader>
      <PlacesTable className="hidden md:table" places={DUMMY_DATA} />
      <PlacesList className="block md:hidden" places={DUMMY_DATA} />
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
