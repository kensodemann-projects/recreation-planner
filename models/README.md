# Types of Relationships

While the relationships defined in the database all easily fit into the `one-to-many/many-to-one`, `one-to-one`, and `many-to-many` models, their actual meaning in real life, and thus how we treat them in the application, is more nuanced.

Primary
: This is the entity currently being described. For example, we may currently be describing the `Person` entity, in which case it is "Primary."

Attribute
: This is an entity that expands the description of the "Primary" entity. For example, a `Person` has a `Gender` where the gender is defined via entities with names such as `Male`, `Female`, `Non-Binary`, etc.
: A `many-to-one` data relationship exists between `Person` and `Gender` (many persons can be "Non-Binary", but there is only a single definition in our database for "Non-Binary").
: Such a relationship is defined via a foreign key on the `Person` pointing to the specified `Gender`.
: There is no ownership in the opposite direction. That is, the `Person`'s specified `Gender` does not own the `Person` so the `Person` is not a "Child" (see below)of `Gender`.
 
Child
: This is an entity or collection of entities that belong to the "Primary" entity. For example, a `Person` may have several `Address` entities that define a person's various places that they occupy (Home, Vacation Cabin, P.O. Box, etc).
: A `one-to-many` data relationship exists between `Person` and `Address`. A single person may posses anywhere between zero and multiple addresses.
: Such a relationship is defined via a foreign key on the `Address` pointing to the specified `Person`.
: There is no expansion of the description of the child entity. That is, an `Address` is associated with a person to show "ownership" by the person but not to expand the definition of the `Person`, and thus there is no "Attribute" relationship in the opposite direction.

Association / Member
: This is an entity that the "Primary" entity is part of but there is no ownership implied by the relationship. For example, several `Person`s may part of one or more `Clubs`, but the `Clubs` do not own any `Person` entity and no single `Person` owns the `Club` entity (at least not the relationship sense being defined here).
: These relationships are typically modeled as `many-to-many`. A person can belong to many `Club`s and each club has many `Person`s.

## Deletion Rules

When removal of an entity that is potentially referenced via one of these relationships, the following rules shall apply.

### Attribute Entities

When deleting an entity that has an attribute relationship with another type of entity, deletion shall not be allowed if the entity is referenced. If deletion is attempted, this is a violation of referential integrity and an exception shall be thrown by the database.

With the previous example, if the request is to remove the `Gender` of `Non-Binary`, the application shall first check to see if `Non-Binary` is used and shall not allow the delete if it is. If the application misses a reference and attempts the delete anyways, that shall be caught by the foreign key which will throw an exception.

### Child Entities

When removing an entity that has child entities, the delete shall cascade to the child entities. Since cascading deletes can be set up on the foreign key, the application will let the database handle the cascade rather than attempting to perform the deletions itself in the correct order.

Using the previous example of a `Person` with child `Address` entities, if a person is removed, all of the `Address` entities associated with that person shall also be removed. The application shall not have special logic for this. The removal of the `Address` shall be performed by the database through the foreign key from `Address` to `Person` being set up to perform cascaded deletes.

### Association / Member Entities

When removing an entity from either side of this relationship, the delete shall cascade to the intermediate cross reference table that is used to define the `many-to-many` relationship.

## Model Inclusion Rules

There are two types of models in the application: Domain models which define the data within the domain of the application, and Data Transfer Objects (DTOs) which define the shape of the data when communicating with the database.

### Attribute Relationships

In the database, the reference id (RID) is defined on the primary entity table.

The primary entity DTO Model shall contain the RID and a representation of the attribute entity as an object property.

The primary entity Domain Model shall contain representation of the attribute entity as an object property but shall not contain the RID.

The attribute entity models shall not reference a collection of matching primary entities in any way.

### Parent / Child Relationships

In the database, the reference id (RID) is defined on the child entity table.

The primary entity models shall both contain optional collection properties for the child entities. The reason they are optional is that it is often desirable to elide them from a query of the primary entity. For example, if several primary entities are queried for a list view or if a single primary entity is queried for a n editor. On the other hand, for a primary entity details view it makes sense to only need one round trip to the database, so including all of the children in that case makes sense.

The domain models for the child entities shall contain the RIDs, but not an object property for the parent.

### Association / Member Relationships

These shall behave similarly to Child Relationships. The entities on both sides of the relationship shall contain the other as an optional collection property. The cross reference table model shall contain the RIDs but no other reference objects.


