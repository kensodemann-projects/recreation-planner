import { Activity } from '@/models';
import { formatDateRange } from '@/utils/formatters';

const ActivitiesList = ({ className, activities }: { className: string; activities: Array<Activity> }) => {
  return (
    <ul className={`list-none ${className}`}>
      {activities.map((activity) => (
        <li key={activity.id} className="py-2 border-solid first:border-t border-b border-primary">
          <div className="font-bold">
            {formatDateRange(activity.beginDate, activity.beginTime, activity.endDate, activity.endTime)}
          </div>
          <div>
            {activity.typeName}: {activity.name}
          </div>
          <div>{activity.locationName}</div>
        </li>
      ))}
    </ul>
  );
};

export default ActivitiesList;
