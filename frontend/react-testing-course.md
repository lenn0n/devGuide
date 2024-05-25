# Why you should test?
The primary goal is to check whether the application behaves as expected. Giving you a lot of confidence and produce high quality features.

**Unit testing** - testing a very small part of the code.

**Integration testing** - test for a group of components that interacts with each other.

**End-to-End Testing** - frontend to backend testing.

## Vitest - Testing Framework
**Vitest** - All syntax you use here will be exactly available in Jest. It supports ESM, Typescript and JSX which is currently experimental stage in Jest.

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

## Testing Library for Components using React and Jest-DOM 

Testing library is the octopus you see in the internet. This library is the best to partner with Vitest/Jest.

### Installation: 
>       
       npm i -D @testing-library/react@14.2.0
       npm i -D @testing-library/jest-dom
       npm i -D @testing-library/user-event


## Add JSDOM
By default, our tests are executed in the node environment. But Node doesn't know about browser APIs like DOM. Fortunately, we have JSDOM. This will emulate our browser apis in the node environment.

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

### RTL Queries
## get
**getBy**: returns the matching node, however will throw an error if multiple matches or no matches are found.

**getAllBy**: returns an array of matching nodes if at least one match is found and throws an error if no match is found.

## query
**queryBy**: returns the matching node if one match is found and null if no match is found, however will throw an error if multiple matches are found.

**queryAllBy**: returns an array of matching nodes if at least one match is found and an empty array if no match is found.

## find
**findBy**: returns a promise that returns the matching node, however will throw an error if multiple matches or no matches are found.

**findAllBy**: returns a promise that returns an array of matching nodes if at least one match is found and throws an error if no match is found.

### When to use getBy, queryBy and findBy?
1. You will only use **getBy** if you expect the element / elements to be present upon query.
2. The **queryBy** is useful for asserting an element that is not present.
3. Use **findBy** if the element / elements being queried might display asynchronously .

### User Interactions
       

## Example of Testing Library React
>              
              // DEFAULT IMPORTS
              import "@testing-library/jest-dom/vitest";
              import { it, expect, describe } from 'vitest'
              import { render, screen } from "@testing-library/react";
              
              import Greet from '../../src/components/Greet';
              
              describe('Greet', () => {
                it('should render Hello with name when name is provided', () => {
                  render(<Greet name="Lennon"/>)
              
                  const heading = screen.getByRole("heading");
                  expect(heading).toBeInTheDocument()
                  expect(heading).toHaveTextContent(/Lennon/)
                })
              
                it('should render Login button with name when name is not provided', () => {
                  render(<Greet/>)
              
                  const button = screen.getByRole("button");
                  expect(button).toBeInTheDocument()
                  expect(button).toHaveTextContent(/Login/)
                })
              })



