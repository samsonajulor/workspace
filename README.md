# NASA PROJECT

hosted on aws: http://3.83.34.247:8000/
The following resources were used to create this project:

architectural design: https://www.lucidchart.com/pages
cross-origin-resource-sharing: https://www.npmjs.com/package/cors
node streams: https://nodejs.org/api/stream.html#stream_streams_promises_api
deploying a react application: https://create-react-app.dev/docs/deployment/
request logging: https://www.npmjs.com/package/morgan
Layered Architecture to Design iOS Apps: https://www.vadimbulavin.com/layered-architecture-ios/
separation of concerns: https://en.wikipedia.org/wiki/Separation_of_concerns | https://nalexn.github.io/separation-of-concerns/
map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
effects: https://github.com/arwes/arwes
## Getting Started

1. Ensure you have Node.js installed.
2. Create a free [Mongo Atlas](https://www.mongodb.com/atlas/database) database online or start a local MongoDB database.
3. Create a `server/.env` file with a `MONGO_URL` property set to your MongoDB connection string.
4. In the terminal, run: `npm install`

## Running the Project

1. In the terminal, run: `npm run deploy`
2. Browse to the mission control frontend at [localhost:8000](http://localhost:8000) and schedule an interstellar launch!

## Docker

1. Ensure you have the latest version of Docker installed
2. Run `docker build -t nasa-project .`
3. Run `docker run -it -p 8000:8000 nasa-project`

## Running the Tests

To run any automated tests, run `npm test`. This will: 
* Run all the client-side tests: `npm test --prefix client`
* Run all the server-side tests: `npm test --prefix server` 

# Common Issues With NPM Scripts
on Windows, the npm run watch command may not start both your client and server, depending on your shell. To solve this:

You can use an NPM package like concurrently or npm-run-all instead of the & symbol in the npm run watch command.

Or if you have the bash shell installed on your machine (for example, through Git for Windows), set the default shell used by NPM to the bash shell by typing: npm config set script-shell bash in your terminal. All commands in your package.json will now run in a bash shell.

If you're having issues with the npm install command:

Try removing package-lock.json in both the server/ and client/ folders.

Try updating to a version of Node greater than 16 with an NPM version greater than 7.11. There is a bug in previous versions of NPM that prevents the --prefix parameter from working correctly.

What we're working with here is automation and specifically DevOps, which is often a dedicated role when working in a larger team of developers. It takes lots of practice and patience to get right!

# Setting BUILD_PATH On Windows
Friendly reminder! BUILD_PATH is an environment variable, just like PORT. On Windows, with the default shell, the way we set our BUILD_PATH variable is:

set BUILD_PATH=../server/public&& react-scripts build

Rather than the bash version:

BUILD_PATH=../server/public react-scripts build

# Settin Port on Windows for the server
If you're using the default Windows shell, the syntax to set an environment variable like PORT is slightly different than what we saw in the previous video. To set PORT in your package.json on Windows, you'll want to write:

"start": "set PORT=5000&& node src/server.js"

Instead of:

"start": "PORT=5000 node src/server.js"

Alternatively, there's the cross-env NPM package which will work all platforms. Both options work!

##The app was built with the following commands
step 1:'docker build . -t samsonajulor/nasa_project'
step 2: create and run a container from the image with - 'docker run -it -p 8000:8000 samsonajulor/nasa_project'
step 3: push the container to the hub with - 'docker push samsonajulor/nasa_project'
