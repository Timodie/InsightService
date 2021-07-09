const express = require('express');
const router = express.Router();
const insightController = require('../../controllers/insightController');

router.get('/allInsight', insightController.getAllInsight);
router.get('/sampleGET', insightController.mySampleGET);
router.get(`/getReference`, insightController.getReferenceForInsightName);
router.get(`/getFlatInsight`, insightController.getFlatInsight);
router.get(`/allInsightRefs`, insightController.getAllInsightReferences);
router.get(`/insightContent`, insightController.getInsightContent);
module.exports = router;
