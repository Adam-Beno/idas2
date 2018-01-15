# Antique Library

### A school project written in JS based on Electron / React / OracleDB
<br/>

[![React](/internals/img/react-padded-90.png)](https://facebook.github.io/react/)
[![Webpack](/internals/img/webpack-padded-90.png)](https://webpack.github.io/)
[![Redux](/internals/img/redux-padded-90.png)](http://redux.js.org/)
[![React Router](/internals/img/react-router-padded-90.png)](https://github.com/ReactTraining/react-router)
[![Flow](/internals/img/flow-padded-90.png)](https://flowtype.org/)
[![ESLint](/internals/img/eslint-padded-90.png)](http://eslint.org/)
[![Jest](/internals/img/jest-padded-90.png)](https://facebook.github.io/jest/)
[![Yarn](/internals/img/yarn-padded-90.png)](https://yarnpkg.com/)

[Electron](http://electron.atom.io/) application based on [React](https://facebook.github.io/react/), [Redux](https://github.com/reactjs/redux), [React Router](https://github.com/reactjs/react-router), [Webpack](http://webpack.github.io/docs/), [React Transform HMR](https://github.com/gaearon/react-transform-hmr), [Redux Saga](https://github.com/redux-saga/redux-saga).

Whole project is built on a [Electron React Boilerplate](https://github.com/chentsulin/electron-react-boilerplate).

## Prerequisities
* Have [Node.js](https://nodejs.org/en/) with version 7 or higher
* It's recommended to use [Yarn](https://yarnpkg.com/en/) over the default NPM that comes with Node.js
* Python 2.7 (**Python 3 will not work with this project**)
* [Oracle Instant Client](http://www.oracle.com/technetwork/database/features/instant-client/index-097480.html) make sure to download both **client-basic and client-sdk**. Then export the contents of the zip files into one folder.
* C++ Build tools
* **VPN Connection to school servers** to display any data
* Modify **.env** file in root folder, by adding your login credentials to the school DB

### Windows
* You can use [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) to install both Python, C++ and Windows SDK simply by using this command `npm install --global windows-build-tools`
* After you export the instant client folder, you will need to add a **PATH** variable to your system environment variables, such as `C:\oracle\instantclient` (or whatever place you extracted the instant client to)

If you are having issues with this part, you can also follow this installation guide that's more indepth [https://github.com/oracle/node-oracledb/blob/master/INSTALL.md](https://github.com/oracle/node-oracledb/blob/master/INSTALL.md)

## Install
Clone repository to your machine, then proceed by using the following commands
```bash 
$ cd idas2
$ yarn
```
This will take a while if you run the `yarn or npm install` command for first time.

*If you get **node-gyp** errors, then there is a problem with your builds tools. Check instant client location and if you have python / C++ compilers as mentioned in the prerequisities guide*

## Run

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a server that sends hot updates to the renderer process:

```bash
$ yarn run dev
```

## Packaging

To package apps for the local platform:

```bash
$ npm run package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://www.electron.build/multi-platform-build) for dependencies.

Then,
```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

## License
MIT © [Adam Beňo](https://github.com/Adam-Beno)
