# Welcome to Employee Review System App

- Coding Ninja Backend Skill Test 2

## Features

- Authentication and Authorization using jwt token
- Session management
- Usage of ejs to show UI
- Add and Track Habits on a Daily and weekly basis
- Resource Management
- Global Error Handling
- Logging Request and errors
- Extensible code flow and Folder structure
- Best env variable setup
- Track User Last Visit

## Code Flow

- First browser sends the request to the server
- Server points to our specific routes
- before the controller, it may be that there will be middlewares or validators or maybe both
- If no Middleware of the validator then the request goes to the specific controller
- Controllers will send back the response, no need to call services
- Services are basically functions that help us to get data from DB (here is local DB)
- Service may use models to save data in some specific format

Note:
Middleware/validators may or may not be there
Services/models may or may not be there

Image for better understanding

![How-Node-code-works](https://github.com/pktherock/Habit-Tracker/assets/59223750/c8cdaadf-09ad-4c2a-9a24-c618859282e8)

## Packages used in this project.

1. bcrypt
   -> To hash and compare the hashed password
2. compression
   -> To compress res bodies
3. cookie-parser
   -> To interact with cookies
4. dotenv
   -> To store sensitive configurations in a .env file
5. ejs
   -> To show HTML with Dynamic injected data, JavaScript with HTML
6. express
   -> To create Servers (with minimal code)
7. express-async-handler
   -> To wrap controller function so that if any error comes it will next function with the error automatically
8. express-ejs-layouts
   -> To use main HTML, Header, and footer as base layout and inject other ejs files based on requirements
9. express-rate-limit
   -> To prevent or limit repeated requests to our APIs (a normal user can not send more than 60 request per second)
10. express-session
    -> To manage Sessions
11. express-validator
    -> To validate request body data
12. helmet
    -> Helmet helps secure Express apps by setting HTTP response headers.
13. jsonwebtoken
    -> To create jwt token
14. nodemailer
    -> To send email
15. uuid
    -> To generate a random ID
16. winston
    -> It helps us to log the req or res in a very easy way

## How to run this project locally

- Clone this repository
- create a .env file at the root of this project
- create all env variable which is given in the .env.example file with proper info
- then run npm install (to install all packages used in this project)
- then run npm run start
- go to the link shown in the terminal
- On the login page, one test user info is there, you can log in with that email ID and password
- I highly recommend creating another user by signUp for better understanding.
- Now you are good to go
- keep in mind that your activity are stored in localDB(cache) so after server restarts all data will be reseated
- Thank YOU

### Live Demo Link

[Live Demo Link]()
