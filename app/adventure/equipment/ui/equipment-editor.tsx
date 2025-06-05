export interface EquipmentEditorProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const EquipmentEditor = ({ onCancel }: EquipmentEditorProps) => {
  return (
    <div className="p-2 md:p-4">
      <div className="flex flow-row gap-8 justify-end mt-4">
        <button className="btn" onClick={() => onCancel()}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EquipmentEditor;
