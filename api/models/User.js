/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');
module.exports = {

  schema:true,//compares to schema and saves only attributes defined here

  attributes: {
  	name:{
  		type:'string',
  		required:true
  	},
  	title:{
  		type:'string'
  	},
  	email:{
  		type:'string',
  		email:true,
  		required:true,
  		unique:true
  	},
    password:{
      type:'string',
      required:true
    },
  	encryptedPassword:{
  		type:'string'
  	},
    admin:{
      type:'boolean',
      defaultsTo:false
    },
    toJSON: function(){
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    }
  },
  beforeValidation: function(values,next){
    console.log(values);
    if (typeof values.admin !== 'undefined') {
      if (values.admin === 'unchecked') {
        values.admin=false;
      }else if(values.admin[1] === 'on'){
        values.admin = true;
      }
    }
    next();
  },
  beforeCreate:function(values,next){
    console.log(values);
    var password = values.password;
    var passwordConfirmation = values.encryptedPassword;
    if (!password || !passwordConfirmation || password !== passwordConfirmation) {
      var passwordDoesNotMatchError=[{
        name: "passwordDoesNotMatch",
        message: "Las contraseñas no coinciden"
      }]
      return next({
        err: passwordDoesNotMatchError
      });
    }//close if
    //Funcion que se ejecuta antes de hacer la captura en la base de datos
    bcrypt.hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){//encriptado del password
      values.encryptedPassword = encryptedPassword;
      values.password = null;//seteamos a null los valores password para que no se guarden en bd
      // values.passwordConfirmation = null;
      next();
    });
  }
};

