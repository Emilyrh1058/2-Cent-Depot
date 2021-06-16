const router = require('express').Router();
const commentRoutes = require('./comment-routes');
const centsRoutes = require('./2cents-routes');

// add prefix of `/posts` to routes created in `2cents-routes.js`

router.use('/comments', commentRoutes);
router.use('/posts', centsRoutes);

module.exports = router;