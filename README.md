# Collegiate Housewars

Welcome to the repository for the Collegiate School of Medicine and Bioscience BDPA 2023 project site. This is a project that is completely made using a NodeJS stack. This repository is open-source, so feel free to download, play around, and/or contribute. Below is a guide detailing the basic usage of the site and instructions for installation of a local development server. Enjoy!

| Table of Contents             |
| ----------------------------- |
| [Setup](#setup)               |
| [Hosting](#hosting)           |
| [Contributing](#contributing) |

## Setup

Welcome to the installation section of the guide. This will walk you through installing the site and spinning up a local development server. There are two methods to settings up the development server. One uses docker and the other just boots up a local development server. I would highly recommend setting up docker for contributing, it is used by very many other projects and is a great tool for development.

-   [With Docker](#setup-with-docker)
-   [Without Docker](#setup-without-docker)

### Setup with Docker:

#### Prerequisites:

-   `git` - You can test if you have git installed using the command `git -v`, which should output a version number. If you do not have git installed you can download it [here](https://git-scm.com/downloads).
-   `docker` - You can test if you have docker installed by typing `docker -v` in the terminal. The resulting output should be a version number. If you do not have docker installed, you can download it [here](https://www.docker.com/get-started/).

#### Instructions

1. Clone the repository into the desired directory using `git clone https://github.com/CollegiateMedicineAndBioscience/wwt-2023.git`.
2. Navigate into the repository using `cd wwt-2023`.
3. Open Docker and run the command `docker compose up -d` in a shell.
4. In Docker, open the shell of the `app-1`.
5. Server should be running automatically. The site will be accessible using the [default url](http://localhost:3000). The API will be available at it's [default url](http://localhost:3001) Any changes made in the filesystem will update live on the local server.

#### Relevant Commands:

-   `docker compose up`: This will run the docker server on the default url.
    -   `-d`: Removed terminal output from the command (disconnected mode). TLDR: docker doesn't steal your terminal
-   `docker compose down`: This will stop the currently running containers and free up other ports for other apps (if you have them).
    -   `-v`: Removes volumes as well. Docker volumes can get very large and this will wipe all data contained in your database. WARNING: This will also delete any test data that you have added to the project.

### Setup without Docker:

#### Prerequisites:

-   `git` - You can test if you have git installed using the command `git -v`, which should output a version number. If you do not have git installed you can download it [here](https://git-scm.com/downloads).
-   `node` - You can test if you have node installed by typing `node -v` in the terminal. The resulting output should be a version number. If you do not have node installed, you can download it [here](https://nodejs.org/en/download/).

#### Instructions:

1. Clone the repository into the desired directory using `git clone https://github.com/CollegiateMedicineAndBioscience/wwt-2023.git`.
2. Navigate into the repository using `cd wwt-2023`.
3. Install all dependencies using `npm i`. This command may take several minutes.
4. Run the local development server using `npm run start` and its variants, `start:server` and `start:client`.

### Relevant Commands:

-   `npm run test`: Runs all tests for current features of the site. If something fails, your broke something, please fix it. If you think its not your fault, it probably is. However, if your REALLY (reevaluate life, please) think its not your fault, create an issue and we will try our best to resolve it as soon as possible. Your code will not commit if these tests do not pass.
-   `npm run migrate`: If you end up making any changes to the files in `housewars/models`, please run this command to log your changes. This will allow us to make the relevant changes to our production database and display the new features on the site.
-   `npm run eslint:all`: Will run all linting software to make sure that code uses standard formatting. Your code will not merge without this test passing.

## Hosting

### Options

There are several options that you can use for hosting the site on a production server. My personal recommendation would either be Heroku or Linode, since it comes pre-configured with the website. Linode and Heroku are both $5, Linode offers more flexibility, while Heroku is easier for beginners to use.

### Environment Variables

The server environment variables are used to secure data and keep it from entering a cloud, open-acccess environment. Because of this, you will need to define a them file yourself. These are only needed in production and are completely unnecessary if you are using a local development server. The varaibles that you will need are:

-   DATABASE_USERNAME - This will be the username of your production database.
-   DATABASE_PASSWORD - This will be the password of your production database.
-   DATABASE_HOST - This will be the IP address of your production database.

## Contributing

As an open-source school repository we welcome all contributors willing to help make the website better (hacking or otherwise).

### Instructions

1. Follow the [setup instructions above](#setup) to install the required dependencies and run the local server. You will want to fork the repository and clone your own repository.
2. Commit your new features to your new forked repository.
3. Create a pull request that details the changes/improvements that you have made.
4. Wait for @C4theBomb (C4 Patino), @gywn9081 (Henry Bloch), or @Slayer121 (Dylan Fritz) to open discussion or merge your pull request.
5. After your pull request is merged, it will automatically be uploaded into production code and will show up on the website.
