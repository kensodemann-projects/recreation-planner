import SkeletonContainer from '@/app/ui/skeleton-container';
import SkeletonLineFull from '@/app/ui/skeleton-line-full';
import SkeletonLineShort from '@/app/ui/skeleton-line-short';
import SkeletonPageHeader from '@/app/ui/skeleton-page-header';

const Loading = () => {
  return (
    <>
      <SkeletonContainer>
        <SkeletonPageHeader />
        {/* Future Events*/}
        <SkeletonLineShort />
        <SkeletonLineFull />
        <SkeletonLineFull />
        <SkeletonLineFull />
        {/* Previous Events*/}
        <SkeletonLineShort />
        <SkeletonLineFull />
        <SkeletonLineFull />
        <SkeletonLineFull />
      </SkeletonContainer>
    </>
  );
};

export default Loading;
