import PageHeader from '@/app/ui/page-header';

const Reservations = () => {
  return (
    <>
      <PageHeader>Reservations</PageHeader>
      <section className="px-2">
        <p>
          This page will be a list of current reservations that we have. This section will allow us to track current and
          future reservations, display previous reservations, and create tasks to create future reservations.
        </p>
        <div className="mt-2">
          Reservations can include:
          <ul className="list-disc list-inside">
            <li>Campgrounds</li>
            <li>State Park Camping</li>
            <li>Hotels</li>
            <li>Restaurants</li>
            <li>Car Rentals</li>
          </ul>
        </div>
        <p className="mt-2">
          Other types of reservations may be added in the future as we come across ideas we have not thought of yet.
        </p>
      </section>
    </>
  );
};

export default Reservations;
