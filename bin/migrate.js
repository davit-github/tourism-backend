import {Users, Hotels, Cafes, Sightseeing,Images, } from '../models';

async function main() {
    for (const Model of [
        Users,
        Hotels,
        Cafes,
        Sightseeing,
        Images,
    ]) {
        console.log(Model);
        await Model.sync({alter: true});
    }
    const admin = await Users.findByPk(1)
    if (!admin) {
        const user = await
            Users.create({
                firstName: 'Super',
                lastName: 'Admin',
                gender: 'male',
                email: 'dvmradmin@gmail.com',
                phoneNumber: '+37493087375',
                password: '123456',
                age: '',
                avatar: ''
            })
        console.log(user)

    }

    process.exit(0);
}

main().catch(console.error);
