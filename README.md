# Best Markdown Editor Back End

[![maintainability](https://api.codeclimate.com/v1/badges/75c6ac9f8eef8e31b37f/maintainability)](https://codeclimate.com/github/Best-Markdown-Editor/back-end/maintainability) [![test coverage](https://api.codeclimate.com/v1/badges/75c6ac9f8eef8e31b37f/test_coverage)](https://codeclimate.com/github/Best-Markdown-Editor/back-end/test_coverage)

## Tech Stack

- TypeScript
- Express
- Knex
- GraphQL (Apollo Server)

## Contributing

This project uses TypeScript, Eslint, and Prettier. When you commit changes husky will automatically run `npx tsc --noEmit && eslint .` before your commit. If there are any errors in coming from TypeScript, ESLint, or Prettier it will stop your commit.

When you make a pull request a GitHub action will run the same lint command as above and run test coverage command making sure all tests pass. If you add new features, please add tests to make sure it runs. If any existing features are changed, please make sure tests pass, and if the tests don't pass, write them in a way so that they pass with the altered code.

If you have any questions at all feel free to email me at: mcbride967@gmail.com. You can also contact me on my [discord server](https://discord.gg/4PCy4Bz). If you are a Lambda School member, just message me on Slack.

You can see what needs to be done by checking out the to do's in the [project board](https://github.com/Best-Markdown-Editor/back-end/projects/1), or in the [issues](https://github.com/Best-Markdown-Editor/back-end/issues) section.
