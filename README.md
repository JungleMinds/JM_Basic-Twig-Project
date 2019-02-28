# Jungle Minds - Basic Twig Project

This is a starter project for building a HTML site using twig, ES6 and scss. It uses Storybook as a preview/development environment.
The output is a set of twig files per component and separate JS and CSS file.

## Demo

You can see a live demo here: https://twig-storybook.jungleminds.com

example distribution: https://twig-storybook.jungleminds.com/distribution
example feed: https://twig-storybook.jungleminds.com/distribution/feed.json

It was set up with [Netlify](https://netlify.com) using nothing more than this repo and the `build` script.

## Table of Contents

- [Getting Started](#getting-started)
- [Setting up your IDE](#setting-up-your-ide)
- [Folder Structure](#folder-structure)
- [Scripts](#scripts)
- [Technologies used](#technologies-used)
  - [Storybook](#Storybook)
  - [Webpack](#webpack)
- [Code Hygiene](#code-hygiene)
  - [Flow](#flow)
  - [ESLint](#eslint)
  - [Prettier](#prettier)
  - [Jest](#jest)

## Getting Started

1. run `yarn` to install dependencies
2. run `yarn start` to start developing

### Setting up your IDE

It is highly recommended you install the following plugins for your IDE of choice:

- Flow
- Prettier (please set this plugin to only prettify projects that have a prettier config set)
- ESLint

If you not install these plugins you might only see code hygiene errors when you commit or push which will lead to a frustrating dev experience.

### Folder Structure

After creation, your project will look like this:

```HTML
.
├── .github
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE
│       ├── bug_report.md
│       └── feature_request.md
├── README.md
├── config
├── <config files>
├── src
│   ├── components
│   │   └── <application specific files>
│   ├── styles
│   │   ├── index.scss
│   │   └── <application specific files>
│   ├── scripts
│   │   ├── index.js
│   │   └── <application specific files>
│   └── app.js
├── package.json
└── yarn.lock
```

For the project to build, **these files must exist**:

- `/src/app.js` (the JavaScript entry point for Webpack)

You can delete or rename the other files if you so choose.

### Scripts

- `yarn start`: Start development server with hot reloading using storybook. It runs on `localhost:3000`
- `yarn build`: Build a Production version of your app
- `yarn test`: Run all unit tests
- `yarn test:watch`: Start a test watcher that will continuously run tests on every file change
- `yarn validate`: Test your Javascript typing with Flow
- `yarn lint` Test your code for linting errors but don't fix them
- `yarn lint:js`: Test your Javascript for linting errors but don't fix them
- `yarn lint:js-fix`: Test your Javascript for linting errors and attempt to fix them automatically
- `yarn format`: Test your code for formatting errors
- `yarn postinstall`: After cloning this repo, automatically check for the latest flow definitions from the Flow-Typed repo.

## Technologies used

### Storybook

We are not the only ones testing the project. External parties or clients check our projects. To make this as easy as possible for them, we've included [Storybook](https://storybook.js.org/).
This way anyone can check the components in an isolated area to see if they are performing/looking the way they're supposed to.

The following command will start up Storybook. A url on which you can view storybook will be displayed in the terminal.

`yarn start`

### Webpack

Just like Storybook this project uses [Webpack](https://webpack.js.org/) under the hood to bundle assets.

## Code Hygiene

To keep the code hygiene of everyone involved with a project in line, we've added testing, linting and formatting libraries to this to the project. These are made required by precommit hook using Husky.

### Flow

We use [Flow](https://flow.org/en/) to enforce typing within our projects.

To start a check for flow errors run the following command in the terminal:

`yarn flow`

Use .flowconfig to configure Flow. We ignore node_modules by default. Make sure you do not have Flow installed globally, but use the Flow version inside this project.

Flow related ESLint rules are defined in package.json.

To update the flow definitions for this project, run:

`flow-typed update`

### ESLint

[ESLint](https://eslint.org/) checks your javascript for linting errors.

We use the StandardJS rules. Additional configuration can be done in `package.json.`

`yarn lint:js`

`yarn lint:js-fix`

### Prettier

[Prettier](https://prettier.io/) formats your code so it looks pretty and is readable.

Prettier is included in a commit hook so your code will be checked for formatting every time you try to commit. Therefore it is highly recommended you install Prettier as an extension in your code editor so Prettier will automatically format your code on every save. When you do, make sure your IDE plugin uses the same settings as defined in the project.

`yarn format`

### Jest

Testing has become a requirement for all projects, therefore it's implemented as a base in this project.

To test the components we use [Jest](https://facebook.github.io/jest/).

The following commands are some of the possible commands but these will get you started to becoming a testing star!

`yarn test`
This will start a full project test run. All the files that can be tested will be checked.

`yarn test:watch`
This will start a full project test run, but will trigger a new test run when a file that can be tested has been changed.
