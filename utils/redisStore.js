const RedisStore = require("connect-redis").default;
const redis = require("redis");

// Method 1
// const redisClient1 = redis.createClient({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   password: process.env.REDIS_PASSWORD,
// });
// // Method 2
// const redisClient2 = redis.createClient({
//   url: process.env.REDIS_URI,
// });

const redisClient = redis.createClient();
redisClient.connect().catch(console.error);

// const redisClient = createClient({
//   username: "default", // use your Redis user. More info https://redis.io/docs/management/security/acl/
//   password: "secret", // use your password here
//   socket: {
//     host: "my-redis.cloud.redislabs.com",
//     port: 6379,
//     tls: true,
//     key: readFileSync("./redis_user_private.key"),
//     cert: readFileSync("./redis_user.crt"),
//     ca: [readFileSync("./redis_ca.pem")],
//   },
// });
// redisClient.on("error", (err) => console.log("Redis Client Error", err));
// await redisClient.connect();
// await redisClient.disconnect();

// {
//     secret: process.env.session_secret,
//     name: process.env.session_name,
//     store: new RedisSession({
//       client
//     }),
//     rolling: true,
//     saveUninitialized: true,
//     unset: 'destroy',
//     resave: true,
//     proxy: true,
//     logErrors: process.env.debug === 'true',
//     cookie: {
//       path: '/',
//       domain: '.' + process.env.app_domain,
//       secure: true,
//       sameSite: true,
//       httpOnly: true,
//       expires: false,
//       maxAge: 60000 * process.env.session_exp_mins,
//     }
//   }

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

module.exports = redisStore;
