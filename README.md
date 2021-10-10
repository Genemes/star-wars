# Front Star Wars

The Project Star Wars use the API available in [http://swapi.dev/](http://swapi.dev/).

In listing people the project make asynchronous requests for Star Wars API, with result that request make outhres resquest for find images the people, using the service Google APIS (Google Images). The requests are made in parallel use the resource powerful the Angular, forkJoin.

In detail component it also uses asynchronous request to retrieve ships used by the person in the movies.

## Table of Content
   * [Front Star Wars](#front-star-wars)
   * [Table of Content](#table-of-content)
   * [Features](#features)
   * [Result](#result)
   * [Usage](#usage)
   * [Tecnologies](#tecnologies)
   * [Contributing](#contributing)
   * [License](#license)


### Features

- [x] Recover characters
- [x] List characters
- [x] Retrieve image with Google API
- [x] Parallel requests
- [x] Pagination
- [x] Character details
- [ ] Unit Tests


## Result
* Front Star Wars

![Star-Wars-Screen](https://user-images.githubusercontent.com/31279667/136679695-5957b7dd-fe2b-445d-923c-ea6f13111bc3.gif)


## Usage

```bash
# Clone this repository
$ git clone <https://github.com/Genemes/star-wars>

# Access the project folder in the terminal/cmd
$ cd star-wars

# Install all dependecies uses the command:
$ npm install

# For execute Project uses the command:
$ ng server

# Open browser in address: http://localhst:4200 <http://localhost:4200>
```

### 🛠 Tecnologies

The following tools were used in the construction of the project:

- [Angular](https://angular.io/)
- [Angular CLI](https://angular.io/cli)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
