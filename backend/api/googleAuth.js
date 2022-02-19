const { client_id, authSecret } = require('../.env')

module.exports = app => {

    async function signin(req, res) {
        const token = req.body.token

        const { OAuth2Client } = require('google-auth-library');
        const client = new OAuth2Client(client_id);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: client_id,
            });
            const payload = ticket.getPayload();

            let user = await app.db('users')
                .select('id', 'name', 'email')
                .where({ email: payload.email })
                .first()

            if (user) {
                res.status(201).send(user)
            } else {
                const encryptPassword = app.api.user.encryptPassword
                let user = {
                    name: payload.name,
                    password: encryptPassword(authSecret),
                    email: payload.email
                }

                await app.db('users')
                    .insert(user)
                    .then(_ => {
                        app.db('users')
                            .select('id', 'name', 'email')
                            .where({ email: payload.email })
                            .first()
                            .then(user => res.send(user))
                    })
            }

        }
        verify()
            .catch(e => console.log(e));
    }

    return { signin }
}