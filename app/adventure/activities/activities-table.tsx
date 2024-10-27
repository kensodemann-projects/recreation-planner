import { Activity } from '@/models';
import { formatDateRange } from '@/utils/formatters';

const ActivitiesTable = ({
  className,
  activities,
}: {
  className?: string | undefined;
  activities: Array<Activity>;
}) => {
  return (
    <table className={`table table-zebra ${className || ''}`}>
      <thead>
        <tr>
          <th>Dates</th>
          <th>Name</th>
          <th>Location</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity) => (
          <tr key={activity.id}>
            <th>{formatDateRange(activity.beginDate, activity.beginTime, activity.endDate, activity.endTime)}</th>
            <td>{activity.name}</td>
            <td>{activity.locationName}</td>
            <td>{activity.typeName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ActivitiesTable;
