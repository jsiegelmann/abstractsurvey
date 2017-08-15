const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const config = require('../config')
const models = require('../models')


/**
 * Initalizes an Express app to work with local-strategy
 * and the User model implemented in this app.
 *
 * It is important that the client has enabled xhr
 * as the app is designed to work with CORS
 *
 * @param {*} app
 */

function initExpressApp (app) {

  // Session : Serialization
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // Session : Deserialization
  passport.deserializeUser((id, done) => {
    models
      .fetchUser({id})
      .then(user => done(null, user))
      .catch(error => done(error, null))
  })

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      models
        .fetchUser({email: email})
        .then(user => {
          if (user) {
            models
              .checkUserWithPassword(user, password)
              .then((user) => {
                if (user === null) {
                  done(null, false)
                } else {
                  done(null, user, {name: user.name})
                }
              })
          } else {
            done(null, false)
          }
        })
    }))

  app.use(passport.initialize())
  app.use(passport.session())

}

module.exports = {
  initExpressApp
}
