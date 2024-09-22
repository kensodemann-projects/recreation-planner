import PageHeader from '@/app/ui/page-header';

const Todos = () => {
  return (
    <>
      <PageHeader className="text-center mb-8">Todos</PageHeader>
      <section className="px-2">
        <p>This page will be a list of various TODO items sorted by due date.</p>
        <div className="mt-2">
          Todo items can be created from any of the following areas:
          <ul className="list-disc list-inside">
            <li className="list-item">General (created from here)</li>
            <li className="list-item">Equipment</li>
            <li className="list-item">Places</li>
            <li className="list-item">Trips &amp; Events</li>
            <li className="list-item">Reservations (still debating if that makes sense or not)</li>
          </ul>
        </div>
      </section>
      ;
    </>
  );
};

export default Todos;
