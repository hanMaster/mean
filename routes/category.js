const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../middleware/upload');
const controller = require('../controllers/category');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }, null),
  controller.getAll
);
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }, null),
  controller.getById
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }, null),
  controller.remove
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }, null),
  upload.single('image'),
  controller.create
);
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }, null),
  upload.single('image'),
  controller.update
);

module.exports = router;
