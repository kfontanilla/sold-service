# Sold Service

Contains operations for sold listing data.

## Requirements

1. NodeJS >= v16
2. MySQL

## Installation

1. Download the dependencies from the root directory of the project.

```bash
npm install
```

2. Go to ./config/database.ts file then change the credentials based on your local database credentials.

3. Run migration scripts.

```bash
npm run migrate
```

4. Start the application. Then check http://localhost:3000/users for sample response.
```bash
npm run start
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)