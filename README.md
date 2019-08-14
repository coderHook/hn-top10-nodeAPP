# Hacker News Top 10 Most Used Words
### TypesScript - NodeJs APP

 TS-NodeJs App that talks to a public API of HackerNews getting information about top 10 most used words, in titles, last week Story and from users with high Karma.

## To set up the project in your Machine

- 1. Clone the repository in your computer.
      #### `git clone https://github.com/coderHook/hn-opc-nodeAPP.git`

- 2. Install dependencies.
      #### `npm install`

- 3. If you are going to develope Install devDependencies
      #### `npm install --dev`

## List of Dependencies this App uses.
Local Dependencies.

| Name          | Description           | 
| ------------- |:---------------------:| 
| Express      | Node.js Framework to create fast servers, allowing the use of midlewares. | 
| superagent | Provides Call Api functionality.      | 
| eslint | Used to find problematic patterns or code that doesn't adhere to certain style guidelines.      | 
| async-await-parallel | Allows to set a maximum concurrency for an array of async results you want to await on.      | 
| cheerio | Node.js library that helps developers interpret and analyze web pages using a jQuery-like syntax. Used to Scrappe HackerNews page.      |   

Dependencies in development.

| Name          | Description           | 
| ------------- |:---------------------:| 
| typescript      | Superset of Javascript that allows to write typed code | 
| ts-node      | Allows TypeScript to be used in Node.js enviroment. We can use *.ts files without compiling it to js.      |   
| nodemon | Utility to monitor the changes in the source code and restart the server.      |  

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.
It uses nodemon.

### `npm run build`

Compiles the TypeScript files '*.ts' into Javascript 'es6'.

### `npm start`
Runs the compiled js version of the app.


## API Endpoints
These are the available endpoints of the API `@root : http://mywebsite.com`.

* **GET @root/top10/in-titles-last-25-Stories**:

    Returns an object with list of titles Analyzed and a list of Most used words ordered by most times used.

* **GET @root/top10/in-post-last-week**:

    Returns an Object with the Id of post Analized, his date, and a list with top 10 most used words.

* **GET @root/top10/in-titles-high-karma**: 

    Takes approximatly 1'5 min to retrieve the 600 entries, and 0'5 min to split the data an check repetition.

    Returns a list with most used words in the titles of last 600 stories from users with karma higher than 10000, and the numStories analyzed.

## File Structure

The API will have the following file structure:
api
|-- /dist
|-- -- /controllers
|-- -- /routes
|-- -- /utils
|-- -- app.js

|-- /src
|-- -- /controllers
|-- -- /routes
|-- -- /utils
|-- -- app.ts
| package.json
| tsconfig.json
| README.md