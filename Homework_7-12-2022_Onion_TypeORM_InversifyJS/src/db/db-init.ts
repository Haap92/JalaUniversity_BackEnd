import "reflect-metadata";
import { AppDataSource } from "./db-source";
import User from "./db-user";
import UserDataService from './db-services';

class Test {
    async initializeDB(){
        await AppDataSource.initialize();

        const user = new User();
        user.name = 'John';
        user.lastName = 'Lucas';
        user.profession = 'Carpintero';

        const dataAccess = new UserDataService;
        await dataAccess.create(user);

        console.log(await dataAccess.read(1));
        
        const userLoaded = await dataAccess.read(1);
        console.log(user);

        userLoaded.profession = 'Mecanico';
        dataAccess.update(userLoaded);
    }
}

new Test().initializeDB();