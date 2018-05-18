module.exports = {

    getProperty: function (req, res, next) {
        let { userid } = req.session.user
        let { desiredrent } = req.query
        console.log(desiredrent);

        if (desiredrent === undefined) {
            req.app.get('db').getProperties([userid]).then(response => {
                console.log('response after db call for properties: ', response)
                res.status(200).send(response)
            }).catch(err => {
                console.log(err)
                res.status(500).send(err);
            })
        }
        else {
            req.app.get('db').filter_by_rent([userid, desiredrent]).then(response => {
                res.status(200).send(response)
            }).catch(err => {
                console.log(err)
                res.status(500).send(err)
            }
            )
        }

    },

    createProperty: function (req, res, next) {
        console.log('CP hit -> req.body: ', req.body)
        let { userid } = req.session.user
        let { name,
            address,
            city,
            state,
            zip,
            img,
            monthly,
            desiredrent,
        } = req.body
        req.app.get('db').createProperty([name,
            address,
            city,
            state,
            zip,
            img,
            monthly,
            desiredrent,
            userid]).then(response => {
                req.app.get('db').getProperties([userid]).then(response => {
                    res.status(200).send(response)
                }).catch(err => {
                    res.status(500).send(err)
                    console.log(err)
                })
                // res.status(200).send(response)
            }).catch(err => {
                res.status(500).send(err)
            })

    },

    deleteProperty: function (req, res, next) {
        let { userid } = req.session.user
        let propertyid = Number(req.params.id)
        req.app.get('db').deleteProperty([propertyid, userid]).then(response => {
            res.status(200).send(response)
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        });
    }

}