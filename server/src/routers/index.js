const express = require('express');
//==================================
const genreRouter = require('./genreRouters');
const shelfRouter = require('./shelfRouters');
const customerRouter = require('./customerRouters');
const authorRouter = require('./authorRouters');
const requestRouter = require('./requestRouters');
const bookRouter = require('./bookRouters');

const router = new express.Router();

router.use('/genres', genreRouter);
router.use('/shelves', shelfRouter);
router.use('/customers', customerRouter);
router.use('/authors', authorRouter);
router.use('/requests', requestRouter);
router.use('/books', bookRouter);

module.exports = router;
