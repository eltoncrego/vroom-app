### 3. Deploy to App Engine

1. Configure the `gcloud` command-line tool to use the project your Firebase project.
```
$ gcloud config set project <your-project-id>
```
2. Change directory to `appengine/`
```
$ cd appengine/
```
3. Install the Python dependencies
```
$ pip install -t lib -r requirements.txt
```
4. Create an App Engine App
```
$ gcloud app create
```
5. Deploy the application to App Engine.
```
$ gcloud app deploy app.yaml \cron.yaml
```
6. Open [Google Cloud Logging](https://console.cloud.google.com/logs/viewer) and in the right dropdown select "GAE Application". If you don't see this option, it may mean that App Engine is still in the process of deploying.
7. Look for a log entry calling `/_ah/start`. If this entry isn't an error, then you're done deploying the App Engine app.

### 3. Deploy to Google Cloud Functions for Firebase

1. Ensure you're back the root of the repository (`cd ..`, if you're coming from Step 2)
1. Deploy the sample `hourly_job` function to Google Cloud Functions
```
$ firebase deploy --only functions
```
**Warning:** This will remove any existing functions you have deployed.

### 4. Verify your Cron Jobs
We can verify that our function is wired up correctly by opening the [Task Queue](https://console.cloud.google.com/appengine/taskqueues) tab in AppEngine and
clicking on **Cron Jobs**. Each of these jobs has a **Run Now** button next to it.

The sample functions we deployed only has one function: `hourly_job`. To trigger
this job, let's hit the **Run Now** button for the `/publish/hourly-tick` job.

Then, go to your terminal and run...

```
$ firebase functions:log
```

You should see a successful `console.log` from your `hourly_job`.

### 5. You're Done!
