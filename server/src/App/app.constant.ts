export const MONGODB_CONNECT: Readonly<string> = `mongodb://${process.env.DOCKER_DB}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
