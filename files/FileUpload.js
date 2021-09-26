const fileSystem = require('fs')
const path = require('path')

module.exports = (imagePath, fileName, callbackImagemCriada) => {

    const tiposValidos = [
        'jpg',
        'png',
        'jpeg'
    ]
    const tipo = path.extname(imagePath)
    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1

    if (tipoEhValido) {
        const newpPath = `./assets/images/${fileName}${tipo}`
        fileSystem.createReadStream(imagePath)
            .pipe(fileSystem.createWriteStream(newpPath))
            .on('finish', () => callbackImagemCriada(false, newpPath))
    } else {
        const erro = 'Tipo de arquivo inválido'
        console.log('Tipo de arquivo inválido')
        callbackImagemCriada(erro)
    }


}
