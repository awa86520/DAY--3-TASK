const express = require('express');
const router = express.router();
const enrollmentController = require('../controllers/enrollmentController');
router.get('/services', enrollmentController.getServices);
router.post('/send-verification-code', enrollmentController.sendVerificationCode);
router.post('/verify-code', enrollmentController.verifyCode);
router.post('/enroll', enrollmentController.enroll);

module.exports = router;