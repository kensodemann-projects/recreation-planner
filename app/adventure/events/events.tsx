import { Event } from '@/models';
import EventsList from './events-list';
import EventsTable from './events-table';

const DUMMY_DATA: Array<Event> = [
  {
    id: 1,
    beginDate: '2024-09-19',
    endDate: '2024-09-23',
    name: 'Late Summer Camping Trip',
    place: { id: 1, name: 'Brunet Island State Park', address: {}, type: { id: 1, name: 'State Park' } },
    type: {
      id: 1,
      name: 'Camping',
    },
  },
  {
    id: 73,
    beginDate: '2024-09-27',
    beginTime: '19:00',
    name: "U.W. Women's Hockey vs. Lindenwood - Game #1",
    place: { id: 3, name: 'La Bahn Arena', address: {}, type: { id: 4, name: 'Sports Arena' } },
    type: {
      id: 2,
      name: 'Sporting Event',
    },
  },
  {
    id: 314,
    beginDate: '2024-09-28',
    beginTime: '18:30',
    name: "U.W. Women's Hockey vs. Lindenwood - Game #2",
    place: { id: 3, name: 'La Bahn Arena', address: {}, type: { id: 4, name: 'Sports Arena' } },
    type: {
      id: 2,
      name: 'Sporting Event',
    },
  },
  {
    id: 42,
    beginDate: '2024-10-07',
    endDate: '2024-10-09',
    name: 'Final Camping Trip of the Season',
    place: { id: 42, name: 'Richard Bong State Park', address: {}, type: { id: 1, name: 'State Park' } },
    type: {
      id: 1,
      name: 'Camping',
    },
  },
];

const Events = () => {
  return (
    <>
      <EventsTable className="hidden md:table" events={DUMMY_DATA} />
      <EventsList className="block md:hidden" events={DUMMY_DATA} />
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

export default Events;
