const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const api = require('./routes/api');
const { errorHandler, notFound } = require('./middleware/error.middleware');
// const setCache = require('./middleware/cache.middleware');

const app = express();

Sentry.init({
  dsn: 'https://605eff850d6848a2bc09a83d90748969@o4504854230007808.ingest.sentry.io/4504854244360192',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use((err, req, res) => {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(`${res.sentry  }\n`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
// app.use(setCache);

app.use('/api', api);

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build'));
  });
}

app.use(notFound);
app.use(errorHandler);
module.exports = app;
