import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";

class Cafes extends Model {

}

Cafes.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    tableName: 'cafes',
    modelName: 'Cafes',
})

export default Cafes;