// src/connect.tsimport type { Connection, ConnectionOptions } from "mysql2/promise";
import mysql from "mysql2/promise";

export const connOptions: ConnectionOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
};

let connection: Connection | undefined = undefined;

async function exit() {
  try {
    connection?.end();
    console.log("disconnected from database");
    connection = undefined;
  } catch (e) {
    throw e;
  }
  process.exit(0);
}

export async function connect(): Promise<Connection> {
  try {
    if (connection) return connection;
    connection = await mysql.createConnection(connOptions);
    process.on("SIGINT", () => exit());
    return connection;
  } catch (e) {
    throw e;
  }
}

// Add your database or API connection logic here. 