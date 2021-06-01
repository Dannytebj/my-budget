module.exports = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port:  parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    dropSchema: false,
    logging: true,
    entities: ["src/**/*.entity.ts", "dist/**/*.entity.js"],
    migrations  : ["src/database/migration/*.ts", "dist/src/database/migration/*.js"],
    cli: {
        entitiesDir: "src",
        migrationsDir : "src/database/migration"
    }
}