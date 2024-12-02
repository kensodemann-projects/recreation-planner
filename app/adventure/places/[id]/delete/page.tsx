import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import { isLoggedIn } from '@/utils/supabase/auth';
import { canDeletePlace, fetchPlace } from '../../data';
import DeletePlace from './delete-place';

const RemovePlacePage = async (props: { params: Promise<{ id: string }> }) => {
  if (!(await isLoggedIn())) {
    return <MustBeLoggedIn />;
  }

  const params = await props.params;
  const place = await fetchPlace(+params.id);

  if (!place) {
    return <div>Failed to fetch the place</div>;
  }

  const canDelete = await canDeletePlace(place);

  return (
    <>
      <PageHeader>Remove Place</PageHeader>
      <DeletePlace place={place} canDelete={canDelete} />
    </>
  );
};

export default RemovePlacePage;
