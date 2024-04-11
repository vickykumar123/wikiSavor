import {createClient} from "redis";
const client = createClient({
  socket: {
    host: "redis-14675.c212.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 14675,
  },
  password: "64ahBz15G7E7PfOx6VlJ31zabJN0tZNX",
});
client.on("error", (err) => console.error(err));
client.connect();
export default client;
