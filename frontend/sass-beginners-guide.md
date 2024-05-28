# SASS
SASS stands for Syntactically Awesome Style Sheets and is a pre-processor scripting language that extends CSS (Cascading Style Sheets). 
SASS code is processed by a program and compiled into CSS code, which can then be used to style HTML elements and control how a page appears on the web.

### Installation
        npm install -g sass

### Usage or put in the package.json script
        sass --watch input.scss output.css
        "build:scss": "sass --watch input.scss output.css"

Now in your terminal, run *npm run build:scss* script.

### Variables
Think of variables as a way to store information that you want to reuse throughout your stylesheet. 
You can store things like colors, font stacks, or any CSS value you think you’ll want to reuse. Sass uses the $ symbol to make something a variable. Here’s an example:
        
        $font-stack: Helvetica, sans-serif;
        $primary-color: #333;
        
        body {
          font: 100% $font-stack;
          color: $primary-color;
        }

### Nesting 
Sass will let you nest your CSS selectors in a way that follows the same visual hierarchy of your HTML. 
Be aware that overly nested rules will result in over-qualified CSS that could prove hard to maintain and is generally considered bad practice.
        
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

### Exluding scss file from building or Partials
You can exclude scss file from building by adding prefix undescore ( _ ) in the filename of your class.

*variables.scss > _variables.scss*

### Modules - new way for external import 
You don’t have to write all your Sass in a single file. You can split it up however you want with the @use rule. 

        // _base.scss
        $font-stack: Helvetica, sans-serif;
        $primary-color: #333;
        
        body {
          font: 100% $font-stack;
          color: $primary-color;
        }
        // styles.scss
        @use 'base';
        
        .inverse {
          background-color: base.$primary-color;
          color: white;
        }

### Mixins
A mixin lets you make groups of CSS declarations that you want to reuse throughout your site. 

        @mixin theme($theme: DarkGray) {
          background: $theme;
          box-shadow: 0 0 1px rgba($theme, .25);
          color: #fff;
        }
        
        .info {
          @include theme;
        }
        .alert {
          @include theme($theme: DarkRed);
        }
        .success {
          @include theme($theme: DarkGreen);
        }


### Extend/Inheritance
Using @extend lets you share a set of CSS properties from one selector to another. 

        /* This CSS will print because %message-shared is extended. */
        %message-shared {
          border: 1px solid #ccc;
          padding: 10px;
          color: #333;
        }
        
        // This CSS won't print because %equal-heights is never extended.
        %equal-heights {
          display: flex;
          flex-wrap: wrap;
        }
        
        .message {
          @extend %message-shared;
        }
        
        .success {
          @extend %message-shared;
          border-color: green;
        }
        
        .error {
          @extend %message-shared;
          border-color: red;
        }
        
        .warning {
          @extend %message-shared;
          border-color: yellow;
        }

### Mapping values
        $colors: (
          "primary": $primary,
          "secondary": "#fff"
        )

To get the value, use: 

        map-get($colors, "purple");

### Targeting element in a better way
        .title {
          &:hover {
           color: $val
          } 
          &:last-child {} 
          &:nth-child(2) {} 
        }

### Breakpoints
You can create responsive breakpoints using mapping, mixins and media queries.

Firstly, create breakpoint map.

        $breakpoints = (
          "xs": 0,
          "sm: 480px,
          "md": 720px,
          "lg": 960px,
          "xl": 1200px
        )
        
Now you have BP map, let's create some mixins. For string manipulation in sass, you can use: *#{val}*

        @each $key, $val in $breakpoints {
          @mixin #{$key}-screen {
            @media(min-width: $val){
              $content;
            }
          }
        }

        @mixin breakpoint ($bp) {
          @media(min-width: $bp){
            $content;
          }
        }

Finally include it on your custom class name.

        .alert {
          @include xs-screen {
            color: red
          }
          
         @include lg-screen {
            color: blue
          }
        
         @include breakpoint(1600px) {
            color: green
          }
        }
             
### Best Practices
When you start to code in SCSS file, normally you would create an index file (index.scss)

Inside of the file, for best practices, treat it only as a place for @use/imports.

        index.scss
        
        // variables and functions
        @import 'functions';
        @import 'variables';
        
        // base
        @import 'base';
        
        // colors
        @import 'colors';
        
        // components (button, card)
        @import 'components/card';
        @import 'components/button';


