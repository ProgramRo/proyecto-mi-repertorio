const { Pool } = require('pg')

const config = {
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "repertorio_db",
    port: 5432,
}

const pool = new Pool(config)

const conexion = () => {
    
    return new Promise((resolve, reject) => {
        pool.connect((errorConexion, client, release) => {
            if(errorConexion) {
                reject('¡HUBO UN ! Revise el siguiente código:' + errorConexion.code)
            } else {
                const con = {
                    client, release, pool
                }
                resolve(con)
            }
        })
    })
}

module.exports = conexion