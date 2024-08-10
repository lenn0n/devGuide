## MVC vs MVT

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) MVC
Model - represents your data or structure

View - the GUI to represents data

Controller - logic and handling interactions between Model and View.

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) MVT
Model - represents data or structure

View - handles user requests and return responses

Template - the interface


One of the most significant differences lies in how user interactions are managed. 
In MVT, the Template is mainly for presentation, while the View handles data and user interactions. In MVC, the Controller is responsible for handling user interactions and updating the Model, which in turn updates the View.

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Accessibility
Web accessibility means that people with disabilities can use the web equally.
- Someone who cannot hear well so they use captions
- Someone who canot see well so they use screen readers
- Good color contrast
- Age-related impairement, reducing dexterity
- Good layout designs

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) 4 core principles:
1. Perceivable - for example, people can see the content or hear it.
2. Operable - for example, people can use the compute by typing or by voice.
3. Understandable - for example, people get clear and simple language.
4. Robust - for example, people can use assistive technologies.

Implementing accessibility standards is essential for people with disabilities.

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Library Vs. Framework
Both are pre-written code to speed up the development.

Library is a set of code that can be called inside of our application.

Framework is a supporting structure or a guide for building application.

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Best Practices in Frontend Development

1. Clean Code
2. Responsive Designs
3. Performance Optimization
4. Accessibility
5. Security
6. Modularization
7. Documentation
8. Continously Learning
9. Code Reviews
10. Version Control
11. Testing
12. Tools and Libraries

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Others

**Idempotent API** - idempotent is an HTTP approach that a single request can have same effect with multiple requests.

**DOM vs. Virtual DOM** - DOM or Document Object Model is a representation of content or structure in the web. On the other side, **VDOM** is an abstraction of the DOM. Its more like a blueprint of DOM. React uses VDOM to update the DOM efficiently.

**React Lifecycle** - In react, there is two components that uses different Lifecycle method. In **class-based** component, they have componentDidMount, c...DidUnmount, c...willMount and c...willUnmount. In **function-based** component, there are two: useEffect and useLayoutEffect.

**REST and GrapQL** - the difference between these two are, in **REST** API, it can have multiple endpoints and uses HTTP methods like, POST, GET, PUT, PULL and DELETE. In **GraphQL**, they have Query and Mutations and uses only one endpoint for the entire application.

**Library vs. Framework** - these are a group of pre-written codes. A **library** is a function that you call inside your app. ReactJS is one of the popular jss libraries. While on the other hand, **framework** is a scaffold and wraps your entire application to make your development easier.

**ECMAScript vs. Javascript** - the only difference between these two is, the **ECMAScript** is the Standard or Spec of the web and **Javascript** is the implementation of that spec.

**Require vs. Import** - require is **commonjs or known as ES5** while on the other hand, import is an **ES6**.

**TreeShaking** - is an approach of optimizing bundles, removing unwanted codes, white spaces that significantly improves overall web performance.

