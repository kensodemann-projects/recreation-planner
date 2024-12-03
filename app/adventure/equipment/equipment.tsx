const Equipment = () => {
  return (
    <>
      <section className="px-2">
        <p>
          This page is currently being planned and is under development. It will be a list of equipment that we own such
          as the RV, cars, bikes, and other items that need periodic maintenance or tasks performed on them.
        </p>
        <p className="mt-2">
          This section will allow us to track when maintenance has been done, when current maintenance is scheduled, and
          when future maintenance will become due.
        </p>
        <div className="mt-2">
          For each piece of equipment, you will be able to:
          <ul className="list-disc list-inside">
            <li className="list-item">Create and view notes (lists, etc)</li>
            <li className="list-item">Create Todos</li>
            <li className="list-item">Log maintenance performed</li>
            <li className="list-item">View prior maintenance performed</li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Equipment;
