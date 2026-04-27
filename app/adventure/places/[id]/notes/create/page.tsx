import PageHeader from '@/app/ui/page-header';
import SubtitleHeading from '@/app/ui/subtitle-heading';
import TitleHeading from '@/app/ui/title-heading';
import { fetchPlace } from '../../../data';
import CreateNote from './create-note';

const CreateNoteForPlacePage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const place = await fetchPlace(+params.id);

  if (!place) {
    return <div>Failed to fetch the place</div>;
  }

  return (
    <>
      <PageHeader>
        <TitleHeading>Add a New Note</TitleHeading>
        <SubtitleHeading>For Place: {place.name || ''}</SubtitleHeading>
      </PageHeader>
      <CreateNote placeRid={place.id!} />
    </>
  );
};

export default CreateNoteForPlacePage;
