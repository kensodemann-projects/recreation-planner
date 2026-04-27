import PageHeader from '@/app/ui/page-header';
import TitleHeading from '@/app/ui/title-heading';
import { fetchEquipmentTypes } from '../data';
import CreateEquipment from './create-equipment';

const CreateEquipmentPage = async () => {
  const equipmentTypes = await fetchEquipmentTypes();

  return (
    <>
      <PageHeader>
        <TitleHeading>Add a New Piece of Equipment</TitleHeading>
      </PageHeader>
      <CreateEquipment equipmentTypes={equipmentTypes} />
    </>
  );
};

export default CreateEquipmentPage;
