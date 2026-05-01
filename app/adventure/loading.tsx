import SkeletonCardGrid from '../ui/skeleton-card-grid';
import SkeletonContainer from '../ui/skeleton-container';
import SkeletonHeader from '../ui/skeleton-header';
import SkeletonList from '../ui/skeleton-list';
import Title from './title';

const Loading = () => {
  return (
    <>
      <Title />
      <SkeletonContainer>
        <SkeletonHeader />
        <SkeletonList />
        <SkeletonHeader />
        <SkeletonList />
        <SkeletonHeader />
        <SkeletonCardGrid />
      </SkeletonContainer>
    </>
  );
};

export default Loading;
