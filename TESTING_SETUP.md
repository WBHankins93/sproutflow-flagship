# Testing Setup Guide

## Installation

Before running tests, you must install dependencies:

```bash
npm install
```

This will install:
- Jest and Jest types (`@types/jest`)
- React Testing Library and types
- All other testing dependencies

## TypeScript Errors Before Installation

**Note**: You will see TypeScript errors in test files until `npm install` is run. This is expected because:
- `@types/jest` provides Jest globals (`describe`, `it`, `expect`, etc.)
- `@testing-library/react` types are needed for React component testing
- These packages are in `package.json` but not yet in `node_modules`

**These errors will resolve automatically after running `npm install`.**

## Running Tests

```bash
npm test              # Run all tests
npm test -- --watch   # Watch mode
npm test -- --coverage # With coverage report
```

## Test Structure

- `__tests__/high-priority/` - Critical business logic tests
- `__tests__/medium-priority/` - Component and data consistency tests  
- `__tests__/low-priority/` - SEO, accessibility, performance tests

## Configuration Files

- `jest.config.js` - Jest configuration with Next.js integration
- `jest.setup.js` - Test environment setup and mocks
- `jest.d.ts` - TypeScript declarations for Jest
- `tsconfig.json` - Updated with Jest types support
