module.exports = app => {
    app.route('/signup').post(app.api.user.save)
    app.route('/signin').post(app.api.auth.signin)
    app.route('/validateToken').post(app.api.auth.validateToken)

    app.route("/users")
    .all(app.config.passport.authenticate)
    .post(app.api.user.save)
    .get(app.api.user.get)

    app.route("/g-signin")
        .post(app.api.googleAuth.signin)
    
    app.route("/users/:id")
        .all(app.config.passport.authenticate)
        .put(app.api.user.save)
        .get(app.api.user.getUserById)
}