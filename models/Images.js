import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";
import Hotels from "./Hotels";
import Cafes from "./Cafes";
import Sightseeing from "./Sightseeing";

class Images extends Model {

}
Images.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    src: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    tableName: 'images',
    modelName: 'Images'
})

Images.belongsTo(Hotels, {
    foreignKey: 'hotelId',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
Hotels.hasMany(Images, {
    foreignKey: 'hotelId',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
Images.belongsTo(Cafes, {
    foreignKey: 'cafeId',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
Cafes.hasMany(Images, {
    foreignKey: 'cafeId',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
Images.belongsTo(Sightseeing, {
    foreignKey: 'sightseeingId',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
Sightseeing.hasMany(Images, {
    foreignKey: 'sightseeingId',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
export default Images;