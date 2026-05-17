'use client';

interface ShowAllToggleProperties {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const ShowAllToggle = ({ checked, onChange }: ShowAllToggleProperties) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        className="checkbox checkbox-sm"
        defaultChecked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="text-sm">Show All</span>
    </label>
  );
};

export default ShowAllToggle;
