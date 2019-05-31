/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START gae_node_request_example]
const express = require('express');
const logger = require('./logger');

const app = express();

app.get('/', (req, res) => {
  logger.fatal('fatal');
  logger.error('error');
  logger.warn('warn');
  logger.info('info');

  logger.info({
    httpRequest: {
      status: 200,
      requestUrl: req.url,
      requestMethod: req.method,
      remoteIp: req.connection.remoteAddress,
      userAgent: req.header('user-agent'),
      responseSize: Math.floor(Math.random() * 1000),
      latency: {
        seconds: 1,
        nanos: 500000
      },
    }
  });

  res
    .status(200)
    .send('Hello, world!')
    .end();
});

app.use((req, res, next) => {
  logger.warn({
    httpRequest: {
      status: 404,
      requestUrl: req.url,
      requestMethod: req.method,
      remoteIp: req.connection.remoteAddress,
      userAgent: req.header('user-agent'),
      responseSize: 100,
      latency: {
        seconds: 1,
        nanos: 500000
      },
    }
  });

  res.send('Not found!')
});

app.use((err, req, res, next) => {
  logger.err(err);
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
// [END gae_node_request_example]