# UI Action Library

## Overview

**UI Action Library** is a collection of utility functions designed for internal use within our company. It provides various helpers, including string manipulation, date handling, and more. This package is private and distributed via GitHub Packages within our organization.

## Table of Contents

1. [Installation](#installation)
2. [Development Setup](#development-setup)
3. [Usage](#usage)
4. [Testing](#testing)
5. [Building](#building)
6. [Publishing](#publishing)
7. [Contributing](#contributing)
8. [Package Management & GitHub Packages](#package-management--github-packages)
9. [License](#license)

## Installation

To install this package in your project, authenticate to GitHub Packages and run the following command:

```bash
npm install @your-company/my-library --registry=https://npm.pkg.github.com/
```

Make sure you have your GitHub Personal Access Token (PAT) with the necessary permissions configured in your `.npmrc`.

## Development Setup

1. **Clone the Repository**:

   First, clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-company/my-library.git
   cd my-library
   ```

2. **Install Dependencies**:

   Install all project dependencies:

   ```bash
   bun install
   ```

   or alternatively, use npm:

   ```bash
   npm install
   ```

3. **Configure Authentication for GitHub Packages**:

   Make sure you have a `.npmrc` file in the root of the project with your GitHub Packages authentication details:

   ```bash
   //npm.pkg.github.com/:_authToken=YOUR_PERSONAL_ACCESS_TOKEN
   ```

4. **Run the Project**:

   You can start the project for development using the following command:

   ```bash
   bun run dev
   ```

## Usage

This package provides various utility functions for string manipulation, date formatting, and more. Example usage:

```typescript
import { toTitleCase, nameToTwoLetters } from "@your-company/my-library";

const title = toTitleCase("hello world"); // "Hello World"
const initials = nameToTwoLetters("John Doe"); // "JD"
```

For detailed API documentation, see the source code and comments.

## Testing

Tests are written using [Vitest](https://vitest.dev/) and cover all critical functions in the library. You can run the tests using the following command:

```bash
bun run test
```

or using npm:

```bash
npm run test
```

### Running Tests with Coverage

To run the tests with coverage:

```bash
bun run test:coverage
```

## Building

To build the package for distribution (ESM and UMD formats), run:

```bash
bun run build
```

The build files will be placed in the `dist/` directory.

## Publishing

### GitHub Packages Setup

This package is distributed via **GitHub Packages** and only accessible to members of the organization.

1. **Authentication**:

   Make sure your `.npmrc` file contains your GitHub Personal Access Token (PAT) with the necessary scopes (`read:packages`, `write:packages`, and `repo`):

   ```bash
   //npm.pkg.github.com/:_authToken=YOUR_PERSONAL_ACCESS_TOKEN
   ```

2. **Publish to GitHub Packages**:

   After building the package, publish it using:

   ```bash
   npm publish
   ```

   This will publish the package to the GitHub Packages registry.

## Contributing

When contributing to this repository, please follow these guidelines:

1. **Branching**: Always branch off from `main` for new features or bug fixes.
2. **Pull Requests**: Submit pull requests with detailed descriptions.
3. **Code Style**: Use ESLint and Prettier for consistent code formatting.
4. **Testing**: Ensure all changes are covered with unit tests and that existing tests pass.

## Package Management & GitHub Packages

This project uses **GitHub Packages** to distribute the library internally. Make sure to:

- Use a **Personal Access Token** (PAT) with the appropriate scopes to authenticate.
- Ensure that the **repository is private** to restrict public access.
- Verify that **npm** is configured correctly in the `.npmrc` file for internal installations.

## License

This project is licensed under the terms of the [MIT License](LICENSE), available within the repository.
