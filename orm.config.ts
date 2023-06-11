import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import 'dotenv/config'
import { DataSource, DataSourceOptions } from 'typeorm'

// export const MysqlDataSource = new DataSource ({
//     type: 'postgres',
//     // host: process.env.DB_HOST,
//     port: parseInt(process.env.DB_PORT),
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     // autoLoadEntities: true,
//     // migrations: [
//     //     // 'dist/database/migrations/*.js',
//     //     // 'database/migrations/*.ts'
//     // ],
//     // cli: {
//     //     migrationsDir: 'src/database/migrations' // migrate file sẽ được sinh ra tại đây
//     // },
//     // synchronize: true,  
//     // cli: {
//     //     migrationsDir: 'src/database/migrations' // migrate file sẽ được sinh ra tại đây
//     //   }
//     entities: [__dirname +'./entity/*.entity{.ts,.js}'],
//     // entities: ['../**/*.entity.{ts,js}'],
// });  

// // const dataSource = new DataSource(config)
// // export default dataSource;

