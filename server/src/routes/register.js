const models = require('../models');

module.exports = (app) => {
  // [GET] Registration Form
  app.get('/register', (req, res) => res.render('register'));

  // [POST] Registration Request
  app.post('/register', (req, res) => {
    // Sanitization
    const form = ['firstName', 'lastName', 'email', 'password', 'passwordv'];
    for (let i = 0; i < form.length; i += 1) {
      req.sanitize(`reg_${form[i]}`).escape();
      req.sanitize(`reg_${form[i]}`).trim();
    }

    // Validation
    req.checkBody('reg_firstName', 'Please Enter Your First Name').notEmpty();
    req.checkBody('reg_lastName', 'Please Enter Your Last Name').notEmpty();
    req.checkBody('reg_email', 'Please Enter Your Email').notEmpty();
    req.checkBody('reg_password', 'Please Enter Both Password Fields').notEmpty();
    req.checkBody('reg_passwordv', 'Please Enter Both Password Fields').notEmpty();
    req.checkBody('reg_password', 'Please Enter A Longer Password').len(6);
    req.checkBody('reg_password', 'Passwords Do Not Match').equals(req.body.reg_passwordv);

    const errors = req.validationErrors();

    if (errors) {
      // Render the page again with errors
      res.render('register', {
        error: errors.map(obj =>
           obj.msg
        ),
        retryRegFirstName: req.body.reg_firstName,
        retryRegLastName: req.body.reg_lastName,
        retryRegEmail: req.body.reg_email,
      });
    } else {
      models.User
        .create({
          firstName: req.body.reg_firstName,
          lastName: req.body.reg_lastName,
          email: req.body.reg_email,
          password: req.body.reg_password,
        })
        .then(() => {
          res.redirect('/');
        })
        .catch(() => {
          res.render('register', {
            errors: ['Couldn\' register, is your email already in use?'],
            retryFirstName: req.body.reg_firstName,
            retryLastName: req.body.reg_lastName,
            retryEmail: req.body.reg_email,
          });
        });
    }// end validation errors
  }); // end post request
};