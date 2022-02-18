const { client_id } = require('../.env')

module.exports = app => {

    function signin(req, res) {
        const token = req.body.token

        const { OAuth2Client } = require('google-auth-library');
        const client = new OAuth2Client(client_id);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: client_id,
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            
            res.status(201).send(payload)
        }
        verify().catch(e => console.log(e));
    }

    return { signin }
}