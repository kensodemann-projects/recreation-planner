import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { canDeleteEvent, fetchEvent } from '../../data';
import DeleteEvent from './delete-event';

const RemoveEventPage = async (props: { params: Promise<{ id: string }> }) => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const event = await fetchEvent(+params.id);

  if (!event) {
    return <div>Failed to fetch the event</div>;
  }

  const canDelete = await canDeleteEvent(event);

  return (
    <>
      <PageHeader>
        <TitleHeading>Remove Trip / Event</TitleHeading>
      </PageHeader>
      <DeleteEvent event={event} canDelete={canDelete} />
    </>
  );
};

export default RemoveEventPage;
