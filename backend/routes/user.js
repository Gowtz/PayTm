const {Router} = require('express');
const {getUsers,signUp, signIn} = require('../controller/user')
const  router = Router();

router.post('/signin',signIn)
router.post('/signup',signUp)
router.get('/getusers',getUsers)

module.exports = router
