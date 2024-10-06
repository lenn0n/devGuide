# 📢 NodeJS Crash Course

🌟 Node.js is a cross-platform, open-source JavaScript runtime environment that can run on any OS. 

🌟 Node.js runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser. 

🌟 Node.js lets developers use JavaScript to write command line tools and for server-side scripting.

## Normal Function Statement

    function hello(){
      console.log("hi");
    }

## Function Expression

    var sayHi = function(){
      console.log("hi");
    }
    
    sayHi()

## ES6 Export

ℹ️ This is ES6 export syntax for a named export. You can have many named exports. 

    export const NAME_OF_YOUR_FUNCTION = function(){} or ()=>{}
  
    // To import, you can use 
    import { NAME_OF_YOUR_FUNCTION } from "./PATH_OF_YOUR_FUNCTION";


ℹ️ This is also ES6 syntax that let you export the function as default.

    export default NAME_OF_YOUR_FUNCTION;
  
    // To import, you can use
    import ANY_NAME_YOU_WANT from "./PATH_OF_YOUR_FUNCTION";

## NodeJS Export
ℹ️ This is not ES6 syntax, but is regular ES5-compatible syntax using the module.exports and require() infrastructure built into node.js.

    const NAME_OF_YOUR_FUNCTION = () => { }
    module.exports = NAME_OF_YOUR_FUNCTION
    module.exports.SECOND_FUNCTION = NAME_OF_YOUR_FUNCTION
    const { NAME_OF_YOUR_FUNCTION } = require(./PATH_OF_YOUR_FUNCTION)

    or

    exports.NAME_OF_YOUR_FUNCTION = () => { }
    const ANY_NAME_YOU_WANT = require(./PATH_OF_YOUR_FUNCTION)

## 🤔 When to use module.exports vs exports
So, which method should you use to export functionality from your module? In general, you should use module.exports when you want to export a single function or object from your module, and exports when you want to export multiple properties or functions from your module. For example, suppose we have a module called utils.js that exports several utility functions:

    // utils.js
    function add(a, b) {
      return a + b;
    }
    
    function subtract(a, b) {
      return a - b;
    }
    function multiply(a, b) {
      return a * b;
    }

    
    exports.add = add;
    exports.subtract = subtract;
    exports.multiply = multiply;

In this example, we’re using exports to export multiple functions from our module. When we require this module in our application, we can access each of these functions as properties of the returned object:

    // index.js
    const utils = require('./utils.js');
    
    console.log(utils.add(2, 3)); // Outputs: 5
    console.log(utils.subtract(5, 2)); // Outputs: 3
    console.log(utils.multiply(2, 3)); // Outputs: 6


## ☢️ Event Emitters and Util
ℹ️ **EventEmitter**E is a powerful feature in Node. js that enables asynchronous and event-driven programming. A handy tool for making different parts of a program talk to each other by sending and receiving messages.

ℹ️ **Util** module supports the needs of Node.js internal APIs. Many of the utilities are useful for application and module developers as well. One of them is `inherits`


    var events = require('events');
    var util = require('util');
    
    var myEmitter = new events.EventEmitter();
    myEmitter.on('someEvent', (msg) => {
        console.log(msg);
    })
    
    myEmitter.emit("someEvent", "The event `someEvent` was emitted.");
    
    const Person = function (name){
      this.name = name
    }
    
    util.inherits(Person, events.EventEmitter);
    var author = new Person("Lennon");
    
    author.on('write', (message, x) => { console.log(`The author ${author.name} wrote ${message}`) })
    author.emit("write", "something about life.")

Output:
>  The event `someEvent` was emitted.
> 
>  The author `Lennon` wrote `something about life.`
> 

## 🗃️ FS Module
This module can be asyn or synchrorous operation. 

    var fs = require('fs');

⏳ Synchronous (needs to finish current line before moving to the next line)


    fs.writeFileSync('readMe.txt', 'Hello');
    var readMe = fs.readFileSync('readme.txt', 'utf-8')
    console.log(readMe);

⌚ Asynchronous

    fs.readFile('readme.txt', 'utf-8', (err, data) => {
        console.log(data)
    })

🗑️ Removing file or directory

    fs.unlink('readMe.txt')

📂 Create / Remove / Check Folder

    // Synchronously
    fs.mkdirSync('FOLDER_NAME')
    fs.rmdirSync('FOLDER_NAME')


    // Asynchronously
    fs.mkdir('FOLDER_NAME', () => {
        fs.write(./FOLDER_NAME/sampleWrite.txt, "A file was created inside this folder.")
    })

    // Check and Remove Folder
    if (fs.existsSync('./FOLDER_NAME')){
        fs.rmdir('FOLDER_NAME')
    }

## 🎏 Streams

    const fs = require*('fs');

    const readStream = fs.createReadStream('./streams/title.txt', { encoding: 'utf8');
    const writeStream = fs.createWriteStream('./streams/title2.txt', { encoding: 'utf8');

    readStream.on('data', (data) => {
        console.log('-----NEW CHUNKS-------');
        console.log(chunk);
        console.log(chunk.toString());
        writeStream.write(chunk)
    })

    // Simplier verson of writing steam from reading stream
    readStream.pipe(writeSteam)





