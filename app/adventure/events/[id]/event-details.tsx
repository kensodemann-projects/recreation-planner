import Address from '@/app/ui/address';
import SectionHeader from '@/app/ui/section-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import { Event } from '@/models';
import { formatDateRange } from '@/utils/formatters';
import EventDetailsTabs from './event-details-tabs';

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
        <SectionHeader>
          <SubtitleHeading>{event.name}</SubtitleHeading>
        </SectionHeader>
        <div>{event.type.name}</div>
        <div>{formatDateRange(event.beginDate, event.beginTime, event.endDate, event.endTime)}</div>
        <div className="mt-4 whitespace-pre-line">{event.description}</div>
      </section>

      <section>
        <SectionHeader>
          <SubtitleHeading>Location</SubtitleHeading>
        </SectionHeader>
        <div>{event.place.name}</div>
        {addressInformation}
        {event.place.website && (
          <div>
            <a className="link" href={event.place.website} target="_blank">
              {event.place.website}
            </a>
          </div>
        )}
        <div>{event.place.phoneNumber}</div>
      </section>

      <EventDetailsTabs event={event} />
    </>
  );
};

export default EventDetails;
