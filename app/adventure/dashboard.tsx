import PageHeader from '@/app/ui/page-header';

const Dashboard = () => {
  return (
    <>
      <PageHeader>Dashboard</PageHeader>
      <section className="p-4">
        <p>
          Right now, this layout is in flux. This should be more of a dashboard showing several items, but I am not sure
          what.
        </p>
        <div className="mt-4">
          Ideas may include:
          <ul className="list-disc list-inside">
            <li>Next X trips / events</li>
            <li>Top X ToDos</li>
            <li>Wishlists (if we have them for EQ for example)</li>
          </ul>
        </div>
        <p className="mt-4">
          It may also make sense to make a bunch of cards with information such as &quot;You have X upcoming
          events&quot; and &quot;You have Y overdue ToDo items&quot; etc.
        </p>
      </section>
    </>
  );
};

export default Dashboard;
