interface SkeletonContainerProperties {
  children: React.ReactNode;
}

const SkeletonContainer = ({ children }: SkeletonContainerProperties) => {
  return <div className="space-y-4">{children}</div>;
};

export default SkeletonContainer;
