const http = require('http')
const url = require('url')
const fs = require('fs')

const consultas = require('./consultas')

const programa = async() => {
    const con = await consultas()
http.createServer( async(req, res) => {
    
    // Ruta para leer archivo html
    if(req.url === '/' && req.method === 'GET') {
        res.setHeader('Content-Type', 'text/html')
        res.end(fs.readFileSync('index.html', 'utf-8'))
    }

    if(req.url === '/favicon.ico' && req.method === 'GET') {
        res.setHeader('Content-Type', 'text/plain')
        res.end('')
    }

    if(req.url.startsWith('/cancion') && req.method === 'POST') {
        try {
            let body
            req.on('data', (payload) => {
                body = JSON.parse(payload)
            })
            req.on('end', async() => {
                const data = await con.insertRepertorio(body.cancion, body.artista, body.tono)
                res.statusCode = 201
                res.end(JSON.stringify(data))
            })
        } catch (error) {
            res.statusCode = 500
            res.end(error.message)
        }
    }

    if(req.url.startsWith('/canciones') && req.method === 'GET') {
        try {
            const data = await con.getAll()
            res.statusCode = 200
            res.end(JSON.stringify(data))
        } catch (error) {
            res.statusCode = 500
            res.end(error.message)
        }
    }

    if(req.url.startsWith('/cancion') && req.method === 'PUT') {
        try {
            const { id } = url.parse(req.url, true).query
            let body = ''
            req.on('data', (chunk) => {
                body += chunk
            })
            req.on('end', async() => {
                const datos = JSON.parse(body)
                const respuesta = await con.editarRepertorio(datos, id)
                res.statusCode = 200
                res.end(JSON.stringify(respuesta))
            })
        } catch (error) {
            res.statusCode = 500
            res.end(error.message)
        }
    }

    if(req.url.startsWith('/cancion') && req.method === 'DELETE') {
        try {
            const { id } = url.parse(req.url, true).query
            const data = await con.eliminarCancion(id)
            res.statusCode = 200
            res.end(JSON.stringify(data))
        } catch (error) {
            res.statusCode = 500
            res.end(error.message)
        }
    }
    
}).listen(3000, console.log('Server ON!'))
}

programa()
