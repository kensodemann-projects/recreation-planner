import PageHeader from '@/app/ui/page-header';
import { Activity } from '@/models';
import ActivitiesTable from './activities-table';
import ActivitiesList from './activities-list';

const DUMMY_DATA: Array<Activity> = [
  {
    id: '1',
    beginDate: '2024-09-19',
    endDate: '2024-09-23',
    description: 'Late Summer Camping Trip',
    locationName: 'Brunet Island State Park',
    typeName: 'Camping',
  },
  {
    id: '73',
    beginDate: '2024-09-27',
    beginTime: '19:00',
    description: "U.W. Women's Hockey vs. Lindenwood - Game #1",
    locationName: 'La Bahn Arena',
    typeName: 'Sporting Event',
  },
  {
    id: '314',
    beginDate: '2024-09-28',
    beginTime: '18:30',
    description: "U.W. Women's Hockey vs. Lindenwood - Game #2",
    locationName: 'La Bahn Arena',
    typeName: 'Sporting Event',
  },
  {
    id: '42',
    beginDate: '2024-10-07',
    endDate: '2024-10-09',
    description: 'Final Camping Trip of the Season',
    locationName: 'Richard Bong State Park',
    typeName: 'Camping',
  },
];

const Activities = () => {
  return (
    <>
      <PageHeader>Trips &amp; Events</PageHeader>;
      <ActivitiesTable className="hidden md:table" activities={DUMMY_DATA} />
      <ActivitiesList className="block md:hidden" activities={DUMMY_DATA} />
    </>
  );
};

export default Activities;
