const express = require('express')
const cors = require('cors')

const {dbConnection}=require('../database/config')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath="/api/usuarios";
        //ruta para jwt
        this.authPath = "/api/auth";


        //Conectar a base de datos
        this.conectarDB();
        //Middlewares
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {
        //cors
        this.app.use(cors());

        //Lectura ytt paraseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }


    routes() {
        this.app.use('/api/auth',require('../routes/auth'));
        this.app.use('/api/usuarios',require('../routes/usuarios'));
        
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;