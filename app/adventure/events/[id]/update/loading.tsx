import SkeletonContainer from '@/app/ui/skeleton-container';
import SkeletonEditor from '@/app/ui/skeleton-editor';
import SkeletonPageHeader from '@/app/ui/skeleton-page-header';

const Loading = () => {
  return (
    <>
      <SkeletonContainer>
        <SkeletonPageHeader />
        <SkeletonEditor />
      </SkeletonContainer>
    </>
  );
};

export default Loading;
