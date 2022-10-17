
# Posts project

A web/mobile application to view posts and post's comments with CRUD operations on posts.

#### Web application
![#f03c15](https://via.placeholder.com/15/f03c15/f03c15.png)
Before to start the project you have to configure back-end env variables.
Inside my-posts-be there is an .env.example file with the keys to set-up.

#### Mobile application
Mobile application dont use the same REST API endpoints, but use API provided by JSONPlaceholder.


## How to run - Web application

You can run FE and BE following this steps:

```bash
  # move into web FE project root
  cd my-posts
  
  # install all FE dependencies
  npm install

  # move back into the main root
  cd ..

  # move into web BE project root
  cd my-posts-be

  # install all BE dependencies
  npm install

  # move back into the main root
  cd ..

  # install dependencies to start FE and BE on parallel
  npm install

  # start FE and BE project
  npm run start
```

## How to run - Mobile application

You can run the application on Expo service following this steps.
You need to install on your fisical device Expo Go app. When the buid end, scan the QR code above with Expo Go (Android) or the Camera app (iOS)

**!!IMPORTANT:** Your smartphone and computer have to be connected to the same network.

#### Android: [Google Store](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)

#### iOS: [App Store](https://apps.apple.com/app/apple-store/id982107779)

```bash
  # move into app project root
  cd my-posts-app

  # install all dependencies
  npm install

  # start app on expo service
  npm run start
```


## Tech Stack

**Web application**

**Client:** React

**Server:** NestJS, Mongo DB

**Mobile application**

**Framework:** React Native, Expo