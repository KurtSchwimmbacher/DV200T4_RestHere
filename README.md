![ClearView Header Image](https://github.com/KurtSchwimmbacher/DV200T4_RestHere/blob/main/resthere-frontend/src/assets/ReadMe_Logo.png)

- - - -

# About RestHere

RestHere is a mental heatlh support platform created with the goals of providing users, who feel they need support, a safe space to share anonymously, reach out to professionals, journal, and find helpful resources.

## Built With
### Frontend
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)](https://react.dev/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/Overview.en.html)
[![ReactBootstrap](https://img.shields.io/badge/ReactBootStrap-41E0FD?style=for-the-badge&logo=reactbootstrap&logoColor=black)](https://react-bootstrap.netlify.app/)
[![ReactRouter](https://img.shields.io/badge/ReactRouter-CA4245?style=for-the-badge&logo=ReactRouter&logoColor=white)](https://reactrouter.com/en/main)
[![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://react-redux.js.org/)
### Backend
[![NodeJS](https://img.shields.io/badge/NodeJS-5FA04E?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/lp/cloud/atlas/try4-reg?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_prosp-brand_gic-null_emea-za_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624560&adgroup=115749711783&cq_cmp=12212624560&gad_source=1&gclid=Cj0KCQjwm5e5BhCWARIsANwm06iaJRATCRDoXA4gID4BnJFgLh2T8-Ema018Hvw6DYFQotXuVd9rm1caAk3sEALw_wcB)
[![Express](https://img.shields.io/badge/Express-010409?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-F04D35?style=for-the-badge&logo=mongoosedotws&logoColor=white)](https://mongoose.ws/)


## How To Install
Prerequisites
```
Node.js (version 20.18.0 or later)
```
```
MongoDB (either locally or via a cloud provider like MongoDB Atlas)
```
```
Git or Github
```
```
A code editor (e.g., Visual Studio Code, Sublime Text)
```

Step 1 clone the repo:
```
git clone https://github.com/KurtSchwimmbacher/DV200T4_RestHere
```
Step 2: Set up environment variables
```
MONGODB_URI=your_mongodb_connection_string 
PORT=5000 (or any other port)
JWT_SECRET=your_jwt_secret_key
```

Step 3: Install Backend Dependencies in Terminal
```
cd resthere-backed
```
```
npm install (bcrypt, cors, dotenv, express,mongoose, validator)
```
Step 4: Install frontend dependencies in New Terminal
```
cd resthere-frontend
```
```
npm install( full-calendar, axios, react-bootstrap, react-router, react-redux)
```
Step 5: Start the backend and the frontend servers separately with
```
npm run start
```


## Features

| Page                  | Description                                                     |
| --------------------- | --------------------------------------------------------------  |
| Login / Signup Page   | - Allows all users to create a profile                          |
|                       | - Provides login functionality for registered users             |
| Home Page             | - Allows Users to see a brief highlight of website features     |
| Journal Page          | - Allows logged in users to create journal entries for the day  |
|                       | - Allows Users to view all past journal entries                 |
|                       | - Allows Users to edit and delete journal entries               |
| Resources Page        | - Allows Users to view admin-posted resources                   |
|                       | - Allows Users to search for specific resources with search bar |
|                       | - Allows Users to sort resources, and filter by tags            |
|                       | - Opens Resource Links in external tab when card is clicked     |
| Forum Page            | - Allows Users to view all other user's posts                   |
|                       | - Allows Users to search for specific posts with search bar     |
|                       | - Allows Users to sort posts, and filter by tags                |
| Chat Page             | - Allows Users to view all other user's posts                   |
|                       | - Allows Admins to create, edit, and delete Professionals       |
|                       | - Allows Users to view all Professionals and send them a message|
|                       | - Allows Users and Professionals to see messages in 'chatrooms' |
| Account Page          | - Allows Users to update profile picture, and view user info    |
|                       | - Allows Users to create new Posts, and view their own posts    |
|                       | - Allows Users to edit and delete past posts                    |
|                       | - Allows Admin Users to create new Resources, and view their own|
|                       | - Allows Admin Users to edit and delete past resource           |


## UI Design


### Home Page
![Home Page](https://github.com/KurtSchwimmbacher/DV200T4_RestHere/blob/main/resthere-frontend/src/assets/UI_designs/Home_Page.png)

### Login / Sign Up Page
![Login Page](https://github.com/KurtSchwimmbacher/DV200T4_RestHere/blob/main/resthere-frontend/src/assets/UI_designs/Login_Page.png)
![Sign Up Page](https://github.com/KurtSchwimmbacher/DV200T4_RestHere/blob/main/resthere-frontend/src/assets/UI_designs/SignUp_Page.png)

### Account Page
![Account Page](https://github.com/KurtSchwimmbacher/DV200T4_RestHere/blob/main/resthere-frontend/src/assets/UI_designs/Account_Page.png)

### Post Offcanvas and Resource Modal
![Post OffCanvas](https://github.com/KurtSchwimmbacher/DV200T4_RestHere/blob/main/resthere-frontend/src/assets/UI_designs/Post_Offcanvas.png)
![Resource Modal](https://github.com/KurtSchwimmbacher/DV200T4_RestHere/blob/main/resthere-frontend/src/assets/UI_designs/Resource_Modal.png)

### Journal Page / Journal OffCanvas
![Journal Page](https://github.com/KurtSchwimmbacher/DV200T4_RestHere/blob/main/resthere-frontend/src/assets/UI_designs/Journal_Page.png)
![Journal OffCanvas](https://github.com/KurtSchwimmbacher/DV200T4_RestHere/blob/main/resthere-frontend/src/assets/UI_designs/Journal_OffCanvas.png)

### Resource Page
![Resource Page](https://github.com/KurtSchwimmbacher/DV200T4_RestHere/blob/main/resthere-frontend/src/assets/UI_designs/Resources_Page.png)

### Forum Page
![Forum Page](https://github.com/KurtSchwimmbacher/DV200T4_RestHere/blob/main/resthere-frontend/src/assets/UI_designs/Forum_Page.png)

### Chat Page / Chat OffCanvas / Message OffCanvas / Manage Professional Modal
![Chat Page](https://github.com/KurtSchwimmbacher/DV200T4_RestHere/blob/main/resthere-frontend/src/assets/UI_designs/Chat_Page.png)
![Chat Offcanvas](https://github.com/KurtSchwimmbacher/DV200T4_RestHere/blob/main/resthere-frontend/src/assets/UI_designs/Chats_OffCanvas.png)
![Message OffCanvas](https://github.com/KurtSchwimmbacher/DV200T4_RestHere/blob/main/resthere-frontend/src/assets/UI_designs/Message_OffCanvas.png)
![Proffessional Offcanvas](https://github.com/KurtSchwimmbacher/DV200T4_RestHere/blob/main/resthere-frontend/src/assets/UI_designs/Professional_Offcanvas.png)
![Professional Modal](https://github.com/KurtSchwimmbacher/DV200T4_RestHere/blob/main/resthere-frontend/src/assets/UI_designs/Proffessional_Modal.png)


## Development Process

### Highlights
* Calming and relaxed UI to create an environment that feels secure to users
* Off Canvas and Modal components to group functionality into one page


### Challenges
* The Chat page was difficult to execute in a way that felt authentic, and has limited functionality.
* Initially the goal was to moderate forum posts with the OpenAI moderation API endpoint but this proved complicated

## Future Implementations
* Allow Users to reply and vote on Forum Posts and Resource Posts
* Implement AI moderation into forum
* Improve Chat to allow for editing and deleting message
* Potentially add full therapy features - allow for video calls, group sessions, and scheduling on calender 

## Mockups

### Home Page Mockup


### Journal Page Mockup


### Resources Page Mockup


### Forum Page Mockup


### Profile Page Mockup



## Demonstration


### License
[MIT](LICENSE) © Kurt Schwimmbacher
