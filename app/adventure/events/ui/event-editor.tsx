import Description from '@/app/ui/description';
import Input from '@/app/ui/input';
import Select from '@/app/ui/select';
import { useFormControl } from '@/hooks/use-form-control';
import { Event, EventType, SelectablePlace } from '@/models';
import { isRequired } from '@/utils/input-validations';

export interface EventEditorProps {
  places: Array<SelectablePlace>;
  types: Array<EventType>;
  event?: Event | undefined;
  onConfirm: (event: Event) => void;
  onCancel: () => void;
}

const EventEditor = ({ event, types, places, onCancel, onConfirm }: EventEditorProps) => {
  const {
    value: eventName,
    dirty: eventNameDirty,
    error: eventNameError,
    touched: eventNameTouched,
    handleChange: handleEventNameChange,
    handleBlur: handleEventNameBlur,
  } = useFormControl(event?.name || '', (value: string | undefined) => isRequired(value, 'Name'));
  const {
    value: eventTypeId,
    dirty: eventTypeDirty,
    handleChange: setEventTypeId,
  } = useFormControl(event?.type.id || types[0]?.id);
  const {
    value: eventPlaceId,
    dirty: eventPlaceDirty,
    handleChange: setEventPlaceId,
  } = useFormControl(event?.place.id || places[0]?.id);
  const {
    value: eventBeginDate,
    dirty: eventBeginDateDirty,
    error: eventBeginDateError,
    touched: eventBeginDateTouched,
    handleChange: handleEventBeginDateChange,
    handleBlur: handleEventBeginDateBlur,
  } = useFormControl(event?.beginDate || '', (value: string | undefined) => isRequired(value, 'Begin Date'));
  const {
    value: eventBeginTime,
    dirty: eventBeginTimeDirty,
    handleChange: setEventBeginTime,
  } = useFormControl(event?.beginTime || '');
  const {
    value: eventEndDate,
    dirty: eventEndDateDirty,
    handleChange: setEventEndDate,
  } = useFormControl(event?.endDate || '');
  const {
    value: eventEndTime,
    dirty: eventEndTimeDirty,
    handleChange: setEventEndTime,
  } = useFormControl(event?.endTime || '');
  const {
    value: eventDescription,
    dirty: eventDescriptionDirty,
    handleChange: setEventDescription,
  } = useFormControl(event?.description || '');

  const disableButton =
    !!(eventNameError || eventBeginDateError) ||
    !(
      eventNameDirty ||
      eventTypeDirty ||
      eventPlaceDirty ||
      eventBeginDateDirty ||
      eventBeginTimeDirty ||
      eventEndDateDirty ||
      eventEndTimeDirty ||
      eventDescriptionDirty
    );

  const handleConfirm = () => {
    const event = buildEvent();
    onConfirm(event);
  };

  const buildEvent = (): Event => ({
    id: event?.id,
    name: eventName?.trim() || '',
    beginDate: eventBeginDate || '',
    beginTime: eventBeginTime || null,
    endDate: eventEndDate || null,
    endTime: eventEndTime || null,
    type: types.find((x) => x.id === eventTypeId) || types[0],
    place: places.find((x) => x.id === eventPlaceId) || places[0],
    description: eventDescription?.trim() || null,
  });

  return (
    <div className="p-2 md:p-4">
      <div className="grid grid-cols-4 gap-x-4">
        <Input
          id="event-name"
          className="col-span-4 md:col-span-3"
          type="text"
          label="Name"
          value={eventName}
          error={eventNameTouched ? eventNameError : ''}
          onBlur={handleEventNameBlur}
          onChange={(evt) => handleEventNameChange(evt.target.value)}
        />
        <Select
          id="event-type"
          className="col-span-4 md:col-span-1"
          label="Type of Event / Trip"
          value={eventTypeId}
          values={types}
          onChange={(evt) => setEventTypeId(+evt.target.value)}
        />
        <Select
          id="event-place"
          className="col-span-4"
          label="Location"
          value={eventPlaceId}
          values={places}
          onChange={(evt) => setEventPlaceId(+evt.target.value)}
        />
        <Input
          id="event-begin-date"
          className="col-span-4 md:col-span-1"
          type="date"
          label="Begin Date"
          value={eventBeginDate}
          error={eventBeginDateTouched ? eventBeginDateError : ''}
          onBlur={handleEventBeginDateBlur}
          onChange={(evt) => handleEventBeginDateChange(evt.target.value)}
        />
        <Input
          id="event-begin-time"
          className="col-span-4 md:col-span-1"
          type="time"
          label="Begin Time"
          value={eventBeginTime}
          onChange={(evt) => setEventBeginTime(evt.target.value)}
        />
        <Input
          id="event-end-date"
          className="col-span-4 md:col-span-1"
          type="date"
          label="End Date"
          value={eventEndDate}
          onChange={(evt) => setEventEndDate(evt.target.value)}
        />
        <Input
          id="event-end-time"
          className="col-span-4 md:col-span-1"
          type="time"
          label="End Time"
          value={eventEndTime}
          onChange={(evt) => setEventEndTime(evt.target.value)}
        />
        <Description
          id="event-description"
          className="col-span-4"
          label="Description"
          rows={5}
          value={eventDescription}
          onChange={(evt) => setEventDescription(evt.target.value)}
        />
      </div>
      <div className="flex flow-row gap-8 justify-end mt-4">
        <button className="btn" onClick={() => onCancel()}>
          Cancel
        </button>
        <button className="btn btn-primary" disabled={disableButton} onClick={handleConfirm}>
          {event ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
};

export default EventEditor;
