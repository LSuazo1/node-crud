const {Router}=require('express');
const { check } = require('express-validator');

const { usuariosGet,usuarioPost,usuarioDelete,usuarioPut,usuarioPatch} = require('../controllers/usuarios.controller');

const { esRoleValido, emailExiste,existeUsuarioPorId} = require('../helpers/db-validators');


const {
    validarCampos,
    validarJWT,
    validarRole,
    tieneRole
}=require('../middlewares/index');

//las podemos optimizar en un solo archivo
//const { validarCampos } = require('../middlewares/validar-campos');
//const { validarJWT } = require('../middlewares/validar-jwt');
//const { validarRole, tieneRole } = require('../middlewares/validar-roles');



const router=Router();


router.get('/',  usuariosGet);

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuarioPut);

//con el segundo campo que mandamos son midlewares con el cual validamos en el backend
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe de ser mas de 6 letras').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
   // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
   validarCampos
], usuarioPost);

router.delete('/:id',[
    validarJWT,
    //validarRole,
    tieneRole('ADMIN_ROLE','USER_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuarioDelete);

router.patch('/', usuarioPatch);



module.exports=router;