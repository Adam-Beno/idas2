import dotenv from 'dotenv';
import { app, BrowserWindow } from 'electron';
import url from 'url';
import path from 'path';
import fs from 'fs';

import express from 'express';
import graphQLExpress from 'express-graphql';
import webpack from 'webpack';
import webpackDevMideware from 'webpack-dev-middleware';
import webpackHotmidleware from 'webpack-hot-middleware';
import GraphQLSchema from 'server/graphql/createSchema';
import webpackConfig from './webpack.config.babel';
import knex from './src/server/utils/db';

dotenv.config();

let server = express();
// Set up the graphQL endpoint
GraphQLSchema.then((schema) => {
  server.use('/graphql', graphQLExpress({
    schema,
    graphiql: true,
  }));
  console.log('GraphQL endpoint registered.');
});

// Show dev tools if the app is in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  server.use(webpackDevMideware(
    compiler,
    {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    },
  ));
  server.use(webpackHotmidleware(compiler));
}

// Start up the server
server.listen(7000, () => console.log('Server running at 7000.'));

let win = null;

/**
 * Get dev tool extension path
 * @param {*} extPath - Absolute path to chrome extension
 */
function getExtensionPath(extPath) {
  const files = fs.readdirSync(extPath);

  if (files.length > 0) {
    return `${extPath}\\${files[0]}`;
  }
  return '';
}

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: true,
    transparent: true,
    resizable: false,
  });

  // Open the DevTools.
  win.webContents.openDevTools();
  if (process.env.NODE_ENV === 'development') {
    BrowserWindow.addDevToolsExtension(getExtensionPath(process.env.EXT_REACT));
    BrowserWindow.addDevToolsExtension(getExtensionPath(process.env.EXT_REDUX));
  }

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, './index.html'),
    protocol: 'file:',
    slashes: true,
  }));


  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
    server = null;
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
