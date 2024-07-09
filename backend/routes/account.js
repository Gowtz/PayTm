const {Router} = require('express');
const {getBalance,transaction} = require('../controller/account');
const { authenticateUser } = require('../middleware/auth');
const  router = Router();

router.get('/balance',authenticateUser,getBalance)
router.post('/transaction',authenticateUser,transaction)


module.exports = router
