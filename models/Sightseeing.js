import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";

class Sightseeing extends Model {

}

Sightseeing.init({
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
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'sightseeing',
    modelName: 'Sightseeing',
})

export default Sightseeing;