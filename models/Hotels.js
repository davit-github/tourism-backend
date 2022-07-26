import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";

class Hotels extends Model {

}

Hotels.init({
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
    price: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    phone: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    facilities: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'hotels',
    modelName: 'Hotels',
})

export default Hotels;