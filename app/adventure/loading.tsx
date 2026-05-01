import SkeletonCardGrid from '../ui/skeleton-card-grid';
import SkeletonContainer from '../ui/skeleton-container';
import SkeletonLineFull from '../ui/skeleton-line-full';
import SkeletonLineShort from '../ui/skeleton-line-short';
import SkeletonPageHeader from '../ui/skeleton-page-header';

const Loading = () => {
  return (
    <>
      <SkeletonContainer>
        <SkeletonPageHeader />
        {/* Upcoming Events*/}
        <SkeletonLineShort />
        <SkeletonLineFull />
        <SkeletonLineFull />
        <SkeletonLineFull />
        {/* Recent Events*/}
        <SkeletonLineShort />
        <SkeletonLineFull />
        <SkeletonLineFull />
        <SkeletonLineFull />
        {/* due TODOs  */}
        <SkeletonLineShort />
        <SkeletonCardGrid />
      </SkeletonContainer>
    </>
  );
};

export default Loading;
