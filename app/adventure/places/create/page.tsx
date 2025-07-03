import MustBeLoggedIn from '@/app/ui/must-be-logged-in';
import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { fetchPlaceTypes } from '../data';
import CreatePlace from './create-place';

const CreatePlacePage = async () => {
  if (await isNotLoggedIn()) {
    return <MustBeLoggedIn />;
  }

  const placeTypes = await fetchPlaceTypes();
  return (
    <>
      <PageHeader>
        <TitleHeading>Add a New Place</TitleHeading>
      </PageHeader>
      <CreatePlace types={placeTypes} />
    </>
  );
};

export default CreatePlacePage;
