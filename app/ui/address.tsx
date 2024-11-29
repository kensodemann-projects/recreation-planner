import { Address as AddressModel } from '@/models';
import { cityStatePostal } from '@/utils/formatters';

interface AddressProperties {
  value: AddressModel;
}

const Address = ({ value }: AddressProperties) => {
  if (!value) {
    return undefined;
  }

  return (
    <>
      {value.line1 && <div>{value.line1}</div>}
      {value.line2 && <div>{value.line2}</div>}
      {(value.city || value.state || value.postal) && (
        <div>{cityStatePostal(value.city, value.state, value.postal)}</div>
      )}
    </>
  );
};

export default Address;
