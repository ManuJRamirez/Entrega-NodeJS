const express = require('express');
const router = express.Router();
const Anuncio = require('../models/Anuncio');

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  res.locals.anuncios = await Anuncio.lista();

  res.render('index', { title: 'NodePoP' });

});

module.exports = router;
