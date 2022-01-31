# Getting Started with React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### Running `npm start` in project / folder
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## DB Connection
You should also run the DB connection before making any data changes:
To connect the App in the DB you may access the folde /src/services/nodeServer.js and run `node nodeServer.js`

The server will be connected and if there is no DB Created in the local machine, Node will identify and create a new.

## What do you need to proceed to make this app works for everyone?
1- You will need to finish the SalesForce Connection:
    1.1: You can use the video https://www.youtube.com/watch?v=81e1fPcR14c&ab_channel=salesforcetroop to guide you.
    1.2: The changes are needed in /src/services/nodeServer.js at line 27
    1.3: You may use a .env file with your credentials (don't forget to make the Token reset in SalesForce)
    1.4: Once the connection completed, you may change the login on line 37 to extract the data from SalesForce

2- Once the logic created, you will need to filter who is under coverage. There are routes about it in the file /src/routes/api.js

3- Then you are ready to notify the team using Teams
    3.1 You may notify once per day only 
        3.1.1 save those notifications to check in the next day if is there any update. If there are new updates, then notify once again.

4- Remember to make tables to log these moviments. You can create the model in /src/models and the app will make it for you.

## Putting it available for everyone:
1- Check the server info with Automation team

2- You may check with IT team the possibility to open the port that the app will be running, then anyone can access the app via browser using `www.serverIP:portID/`

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
