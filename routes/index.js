const router = require('express').Router();
const { registerUser, loginUser } = require('../controllers/users');
const {
  getAllBooks,
  
} = require('../controllers/books');
const { authenticateMiddleware } = require('../middleware/jwt');

const PREFIX = process.env.PREFIX;

router.post(`${PREFIX}/login`, loginUser);
router.post(`${PREFIX}/register`, registerUser);

router
  .route(`${PREFIX}/accounts`)
  .all(authenticateMiddleware)
  .get(getAllBooks);
  



router.get('/whatever', authenticateMiddleware, (req, res, next) => {
  return res.status(200).json('Here');
});

router.use('*', (req, res) => {
  return res.status(404).send('Not Found!');
});

module.exports = router;