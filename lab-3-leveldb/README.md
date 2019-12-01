# Lab-2-TypeScript


## Overview

Lab 3 is a lab to learn how to interact with [Leveldb](https://github.com/google/leveldb) .
For the rest of the lab, to communicate with the Data Base use [Postman](https://www.getpostman.com/) .


## Installation

Use the package manager [npm](https://www.npmjs.com/get-npm) to install Lab1.

```bash
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm run build`

If you want to modify .ts files, you can use `build`.
This will Transpile .ts file to .js in the `/dist` folder

```bash
npm run build
```

### `npm run start`

With ts-node, you can run the server.ts file. Use `start`.

```bash
npm run start
```

### `npm run dev`

With nodemon, you can deploy the web page, using `dev`.

```bash
npm run dev
```
### `npm run pop`

```bash
npm run pop
```
It will automatically populate your data base with same data.
```typescript
const met = [
  new Metric(`${new Date('2013-11-04 14:00 UTC').getTime()}`, 12),
  new Metric(`${new Date('2013-11-04 14:15 UTC').getTime()}`, 10),
  new Metric(`${new Date('2013-11-04 14:30 UTC').getTime()}`, 8)
]
```

## Usage wit Postman

# Post

You can do a *POST* to this URL to post a metric of `marvin`  :
```
    http://localhost:1337/metrics/marvin
```
# Get


You can do a *GET* to this URL to see the metric of `marvin`  :
```
    http://localhost:1337/metrics/marvin
```
You can do a *GET* to this URL to see met the metrics of all the users:
```
    http://localhost:1337/metrics/
```

# Delete

You can do a *DELETE* to this URL to delete the metric of `marvin`  :
```
    http://localhost:1337/metrics/marvin
```
You can do a *DELETE* to this URL to delete the metrics of all the users:
```
    http://localhost:1337/metrics/
```

## Contributing

Marvin Martin (ING4 SI Gr02)

## Acknowledgements

The result is based on our teacher code, Mr Kudinov, here is his [GitHub](https://github.com/sergkudinov)

## Contact information

Contact me on mmartin.mmarvin@gmail.com

## License
No License
