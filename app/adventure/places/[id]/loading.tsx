import SkeletonCardGrid from '@/app/ui/skeleton-card-grid';
import SkeletonContainer from '@/app/ui/skeleton-container';
import SkeletonLineFull from '@/app/ui/skeleton-line-full';
import SkeletonLineShort from '@/app/ui/skeleton-line-short';
import SkeletonPageHeader from '@/app/ui/skeleton-page-header';

const Loading = () => {
  return (
    <>
      <SkeletonContainer>
        <SkeletonPageHeader />
        <SkeletonLineShort />
        <SkeletonLineFull />
        {/* Details */}
        <SkeletonLineShort />
        <SkeletonLineShort />
        <SkeletonLineShort />
        <SkeletonLineShort />
        <SkeletonLineShort />
        {/* TODOs, etc. */}
        <SkeletonLineShort />
        <SkeletonCardGrid />
      </SkeletonContainer>
    </>
  );
};

export default Loading;
