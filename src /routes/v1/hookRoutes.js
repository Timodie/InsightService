const express = require('express');
const router = express.Router();
const hooksController = require('../../controllers/hooksController')

router.post('/hook', hooksController.sampleHookController)

module.exports = router;
