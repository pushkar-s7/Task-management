import "reflect-metadata"
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'task-manager',
    entities:["src/entities/*{.ts,.js}"],
    synchronize:true,
   // logging:true
});
AppDataSource.initialize()
    .then(() => {
        console.log('Database Connected typeOrm');
       
    })
   .catch((err)=>console.log("Error in connecting databse",err));

export default AppDataSource;