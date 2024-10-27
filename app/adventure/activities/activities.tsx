import PageHeader from '@/app/ui/page-header';
import { Activity } from '@/models';
import ActivitiesList from './activities-list';
import ActivitiesTable from './activities-table';

const DUMMY_DATA: Array<Activity> = [
  {
    id: 1,
    beginDate: '2024-09-19',
    endDate: '2024-09-23',
    name: 'Late Summer Camping Trip',
    locationName: 'Brunet Island State Park',
    typeName: 'Camping',
  },
  {
    id: 73,
    beginDate: '2024-09-27',
    beginTime: '19:00',
    name: "U.W. Women's Hockey vs. Lindenwood - Game #1",
    locationName: 'La Bahn Arena',
    typeName: 'Sporting Event',
  },
  {
    id: 314,
    beginDate: '2024-09-28',
    beginTime: '18:30',
    name: "U.W. Women's Hockey vs. Lindenwood - Game #2",
    locationName: 'La Bahn Arena',
    typeName: 'Sporting Event',
  },
  {
    id: 42,
    beginDate: '2024-10-07',
    endDate: '2024-10-09',
    name: 'Final Camping Trip of the Season',
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
      <div className="mt-2">
        For each activity, you will be able to:
        <ul className="list-disc list-inside">
          <li className="list-item">Create and view notes (lists, etc)</li>
          <li className="list-item">Create Todos</li>
          <li className="list-item">Packing List</li>
          <li className="list-item">Shopping List</li>
          <li className="list-item">List of sites to see</li>
          <li className="list-item">Schedule</li>
        </ul>
      </div>
    </>
  );
};

export default Activities;
