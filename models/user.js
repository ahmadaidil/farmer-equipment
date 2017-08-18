'use strict';
var salt = require('../helpers/saltpass')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      validate:{
        notNull:{
          msg: 'nama tidak boleh kosong'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate:{
        notNull:{
          msg: 'role tidak boleh kosong'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isEmail: {
          msg: 'Bukan format email'
        },
        notEmpty: {
          msg: 'Email tidak boleh kosong'
        },
        isUnique:{
          msg: 'Email sudah digunakan sebelumnya'
        }
      }
    },
    phone: {
      type:DataTypes.STRING,
      validate:{
        notNull:{
          msg: 'No henpon ga boleh kosong'
        },
        isNumeric:{
          msg: 'Input no henpon yang bener bro'
        }
      }
    },
    address: DataTypes.STRING,
    username: {
      type:DataTypes.STRING,
      validate:{
        notNull:{
          msg: 'username tidak boleh kosong'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notNull:{
          msg: 'password tidak boleh kosong'
        }
      }
    },
    salt: DataTypes.STRING
  },{
    hooks:{
      beforeCreate: (models)=>{
        let secret = salt.genRandomString(8);
        let password = models.password
        models.password = salt.createHash(password, secret);
        models.salt = secret;
      }
    }
  });

  User.associate = models=>{
    User.belongsToMany(models.Equipment, {through: models.UserEquipment, foreignKey: 'UserId'})
  }

  return User;
};
