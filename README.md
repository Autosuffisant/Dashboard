# **Dashboard Epitech**

## Contributors

> **Gabriel Huguenin-Dumittan** aka [@Autosuffisant](https://github.com/Autosuffisant) <img alt="Profile picture" width="24px" align="center" src="https://avatars.githubusercontent.com/u/63168542?v=4" />

> **Aurélien Schulz** aka [@Lisieshy](https://github.com/Lisieshy) <img alt="Profile picture" width="24px" align="center" src="https://avatars.githubusercontent.com/Lisieshy" />

## Subject requirements

The subject's requirements are the following

- Manage user authentification through registering and logging
- Linking with application thanks to OAuth2 standard
- Display widgets, edit them, move them, delete them
- Display application's features in a JSON route and the client's attributes

## Project's structure

The Dashboard is divided in three primary parts
### Front / UI <img align="left" alt="C" width="26px" src="https://github.com/Autosuffisant/Autosuffisant/blob/master/assets/react-native-logo.png?raw=true" />

The UI is the user seen application, allowing him to log-in, see his widgets and edit them as he wishes.

It was created with [React JS](https://reactjs.org/)

### Backend server <img align="left" alt="C" width="26px" src="https://github.com/Autosuffisant/Autosuffisant/blob/master/assets/nodejs-logo.png?raw=true" />

The server handles the connection protocols, saves and sends widgets to the user's interface and handles the about.json

We made it using [ExpressJS](https://expressjs.com/)

### Database <img align="left" alt="C" width="26px" src="https://github.com/Autosuffisant/Autosuffisant/blob/master/assets/mongodb-logo.png?raw=true" />

The database holds user's variables and data so on each session they keep their configuration of widgets and personal details.

We chose to design it using [MongoDB](https://www.mongodb.com/) which can be easily handled through node instances using [Mongoose](https://mongoosejs.com/)

## The services

As asked in the subject, multiples services must be possible to use.

We chose:
- GitHub API
- Spotify API

## The widgets

The widgets are by services:

- Spotify:
  - Search an artist
  - Search a track
  - Check your personal informations
- Github
  - Search a project by it's creator
  - Search an user

### Containerization

Docker compose is used to handle the UI, the backend server and the database simultaneously

### Documentation

Developer documentation of the whole application can be found [here](https://github.com/Autosuffisant/Dashboard/blob/28c825f9f1700ac5bfec63884760b417cf48a041/Dashboard%20manual.pdf)

## Bonuses

- GitHub
    - Usage of issues
    - Usage of milestones 

- UI
    - A color theme changer
    - Encryption of the user's password
    - Dark and bright theme
