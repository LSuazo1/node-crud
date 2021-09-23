const { response, request, query } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
res = response;
const usuariosGet = async (req = request, res = response) => {

    // const query= req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }
    /*const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite));

    const total = await Usuario.countDocuments(query);*/

    const [total,usuarios] =await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({

        
        total,
        usuarios

        //msg: 'get API-Controlador',
        //query
    });
}

const usuarioPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    console.log('---------------');
    console.log(correo);
    console.log('---------------');

    await usuario.save();

    res.json({
        usuario
    });
}

const usuarioDelete = (req, res) => {
    res.json({
        msg: 'delete API-controlador'
    })
}

const usuarioPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO: validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    })
}
const usuarioPatch = (req, res) => {
    res.json({
        msg: 'patch API-controlador'
    })
}

module.exports = {
    usuariosGet,
    usuarioPost,
    usuarioDelete,
    usuarioPut,
    usuarioPatch
}