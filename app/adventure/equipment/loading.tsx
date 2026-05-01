import SkeletonContainer from '@/app/ui/skeleton-container';
import SkeletonLineFull from '@/app/ui/skeleton-line-full';
import SkeletonPageHeader from '@/app/ui/skeleton-page-header';

const Loading = () => {
  return (
    <>
      <SkeletonContainer>
        <SkeletonPageHeader />
        <SkeletonLineFull />
        <SkeletonLineFull />
        <SkeletonLineFull />
      </SkeletonContainer>
    </>
  );
};

export default Loading;
