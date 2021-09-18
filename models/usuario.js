const {Schema,model}=require("mongoose");


const UsuarioShema=Schema({
    nombre:{
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true,'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'El contrasenia es obligatoria']
    },
    img:{
        type: String,
    },
    
    rol:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    
    estado:{
        type: Boolean,
        default: true
    },

    google:{
        type: Boolean,
        default:false
    }

});

UsuarioShema.methods.toJSON = function(){
    const {__v,password,...usuario}=this.toObject();
    return usuario;
}

module.exports=model('Usuarios',UsuarioShema);