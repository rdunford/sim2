module.exports = {
    login: function (req, res, next) {
        let { username, password } = req.body;
        req.app.get('db').getUser([username, password]).then(resp => {
            req.session.user = resp[0]
            console.log('req.session.user in login: ', req.session.user)
            res.status(200).send(req.session.user);
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });

    },

    register: function (req, res, next) {
        const { session } = req;
        let { username, password } = req.body;
        // console.log(req.body)

        req.app.get('db').createUser([username, password]).then(resp => {
            // console.log('login resp', resp)
            session.user = resp;
            res.status(200).send(session.user[0].userid);
        })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });

    },

    logout: function (req, res, next) {
        const { session } = req;

        session.destroy();
        res.status(200).send(req.session);
    },

    getUser: function (req, res, next) {
        const { session } = req;

        req.status(200).send(session.user);
    }
}