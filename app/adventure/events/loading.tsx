import SkeletonCardGrid from '@/app/ui/skeleton-card-grid';
import SkeletonContainer from '@/app/ui/skeleton-container';
import SkeletonLineShort from '@/app/ui/skeleton-line-short';
import SkeletonPageHeader from '@/app/ui/skeleton-page-header';

const Loading = () => {
  return (
    <>
      <SkeletonContainer>
        <SkeletonPageHeader />
        {/* Future Events*/}
        <SkeletonLineShort />
        <SkeletonCardGrid />
        {/* Previous Events*/}
        <SkeletonLineShort />
        <SkeletonCardGrid />
      </SkeletonContainer>
    </>
  );
};

export default Loading;
