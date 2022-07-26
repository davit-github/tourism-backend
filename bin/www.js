#!/usr/bin/env node

/**
 * Module dependencies.
 */
import debug0 from 'debug';
import http from 'http';
import app from '../app';
import Socket from '../services/Socket';

process.env.TZ = 'UTC';

const debug = debug0('tourism:server');
/**
 * Get port from environment and store in Express.
 */

const port = +process.env.PORT || '4000';
app.set('port', port);


/**
 * Create HTTP server.
 */

const server = http.createServer(app);

Socket.init(server);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
