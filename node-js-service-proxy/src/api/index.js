const express = require('express');

// list of controllers here
const proxy = require('../controllers/proxy');
const  ProxyModel  = require('../models/proxy');

// combine models ino one object
const models = { ProxyModel };

const routersInit = config => {
  const router = express();

  // register api points
  router.use('/proxy', proxy(models, { config }));

  return router;
};

module.exports = routersInit;