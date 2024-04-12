import {createClient} from "redis";
const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT!),
  },
  password: process.env.REDIS_PASSWORD,
});
client.on("error", (err) => console.error(err));
client.connect().then(() => console.log("Redis is connected"));

export default client;
