class Tables {
    init(connection) {
        this.connection = connection
        this.createAttendance()
        this.createPets()
    }

    createAttendance() {
        const sql = 'CREATE TABLE IF NOT EXISTS atendimentos ( ' +
            'id int NOT NULL AUTO_INCREMENT, ' +
            'cliente varchar(50) NOT NULL, ' +
            'pet varchar(20), ' +
            'servico varchar(20) NOT NULL, ' +
            'data datetime NOT NULL, ' +
            'dataCriacao datetime NOT NULL, ' +
            'status varchar(20) NOT NULL, ' +
            'observacoes text, ' +
            'PRIMARY KEY (id))'
        this.connection.query(sql, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Table atendimentos created');
            }
        })
    }

    createPets() {
        const sql = 'CREATE TABLE IF NOT EXISTS pets ( ' +
            'id int NOT NULL AUTO_INCREMENT, ' +
            'nome varchar(50), ' +
            'imagem varchar(200), ' +
            'PRIMARY KEY(id))'

            this.connection.query(sql ,(error) => {
                if(error) {
                    console.log(error);
                } else {
                    console.log('Table pets created');
                }
            })
    }

}

module.exports = new Tables