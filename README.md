<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#description">Description</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#folder-structure-conventions">Folder Structure Conventions</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

# About The Project

## Description
Contains operations for sold listing data.

## Built With

This section is the list any major frameworks/libraries used to bootstrap the project.

* [Typescript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [Sequelize](https://sequelize.org/)

# Getting Started

## Prerequisites

1. NodeJS >= v16
2. MySQL
3. Typescript

## Installation

1. Download the dependencies from the root directory of the project.

```bash
npm install
```

2. Go to pipeline\config\app\local.env file then change the credentials based on your local rds credentials.

3. Build local environment.
```bash
npm run build:local
```

4. Start the application. Then check http://localhost:3000/users for sample response.
```bash
npm run local
```

# Folder Structure Conventions
### Directory layout

    .
    ├── config/                 # Configurations
        ├── database.ts         # RDS Configuration
    ├── pipeline/               # Pipeline Build Scripts
    ├── src/                    # Source files
    ├── package.json            # Node Dependencies and Script list
    └── README.md

# Deployment
1. Connect to Placester VPN
2. Open Terminal
3. Connect to specific environment ec2 instance via ssh
```bash
// Sample for develop environment
ssh <username>@sold1.va.pl-internal.net
```
4. Login to ssh 
```bash
sudo su -
```
5. Change directory to sold-service
```bash
cd sold-service
```
6. Git pull environment branch that needs to be deployed
```bash
git pull origin <BRANCH_NAME>
```
7. Compile Typescript code
```bash
// Environment is develop or staging or production
npm run build:<Environment>
```
8. Test if changes has been reflected by using the ec2 domain as host name
# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

# License
[MIT](https://choosealicense.com/licenses/mit/)