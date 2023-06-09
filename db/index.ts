import "reflect-metadata";
import { createConnection, Connection, getConnection } from "typeorm";
import { User, UserAuth } from './entity/index';

const type = process.env.DATABASE_TYPE as any;
const host = process.env.DATABASE_HOST;
const port = Number(process.env.DATABASE_PORT);
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_NAME;

let connectionReadyPromise: Promise<Connection> | null = null;

export const prepareConnection = () => {
    if (!connectionReadyPromise) {
        connectionReadyPromise = (async () => {
            try {
                const stateConnection = getConnection();
                await stateConnection.close();
            } catch (error) {
                console.log(error);
            }

            const connection = createConnection({
                type,
                host,
                port,
                username,
                password,
                database,
                entities: [User, UserAuth],
                synchronize: false,
                logging: true
            });

            return connection;
        })();
    }

    return connectionReadyPromise;
}