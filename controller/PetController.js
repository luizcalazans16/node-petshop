const Pet = require('../model/Pet')

module.exports = app => {
    app.post('/pet', (req, res) => {
        const pet = req.body
        Pet.add(pet, res)
    })
}