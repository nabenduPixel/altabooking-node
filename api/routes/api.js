const router = require('express').Router();

// AUTHENTICATION ROUTES --------------------------------
const authController = require('../controllers/auth.controller');

router.post('/auth/registration', authController.registration);
router.post('/auth/login', authController.login);


const TourActivitiesController = require('../controllers/tourActivities.controller');

router.get('/tour-activities/countries', TourActivitiesController.getCountries);
router.post('/tour-activities/search-activities', TourActivitiesController.searchActivities);

module.exports = router;
