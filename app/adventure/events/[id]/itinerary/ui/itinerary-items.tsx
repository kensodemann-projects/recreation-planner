import EntityDropdownMenu from '@/app/ui/entity-dropdown-menu';
import Message from '@/app/ui/message';
import { ItineraryItem } from '@/models';
import { formatDate } from '@/utils/formatters';

export interface ItineraryItemsProps {
  items: ItineraryItem[];
  baseHref: string;
}

const ItineraryItems = ({ baseHref, items }: ItineraryItemsProps) => {
  return items?.length ? (
    <ul className="mt-2 list-none">
      {items.map((item) => (
        <li
          key={item.id}
          className="py-2 border-solid first:border-t border-b border-primary flex"
          data-testid="itinerary item"
        >
          <div className="grow">
            <div className="font-bold text-lg"> {item.name}</div>
            <div className="font-bold">{formatDate(item.date, item.time)}</div>
            {item.description && <p className="mt-2 whitespace-pre-line text-sm">{item.description}</p>}
          </div>
          <div className="self-center">
            <EntityDropdownMenu href={`${baseHref}/${item.id}`} />
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <Message>You have not defined an itinerary for this event.</Message>
  );
};

export default ItineraryItems;
