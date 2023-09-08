/* models/AdminUser.js */


import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';

class AdminUser extends Model {}

AdminUser.init({

    first_name: DataTypes.STRING,
    middle_name: DataTypes.STRING, 
    last_name: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    gender: DataTypes.STRING,
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mobile: DataTypes.STRING,
    admin_username: DataTypes.STRING,
    password:DataTypes.STRING,
    role: DataTypes.STRING,
}, {
    sequelize,
    modelName:'AdminUser',
    tableName: 'admin_users',
    timestamps: false,
    freezeTableName: true
});


export default AdminUser;
