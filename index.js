const customExpress = require('./config/customExpress')
const connection = require('./infra/dbConnection')
const tables = require('./infra/tables')

connection.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Connection established');
        tables.init(connection)
        const app = customExpress()
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'))

    }
})


