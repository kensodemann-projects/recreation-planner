# recreation-planner

## 1.4.0

### Minor Changes

- 938b787: Show the upcoming and prior events in responsive grids of cards rather than tables and lists.
- 80b6dbf: Show key upcoming events in the dashboard. Limit prior events on the dashboard to one week.

### Patch Changes

- 2116739: Update package dependencies.

## 1.3.4

### Patch Changes

- 9eeb475: Consolidate the navigation to the entity details page.
- 2af938e: Add titles and skeletons for a more complete loading experience.

## 1.3.3

### Patch Changes

- bdecbe9: Consolidate the form composition for editors.

## 1.3.2

### Patch Changes

- e468d93: add tests for the itinerary data layer and actions
- a4c050c: Guard the database authorization by wrapping queries in a single higher order function.
- 453ba08: add unit tests for the equipment data layer and actions
- 55f9764: Centralize the auth checking to the middleware proxy.
- be0b087: add tests for the places data layer and actions
- cc93681: Return a QueryResult structure rather than just data. This allows the system to know the exact status of a data transaction.
- 4c924b2: Add tests for the notes data layer and actions.
- b1e64cd: Add tests for the todos data layer and actions.
- 81b61ed: Add tests for the events data layer and actions.

## 1.3.1

### Patch Changes

- b053898: add the show password checkbox

## 1.3.0

### Minor Changes

- implement an improved login flow for situations where the user fails to log in

## 1.2.2

### Patch Changes

- switch from middleware to proxy due to Next.js deprecation
- deal with the localstorage warnings when performing tests (this only affects tests, there are no such warnings otherwise)

## 1.2.1

### Patch Changes

- 5e5afcc: update TypeScript
- 750acaa: update dependencies outside of TypeScript and ESLint

## 1.2.0

### Minor Changes

- 871e5e2: display the place URL in a link

## 1.1.0

### Minor Changes

- 0da1631: show just the single date and begin/end time if the begin and end dates are the same

## 1.0.1

### Patch Changes

- f593f64: allow zero cost & units to be entered

## 1.0.0

### Major Changes

- beddeac: clean up for the first major release of this app

### Minor Changes

- 20b3fde: Rename "equipement event" to "maintenance" to clarify what it actually is.
- 6937bc8: Add event itineraries.
- ba55c0c: switch the view of child items into tabs

## 0.6.0

### Minor Changes

- b851665: Show the associations when TODO collections are shown as primary parent entities.

### Patch Changes

- 15b977b: Clean up the modeling.
- 15b977b: When a TODO collection for an Event or Equipment is displayed in the general TODO list or the dashboard, specify the Event or Equipment it is associated with.

## 0.5.0

### Minor Changes

- 65bd37b: Display most recently created events on the dashboard.
- c4beeb7: Display current events on the dashboard.

### Patch Changes

- 3c2f552: Refactor the navigatin back to calling pages for multiple possible sources.

## 0.4.0

### Minor Changes

- add notes to equpiment, events, and places
- 0fb5d7a: Add tracking of maintenance events for equipment.
- add todo collections
- fb805f9: Add equipment tracking

## 0.3.0

### Minor Changes

- 2696afc: add the todo feature

### Patch Changes

- 600e43d: Provide better feedback to the user when the system is busy processing something.

## 0.2.0

### Minor Changes

- 4f5a657: add the events feature
- 4f5a657: add the places feature

### Patch Changes

- c651808: create initial project setup and flow
