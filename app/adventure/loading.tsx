import SkeletonCardGrid from '../ui/skeleton-card-grid';
import SkeletonContainer from '../ui/skeleton-container';
import SkeletonLineShort from '../ui/skeleton-line-short';
import SkeletonPageHeader from '../ui/skeleton-page-header';

const Loading = () => {
  return (
    <>
      <SkeletonContainer>
        <SkeletonPageHeader />
        {/* Upcoming Events*/}
        <SkeletonLineShort />
        <SkeletonCardGrid />
        {/* Recent Events*/}
        <SkeletonLineShort />
        <SkeletonCardGrid />
        {/* due TODOs  */}
        <SkeletonLineShort />
        <SkeletonCardGrid />
      </SkeletonContainer>
    </>
  );
};

export default Loading;
