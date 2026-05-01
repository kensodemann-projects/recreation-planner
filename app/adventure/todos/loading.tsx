import SkeletonCardGrid from '@/app/ui/skeleton-card-grid';
import SkeletonContainer from '@/app/ui/skeleton-container';
import SkeletonPageHeader from '@/app/ui/skeleton-page-header';

const Loading = () => {
  return (
    <>
      <SkeletonContainer>
        <SkeletonPageHeader />
        <SkeletonCardGrid />
      </SkeletonContainer>
    </>
  );
};

export default Loading;
