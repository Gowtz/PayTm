const {Router} = require('express');
const {getUsers,signUp, signIn} = require('../controller/user')
const {getCurrentUser, authenticateUser} = require('../middleware/auth')
const  router = Router();

router.post('/signin',signIn)
router.post('/signup',signUp)
router.get('/getusers',authenticateUser,getUsers)
router.get('/current',getCurrentUser)

module.exports = router
