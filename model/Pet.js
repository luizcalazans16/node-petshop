const connection = require('../infra/dbConnection')
const uploadArquivo = require('../files/FileUpload')

class Pet {
    add(pet, res) {
        const sql = 'INSERT INTO pets SET ?'

        uploadArquivo(pet.imagem, pet.nome, (error, newPath) => {
            if (error) {
                res.status(400).json({ error })
            } else {
                const petToSave = {
                    nome: pet.nome,
                    imagem: newPath
                }
                connection.query(sql, petToSave, (error) => {
                    if (error) {
                        console.log(error);
                        res.status(400).json(error)
                    } else {
                        res.status(201).json(petToSave)
                    }
                })
            }
        })

    }
}

module.exports = new Pet()