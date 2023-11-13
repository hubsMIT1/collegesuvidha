const redis = require("redis");
// import { createClient } from 'redis';

const client = redis.createClient({
  password: "LddMoJJ09lcH5jmiKdUiZzJRuGZkNhaT",
  socket: {
    host: "redis-14528.c14.us-east-1-2.ec2.cloud.redislabs.com",
    port: 14528,
  },
});
client.on("connect", () => {
  console.log("Client connect to redis");
});
client.on("ready", () => {
  console.log("redis ready to use");
});

client.on("error", (err) => {
  console.log(err.message);
});

client.on("end", () => {
  console.log("Client disconnected from redis");
});
process.on("SIGINT", () => {
  client.quit();
});

module.exports = client;
