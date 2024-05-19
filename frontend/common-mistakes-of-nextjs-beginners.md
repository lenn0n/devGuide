## GETTING STARTED WITH NEXTJS

There are two components you can use in next.js

1. Server Components 'use server' (default)
2. Client Components 'use client'

Server components will only run in the server side. This is the default behavior of each page you create while the client components runs in the browser.

Things you cannot do/use in Server Components:
  1. Browser API (localStorage, windows)
  2. React States and Hooks

You can only run these in client side.
But there is a caveat in this phenomenon. Once you render the app, it will pre-render once in server side and all the way in the client side.

You can mix these two by passing only as Props or Children.
>     
      // VALID
      <Server-Component>
        <Client-Component/>
      </Server-Component>

      <Server-Component page={<Client-Component/> }/>
      
      // INVALID
      use 'server';
      import Client-Component from "..";
      return <Client-Component/>;
      
The only reason behind is apparently nextjs is expecting server components only and got imported by one client component. Don't import the component and use them as props/children to avoid errors.

Alternatively, you can use dynamic import. 
  >     dynamic(()=> import('...'));

You might get some **Hydration Issues** while rendering components. This is simply because the Server Side and Client Side
**should be the same**. Eg: You use new Date() inside the client component, in the server the value is 00-0000-00 01:00:01 and the client, 00-0000-00 01:00:02. This would throw an error.
