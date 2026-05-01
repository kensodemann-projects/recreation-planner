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
        {/* Equipment Details */}
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
          <SkeletonContainer>
            <SkeletonLineFull />
            <SkeletonLineFull />
            <SkeletonLineFull />
            <SkeletonLineFull />
          </SkeletonContainer>
          <SkeletonContainer>
            <SkeletonLineFull />
            <SkeletonLineFull />
          </SkeletonContainer>
        </div>
        {/* TODOs, etc. */}
        <SkeletonLineShort />
        <SkeletonCardGrid />
      </SkeletonContainer>
    </>
  );
};

export default Loading;
