import Address from '@/app/ui/address';
import SectionHeading from '@/app/ui/section-heading';
import { Event } from '@/models';
import { formatDateRange } from '@/utils/formatters';

interface EventDetailsProps {
  event: Event;
}

const EventDetails = ({ event }: EventDetailsProps) => {
  const addressInformation =
    event.place.address &&
    (event.place.address.line1 ||
      event.place.address.line2 ||
      event.place.address.city ||
      event.place.address.state ||
      event.place.address.postal) ? (
      <Address value={event.place.address} />
    ) : undefined;

  return (
    <>
      <section>
        <SectionHeading>{event.name}</SectionHeading>
        <div>{event.type.name}</div>
        <div>{formatDateRange(event.beginDate, event.beginTime, event.endDate, event.endTime)}</div>
        <div className="mt-4 whitespace-pre-line">{event.description}</div>
      </section>

      <section>
        <SectionHeading>Location</SectionHeading>
        <div>{event.place.name}</div>
        {addressInformation}
        <div>{event.place.website}</div>
        <div>{event.place.phoneNumber}</div>
      </section>
    </>
  );
};

export default EventDetails;
