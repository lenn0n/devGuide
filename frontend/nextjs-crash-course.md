## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Getting started with NEXT.JS

Start new project

    npx create-next-app@latest

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
  >     const Agents = dynamic(()=> import('@/components/...'), { ssr: false });

You might get some **Hydration Issues** while rendering components. This is simply because the Server Side and Client Side
**should be the same**. Eg: You use new Date() inside the client component, in the server the value is 00-0000-00 01:00:01 and the client, 00-0000-00 01:00:02. This would throw an error.

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Handling multiple request in Parallel Mode:
>      async getUser ... () => {}
>      async getItems ... () => {}
>      const [ users, items ] = Promise.allSettled([getUser(), getItems()]) 

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Using of revalidatePath from "next/cache" in server component is game changing.
>      revalidatePath("PATH");

## Redirecting to 404 Page in Server Component:
>      import { notFound } from "next/navigation"
>      ...
>      notFound();
Create a file beside page.tsx and name it to not-found.tsx.

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Route Group - exempting from url route, simply wrap the name of folder with parenthesis. src/app/(auth)/login -> http://localhost/login

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Metadata - specify component/page metadata. Static or Dynamic
>       
        import type { Metadata } from 'next'
 
        // either Static metadata
        export const metadata: Metadata = {
          title: '...',
        }
         
        // or Dynamic metadata
        export async function generateMetadata({ params }) {
          return {
            title: '...',
          }
        }

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Deep Metadata - you can specify metadata for parent and children component. 
>        
       import type { Metadata } from 'next'
        // Parent Component
        export async function generateMetadata({ params }) {
          return {
            title: {
              absolute: "",
              default: "Next.js - devGuide",
              template: "%s | devGuide"
            }
          }
        }

       // Child Component
        export async function generateMetadata({ params }) {
          return {
            title: "Hello From Child"
          }
        }
The title of the page would be: Hello From Child | devGuide

Please be aware of using 'absolute' key. This will be the fixed title even if you specify different title value in the children component.

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Creating layouts beside page.tsx is pretty helpful. You just need to use the { children } prop as React.ReactNode and it will automatically wrap the page.tsx for you.
By using this, you must know:

/page.tsx - this is the page you put logic

/layout.tsx - does NOT change and re-render

/template.tsx - does change and re-render


### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Using CSS Module
You can add specific style for each component using builtin css module. Create style in the current folder: "./name.module.css"

    import styles from "./name.module.css"
    ...
    <div={styles.container}

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Allowing External Images as SRC

Open next.config.js and add the following:
    
    const nextConfig = {
        images: {
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: "any.com",
                }
            ]
        }
    }



