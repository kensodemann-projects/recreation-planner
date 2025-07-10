interface LabeledFieldProperties {
  children: React.ReactNode;
  label: string;
}

const LabeledField = ({ children, label }: LabeledFieldProperties) => (
  <div>
    <span className="label">{label}:</span> {children}
  </div>
);

export default LabeledField;
