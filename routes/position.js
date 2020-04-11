const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/position');

router.get(
  '/:categoryId',
  passport.authenticate('jwt', { session: false }, null),
  controller.getByCategoryId
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }, null),
  controller.create
);
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }, null),
  controller.update
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }, null),
  controller.remove
);

module.exports = router;
