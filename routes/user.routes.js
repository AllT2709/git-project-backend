const router = require('express').Router();
const controller = require('../controllers/user.controller');

router.get('/users', async (req,res) => {
  let users = await controller.getUsers();
  res.status(200).json(users);
});

router.post('/users', async (req,res) => {
  let {body} = req;
  if ( !body || !body.username || !body.password) {
    return res.status(400).json({
      error: 'content missing'
    });
  }
  let userSaved = await controller.postUser(body);
  res.status(201).json({
    message: 'User Saved saccessfully',
    user: userSaved
  });
});


//********USER LOGIN***********//
router.post('/login', async (req,res) => {
  let {body} = req;
  let {token, user} = await controller.getOneUser(res,body);

  res.status(200).json({
    token,
    username: user.username,
    name: user.name
  });
});


module.exports = router;