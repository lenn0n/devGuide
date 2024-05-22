### Why you should test?
The primary goal is to check whether the application behaves as expected. Giving you a lot of confidence and produce high quality features.

**Unit testing** - testing a very small part of the code.
**Integration testing** - test for a group of components that interacts with each other.
**End-to-End Testing** - frontend to backend testing.

## Vitest - Testing Framework
**Vitest** - Supports ESM, Typescript and JSX

### Installation: 
>      npm i -D vitest

Add script to package.json:
>      
       "test": "vitest",
       "test:ui": "vitest --ui"

### Add VSCode Extension:
>      Vitest Snippets

### Shortcuts
Type "iv" to add 'default import' ( it, expect, describe )

Type "d" to add 'describe'

Type "i" to add 'it'

## React and Jest-DOM Testing Library

### Installation: 
>       
       npm i -D @testing-library/react@14.2.0
       npm i -D @testing-library/jest-dom


## Add JSDOM
By default, our test are executed in node environment. Node doesnt know about browser apis like the DOM.
This will emulate our browser environment.

### Installation: 
>      npm i -D jsdom@24.0.0

## Create vitest configuration file:
>       
       import { defineConfig } from "vitest/config";

       export default defineConfig({
         test: {
           environment: 'jsdom'
         }
       });


