const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check

exports.signup = (req, res) => {

  bcrypt.hash( req.body.password , 10 ,(err, result) => {
    if(err) {
      console.log(err);
    } else {
      req.body.password = result
      console.log(result);
    }

    const auth = {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    }

    const user = new User(auth)
    console.log(req.body);
    user.save((err, user) => {
      if(err) {
        return res.status(400).json({
          error: "Email is taken"
        })
      }
      user.password = undefined;
      return res.json({
        user
      })
    })
  })

}

exports.signin = (req, res) => {
  const {email, password} = req.body

  User.findOne({email}, (err, result) => {
    if (err || !result) {
        return res.status(400).json({
            error: 'User with that email does not exist. Please signup'
        });
      }

      // bcrypt.compare(password, result.password).then(user => {
      //   if(!user) {
      //       return res.status(400).json({
      //       msg: "no such user"
      //     })
      //   } else {
      //   return  res.status(200).json({
      //     msg: "signin success"
      //   })
      //   }
      // })

      bcrypt.compare(password, result.password, (err, user) => {
          if(user) {
            const token = jwt.sign({_id: result.id}, process.env.JWT_SECRET)

            res.cookie('t', token, {expire: new Date() + 9999})

            const {_id, name, email, role} = result
            return  res.json({
              token, user: {_id, email, name, role}
            })
          } else {
          return  res.status(400).json({
            error: "Email and password dont match"
          })
          }
      })
  })
}


exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout success' });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
    algorithms: ['HS256']
});
