const { response,request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario=require('../models/usuario');


res = response;
const usuariosGet = (req=request, res=response) => {
   const query= req.query;
    res.json({
        msg: 'get API-Controlador',
        query
    });
}

const usuarioPost = async(req, res = response) => {
    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
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

const usuarioPut = async(req, res) => {
    const {id}=req.params;
    const {_id,password,google,correo,...resto}=req.body;
   
    //TODO: validar contra base de datos
    if (password) {
        const salt=bcrypt.genSaltSync();
        resto.password=bcrypt.hashSync(password,salt);
    
    }
   
    const usuario =await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        msg: 'put API-controlador',
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