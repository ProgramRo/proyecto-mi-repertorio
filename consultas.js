const conexion = require('./conexion')
// const url = require('url')

const consultas = async() => {
    // Lo 
    const con = await conexion()

    const insertRepertorio = async (cancion, artista, tono) => {
        const SQLQuery = {
            text: 'INSERT INTO repertorio(cancion, artista, tono) VALUES($1, $2, $3) RETURNING *',
            values: [cancion, artista, tono]
        }
        try {
            const data = await con.client.query(SQLQuery)
            return data
        } catch (error) {
            throw new Error(error)
        }
        
    }

    const getAll = async () => {
        const SQLQuery = {
            text: 'SELECT * FROM repertorio',
        }
        try {
            const data = await con.client.query(SQLQuery)
            return data.rows
        } catch (error) {
            throw new Error(error)
        }
        
    }

    const editarRepertorio = async (datos, id) => {
        const SQLQuery = {
            text: 'UPDATE repertorio SET cancion = $1, artista = $2, tono = $3 WHERE id = $4 RETURNING *',
            values: [datos.cancion, datos.artista, datos.tono, id]
        }
        console.log(SQLQuery)
        try {
            const data = await con.client.query(SQLQuery)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    const eliminarCancion = async (id) => {
        const SQLQuery = {
            text: `DELETE FROM repertorio WHERE id = '${id}'`,
        }
        try {
            const data = await con.client.query(SQLQuery)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    return { insertRepertorio, getAll, eliminarCancion, editarRepertorio, con }
}

module.exports = consultas