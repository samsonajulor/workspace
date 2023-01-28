Overview
![Cloud Run Logo](./images/cloud%20run%20image.png)

Cloud Run is a managed compute platform that enables you to run stateless containers that are invocable via HTTP requests. Cloud Run is serverless: it abstracts away all infrastructure management, so you can focus on what matters most — building great applications.

Cloud Run is built from Knative, letting you choose to run your containers either fully managed with Cloud Run, or in your Google Kubernetes Engine cluster with Cloud Run on GKE.

The goal of this lab is for you to build a simple containerized application image and deploy it to Cloud Run.

## Objectives
In this lab, you learn to:

- Enable the Cloud Run API.

- Create a simple Node.js application that can be deployed as a serverless, stateless container.

- Containerize your application and upload to Container Registry (now called "Artifact Registry.")

- Deploy a containerized application on Cloud Run.

- _*****Delete unneeded images to avoid incurring extra storage charges*****_.

### Activate Google Cloud Shell
Google Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud.

Google Cloud Shell provides command-line access to your Google Cloud resources.

- In Cloud console, on the top right toolbar, click the Open Cloud Shell button.

- Click Continue.

It takes a few moments to provision and connect to the environment. When you are connected, you are already authenticated, and the project is set to your PROJECT_ID. For example:

![Project ID highlighted in the Cloud Shell Terminal](./images/projectterminal.png)

gcloud is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

You can list the active account name with this command:
`gcloud auth list`

**_Output:_**

```
Credentialed accounts:
 - @.com (active)
```

**_Example output:_**
```
Credentialed accounts:
 - google1623327_student@qwiklabs.net
```

- You can list the project ID with this command:
`gcloud config list project`

**_Example output:_**
```
[core]
project = qwiklabs-gcp-44776a13dea667a6
```
Note: Full documentation of gcloud is available in the [gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### 1. Enable the Cloud Run API and configure your Shell environment
- From Cloud Shell, enable the Cloud Run API :

`gcloud services enable run.googleapis.com`

- If you are asked to authorize the use of your credentials, do so. You should then see a successful message similar to this one:

`Operation "operations/acf.cc11852d-40af-47ad-9d59-477a12847c9e" finished successfully.`

```
Note: You can also enable the API using the APIs & Services section of the console.
```

- Set the compute region:

`gcloud config set compute/region us-central1`

- Create a LOCATION environment variable:

`LOCATION="us-central1"`

### 2. Write the sample application
In this task, you will build a simple express-based NodeJS application which responds to HTTP requests.

- In Cloud Shell create a new directory named helloworld, then move your view into that directory:

`mkdir helloworld && cd helloworld`

- Next you'll be creating and editing files. To edit files, use vi, emac, nano or the Cloud Shell Code Editor by clicking on the Open Editor button in Cloud Shell.

- Create a package.json file, then add the following content to it:

`sudo nano package.json`

```
{
  "name": "helloworld",
  "description": "Simple hello world sample in Node",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "Google LLC",
  "license": "Apache-2.0",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

Most importantly, the file above contains a start script command and a dependency on the Express web application framework.

- Press CTRL+X, then Y to save the package.json file.

- Next, in the same directory, create a index.js file, and copy the following lines into it:

`sudo nano index.js`

```
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
```

This code creates a basic web server that listens on the port defined by the PORT environment variable. Your app is now finished and ready to be containerized and uploaded to Container Registry.

- Press CTRL+X, then Y to save the index.js file.

---

### 3. Containerize your app and upload it to Artifact Registry
To containerize the sample app, create a new file named Dockerfile in the same directory as the source files, and add the following content:

`sudo nano Dockerfile`

```
# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:12-slim
# Create and change to the app directory.
WORKDIR /usr/src/app
# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./
# Install production dependencies.
# If you add a package-lock.json, speed your build by switching to 'npm ci'.
# RUN npm ci --only=production
RUN npm install --only=production
# Copy local code to the container image.
COPY . ./
# Run the web service on container startup.
CMD [ "npm", "start" ]
```

- Press CTRL+X, then Y to save the Dockerfile file.

- Now, build your container image using Cloud Build by running the following command from the directory containing the Dockerfile. (Note the $GOOGLE_CLOUD_PROJECT environmental variable in the command, which contains your lab's Project ID):

`gcloud builds submit --tag gcr.io/$GOOGLE_CLOUD_PROJECT/helloworld`

Cloud Build is a service that executes your builds on GCP. It executes a series of build steps, where each build step is run in a Docker container to produce your application container (or other artifacts) and push it to Cloud Registry, all in one command.

Once pushed to the registry, you will see a SUCCESS message containing the image name (gcr.io/[PROJECT-ID]/helloworld). The image is stored in Artifact Registry and can be re-used if desired.

- List all the container images associated with your current project using this command:

`gcloud container images list`

- To run and test the application locally from Cloud Shell, start it using this standard docker command:

`docker run -d -p 8080:8080 gcr.io/$GOOGLE_CLOUD_PROJECT/helloworld`

- In the Cloud Shell window, click on Web preview and select Preview on port 8080.

This should open a browser window showing the "Hello World!" message. You could also simply use curl localhost:8080.

---
Note: If the docker command cannot pull the remote container image then try running this: `gcloud auth configure-docker`
---

### 4. Deploy to Cloud Run
- Deploying your containerized application to Cloud Run is done using the following command adding your Project-ID:

`gcloud run deploy --image gcr.io/$GOOGLE_CLOUD_PROJECT/helloworld --allow-unauthenticated --region=$LOCATION`

The allow-unauthenticated flag in the command above makes your service publicly accessible.

- When prompted confirm the service name by pressing Enter.
Wait a few moments until the deployment is complete.

On success, the command line displays the service URL:

```
Service [helloworld] revision [helloworld-00001] has been deployed
and is serving traffic at https://helloworld-wdl7fdwaaa-uc.a.run.app
```

You can now visit your deployed container by opening the service URL in any browser window.


### 5. Clean up
While Cloud Run does not charge when the service is not in use, you might still be charged for storing the built container image.

- You can either decide to delete your GCP project to avoid incurring charges, which will stop billing for all the resources used within that project, or simply delete your helloworld image using this command :

`gcloud container images delete gcr.io/$GOOGLE_CLOUD_PROJECT/helloworld`

- When prompted to continue type Y, and press Enter.

- To delete the Cloud Run service, use this command :

`gcloud run services delete helloworld --region=us-central1`

- When prompted to continue type Y, and press Enter.

[link to documentation](https://googlepluralsight.qwiklabs.com/focuses/24782243?parent=lti_session)