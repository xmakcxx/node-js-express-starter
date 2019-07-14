const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const rootRouter = require('./app/routes');

const app = express();
app.use(morgan((tokens, req, res) => {
  const method = tokens.method(req, res);
  const status = Number(tokens.status(req, res));
  const statusFinal = status;
  const url = tokens.url(req, res);
  const resTime = Number(tokens['response-time'](req, res, 'digits'));
  const resTimeFinal = resTime;
  const date = tokens.date(req, res, 'iso');
  const httpVersion = tokens['http-version'](req, res);
  const referrer = tokens.referrer(req, res);
  const remoteAddr = tokens['remote-addr'](req, res);
  const contentLength = Number(tokens.res(req, res, 'content-length'));
  const contentLengthFinal = contentLength;
  const userAgent = tokens['user-agent'](req, res);

  const morganData = [
    `"method":"${method}"`,
    `"status":${statusFinal}`,
    `"url":"${url}"`,
    `"response-time":${resTimeFinal}`,
    `"timestamp":"${date}"`,
    `"http-version":"${httpVersion}"`,
    `"referrer":"${referrer}"`,
    `"remote-addr":"${remoteAddr}"`,
    `"content-length":${contentLengthFinal}`,
    `"user-agent":"${userAgent}"`,
  ].join(',');
  return `{ ${morganData} }`;
}));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '100mb' }));
app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '100Mb' }));
app.disable('etag');

rootRouter.init(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
