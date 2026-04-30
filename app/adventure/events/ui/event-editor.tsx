import AlertDialog from '@/app/ui/alert-dialog';
import BusyIndicator from '@/app/ui/busy-indicator';
import Description from '@/app/ui/description';
import Input from '@/app/ui/input';
import Select from '@/app/ui/select';
import { useForm } from '@/hooks/use-form';
import { Event, EventType, Place } from '@/models';
import { isRequired } from '@/utils/input-validations';
import { useState } from 'react';

export interface EventEditorProps {
  places: Array<Place>;
  types: Array<EventType>;
  event?: Event;
  onConfirm: (event: Event) => void;
  onCancel: () => void;
}

const EventEditor = ({ event, types, places, onCancel, onConfirm }: EventEditorProps) => {
  const { fields, isDirty } = useForm({
    eventName: { initialValue: event?.name || '', validate: (v: string | undefined) => isRequired(v, 'Name') },
    eventTypeId: { initialValue: event?.type.id || types[0]?.id },
    eventPlaceId: { initialValue: event?.place.id || places[0]?.id },
    eventBeginDate: {
      initialValue: event?.beginDate || '',
      validate: (v: string | undefined) => isRequired(v, 'Begin Date'),
    },
    eventBeginTime: { initialValue: event?.beginTime || '' },
    eventEndDate: { initialValue: event?.endDate || '' },
    eventEndTime: { initialValue: event?.endTime || '' },
    eventDescription: { initialValue: event?.description || '' },
  });

  const [alertPlaceCreation, setAlertPlaceCreation] = useState(false);
  const [busy, setBusy] = useState(false);

  const requiredFieldsHaveValues = !!(fields.eventName.value.trim() && fields.eventBeginDate.value.trim());
  const disableConfirmButton = !(requiredFieldsHaveValues && isDirty);

  const handleConfirm = () => {
    const event = buildEvent();
    onConfirm(event);
  };

  const buildEvent = (): Event => ({
    id: event?.id,
    name: fields.eventName.value,
    beginDate: fields.eventBeginDate.value,
    beginTime: fields.eventBeginTime.value,
    endDate: fields.eventEndDate.value,
    endTime: fields.eventEndTime.value,
    type: types.find((x) => x.id === fields.eventTypeId.value) || types[0],
    place: places.find((x) => x.id === fields.eventPlaceId.value) || places[0],
    description: fields.eventDescription.value,
  });

  return (
    <div className="p-2 md:p-4">
      <div className="grid grid-cols-4 gap-x-4">
        <Input
          id="event-name"
          className="col-span-4"
          disabled={busy}
          type="text"
          label="Name"
          value={fields.eventName.value}
          error={fields.eventName.error}
          onBlur={fields.eventName.validate}
          onChange={(evt) => fields.eventName.setValue(evt.target.value)}
        />
        <Select
          id="event-type"
          className="col-span-4 md:col-span-2"
          disabled={busy}
          label="Type of Trip / Event"
          value={fields.eventTypeId.value}
          values={types}
          onChange={(evt) => fields.eventTypeId.setValue(+evt.target.value)}
        />
        <Select
          id="event-place"
          className="col-span-4 md:col-span-2"
          disabled={busy}
          label="Location"
          value={fields.eventPlaceId.value}
          values={places}
          onChange={(evt) => {
            const id = +evt.target.value;
            fields.eventPlaceId.setValue(id);
            if (id < 0) {
              setAlertPlaceCreation(true);
            }
          }}
        />
        <Input
          id="event-begin-date"
          className="col-span-4 md:col-span-1"
          disabled={busy}
          type="date"
          label="Begin Date"
          value={fields.eventBeginDate.value}
          error={fields.eventBeginDate.error}
          onBlur={fields.eventBeginDate.validate}
          onChange={(evt) => fields.eventBeginDate.setValue(evt.target.value)}
        />
        <Input
          id="event-begin-time"
          className="col-span-4 md:col-span-1"
          disabled={busy}
          type="time"
          label="Begin Time"
          value={fields.eventBeginTime.value}
          onChange={(evt) => fields.eventBeginTime.setValue(evt.target.value)}
        />
        <Input
          id="event-end-date"
          className="col-span-4 md:col-span-1"
          disabled={busy}
          type="date"
          label="End Date"
          value={fields.eventEndDate.value}
          onChange={(evt) => fields.eventEndDate.setValue(evt.target.value)}
        />
        <Input
          id="event-end-time"
          className="col-span-4 md:col-span-1"
          disabled={busy}
          type="time"
          label="End Time"
          value={fields.eventEndTime.value}
          onChange={(evt) => fields.eventEndTime.setValue(evt.target.value)}
        />
        <Description
          id="event-description"
          className="col-span-4"
          disabled={busy}
          label="Description"
          rows={5}
          value={fields.eventDescription.value}
          onChange={(evt) => fields.eventDescription.setValue(evt.target.value)}
        />
      </div>
      <div className="flex flow-row gap-8 justify-end mt-4">
        <button className="btn" onClick={() => onCancel()} disabled={busy}>
          Cancel
        </button>
        <button
          className="btn btn-primary min-w-24"
          disabled={disableConfirmButton || busy}
          onClick={() => {
            setBusy(true);
            handleConfirm();
          }}
        >
          {busy ? BusyIndicator : event ? 'Update' : 'Create'}
        </button>
      </div>
      <AlertDialog
        title="Place will be generated"
        message="Using this option will generate a minimally speciffied Place once the event is saved. Please modify the generated place as appropriate."
        isOpen={alertPlaceCreation}
        alertType="info"
        onResponse={() => setAlertPlaceCreation(false)}
      />
    </div>
  );
};

export default EventEditor;
