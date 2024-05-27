# SASS
SASS stands for Syntactically Awesome Style Sheets and is a pre-processor scripting language that extends CSS (Cascading Style Sheets). 
SASS code is processed by a program and compiled into CSS code, which can then be used to style HTML elements and control how a page appears on the web.

### Installation
>        npm install -g sass

### Usage or put in the package.json script
>        sass --watch input.scss output.css
>        "build:scss": "sass --watch input.scss output.css"

Now in your terminal, run *npm run build:scss* script.

### Variables
Think of variables as a way to store information that you want to reuse throughout your stylesheet. 
You can store things like colors, font stacks, or any CSS value you think you’ll want to reuse. Sass uses the $ symbol to make something a variable. Here’s an example:
>        
        $font-stack: Helvetica, sans-serif;
        $primary-color: #333;
        
        body {
          font: 100% $font-stack;
          color: $primary-color;
        }

### Nesting 
Sass will let you nest your CSS selectors in a way that follows the same visual hierarchy of your HTML. 
Be aware that overly nested rules will result in over-qualified CSS that could prove hard to maintain and is generally considered bad practice.
>        
    nav {
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
    
      li { display: inline-block; }
    
      a {
        display: block;
        padding: 6px 12px;
        text-decoration: none;
      }
    }

once compiled, it will become like this in css output.

      nav ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      nav li {
        display: inline-block;
      }
      nav a {
        display: block;
        padding: 6px 12px;
        text-decoration: none;
      }

### Exluding scss file from building
You can exclude scss file from building by adding prefix undescore (_) in the filename of your class.

variables.scss > _variables.scss
