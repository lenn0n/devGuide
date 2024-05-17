## CREATE SIMPLE EXPRESS SERVER IN TYPESCRIPT

1. Install packages
>     git init
>     npm init
>     npm install express cors dotenv
>     npm install @types/cors @types/express @types/node typescript nodemon ts-node tsconfig-paths -D

2. Add script object inside package.json
>     "scripts": {
>       "start": "nodemon -r tsconfig-paths/register src/app.ts"
>     },

3. Add .gitignore in root folder:
>     node_modules 

4. Add tsconfig and updated
*npx --init*
or
*tsc --init*

>     "ts-node": {
>       "require": ["tsconfig-paths/register"]
>     },
>     compilerOptions: {
>       "baseUrl": ".",
>       "paths": {
>         "@*": ["./src/*"],
>       },
>       "outDir": "./dist",
>     },
>     "include": [
>       "./src/**/*"
>     ]

5. Create .env in root folder
>     SERVER_HOST='localhost'
>     SERVER_PORT='5000'

6. Create file in /src/app.ts
>     import express from "express"
>     import routes from "@routes/api-routes"
>     import cors from 'cors';
> 
>     require('dotenv').config();
> 
>     const app = express();
>     const expressParseOptions = {
>       limit: '500mb',
>     };
> 
>     app.use(express.json(expressParseOptions));
>     app.use(cors());
>     app.use("/api", routes);
> 
>     app.listen(process.env.SERVER_PORT, ()=> {
>       console.info(`API Server is now running on port ${process.env.SERVER_PORT}.`)
>     })

7. Create file in /src/routes/api-routes.ts
>       import { Router } from "express";
>       import { NextFunction, Request, Response } from "express";
> 
>       const router = Router();
> 
>       const welcome = async (req: Request, res: Response, next: NextFunction) => {
>         return res.status(200).json({ message: "Welcome to CI/CD" })
>       }
> 
>       router.get("/", welcome)
> 
>       export default router;


