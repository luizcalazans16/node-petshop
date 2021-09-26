const connection = require('../infra/dbConnection')
const moment = require('moment')

class Atendimento {
    add(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const isDataValida = moment(data).isSameOrAfter(dataCriacao)
        const isClienteValido = atendimento.cliente.length >= 5
        const validacoes = [
            {
                nome: 'data',
                valido: isDataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: isClienteValido,
                mensagem: "Cliente deve ter no mínimo 5 caracteres"
            }
        ]
        const erros = validacoes.filter(campo => !campo.valido)

        if (erros.length) {
            res.status(400).json(erros)
        } else {

            const atendimentoDatado = { ...atendimento, dataCriacao, data }
            const sql = 'INSERT INTO atendimentos SET ?'
            connection.query(sql, atendimentoDatado, (error, resultados) => {
                if (error) {
                    res.status(400).json(error)
                } else {
                    res.status(201).json(atendimento)
                }
            })
        }
    }

    lista(res) {
        const sql = 'SELECT * FROM atendimentos'

        connection.query(sql, (error, resultados) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id=${id}`

        connection.query(sql, (error, resultados) => {
            const atendimento = resultados[0]
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }

    alterar(id, valores, res) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE atendimentos SET ? WHERE id=?'

        connection.query(sql, [valores, id], (error, resultados) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    remover(id, res) {
        const sql = `DELETE FROM atendimentos where id=${id}`

        connection.query(sql, (error, _resultados) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento()