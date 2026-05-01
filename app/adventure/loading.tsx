import SkeletonCardGrid from '../ui/skeleton-card-grid';
import SkeletonContainer from '../ui/skeleton-container';
import SkeletonSectionHeader from '../ui/skeleton-section-header';
import SkeletonList from '../ui/skeleton-list';
import SkeletonPageHeader from '../ui/skeleton-page-header';

const Loading = () => {
  return (
    <>
      <SkeletonContainer>
        <SkeletonPageHeader />
        <SkeletonSectionHeader />
        <SkeletonList />
        <SkeletonSectionHeader />
        <SkeletonList />
        <SkeletonSectionHeader />
        <SkeletonCardGrid />
      </SkeletonContainer>
    </>
  );
};

export default Loading;
