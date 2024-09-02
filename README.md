# Recreation Planner

## Development Workflow

All commits that are pushed to `main` are deployed automatically. As such, a hybrid approach between the older git-flow and the simplified GitHub-flow will be used.

When starting a new feature:

1. Create a base branch for the feature.
1. Create branches for the changes for the feature.
   1. Make the required modifications.
   1. Use `npx changeset` to describe the change.
   1. Create a PR to merge the changes into the base branch for the feature.
   1. Always use a "Squash Commit" to commit these PRs.
1. When the feature is "complete", create a PR to merge the PR into `main`.
1. This PR will very likely consist of multiple smaller micro-feature commits, so do not squash.

This allows for base features to be developed in parallel.

**Note:** The database schema is very much "live" so dealing with changes that involve the database will need to be worked out. Ideally database modifications can be segmented to avoid issues. It may also be possible to use a local Postgres in development. This will need to be looked in to.
