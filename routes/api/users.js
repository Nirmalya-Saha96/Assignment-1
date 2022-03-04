const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

router.post('/addUser',
[auth,
  [
    body('userName', 'Your name should not contain any spaces and must be alphaneumeric').not().isEmpty().isAlphanumeric().custom(value => !/\s/.test(value)),
    body('mobile', 'Please enter your mobile number of 10 digits').isLength({ min: 10 }),
    body('email', 'Please enter proper email').isEmail(),
    body('address', 'Please enter a a address').not().isEmpty(),
  ]
],
async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const { userName, mobile, email, address } = req.body;

    try{
        let user = await User.findOne({ email });

        if(user){
            return res.status(400).json({ errors: [{ msg: 'User already exists'}]});
        }

        user = new User({
            userName,
            mobile,
            email,
            address
        });

        await user.save();
        res.json({ msg: 'User added successfully' });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/users', auth, async (req, res) => {
    try {
        const profiles = await User.find();
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.delete('/:id', auth, async (req,res) => {
  try {
    const user = await User.findById(req.params.id);

    if(!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    await user.remove();

    res.json({ msg: 'User removed' });
  }catch(err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server error');
  }
});

router.post('/login',
[
    body('email', 'Please enter your email').isEmail(),
    body('password', 'Please enter the password').not().isEmpty()
],
async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const { email, password } = req.body;

    try{
        if(email === 'admin@namasys.co' && password === 'admin123'){
          const payload = {
              user: {
                  id: email
              }
          };
          jwt.sign(payload,
               config.get('jwtSecret'),
               { expiresIn: 300 },
               (err, token) => {
                   if(err) throw err;
                   res.json({ token });
               }
          );
        }
        else {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials'}]});
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
