const { Router: router } = require('express');

const { post } = require('./post');

module.exports = (models, { config }) => {
    const api = router();
  
    api.post('/', post(models, { config }));
  
    return api;
};
