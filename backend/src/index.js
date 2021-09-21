import "@babel/polyfill/noConflict";
import { GraphQLServer, PubSub } from "graphql-yoga";
import mongoose from "mongoose";
import Developer from "./model/developer";
import Mutation from "./resolvers/Mutation";
import Query from "./resolvers/Query";
import Subscription from "./resolvers/Subscription";

const path = require("path");
const fs = require("fs");
const sgMail = require("@sendgrid/mail");

const pubSub = new PubSub();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
  },
  context(request) {
    (function sleep(ms = 2000) {
      var unixtime_ms = new Date().getTime();
      while (new Date().getTime() < unixtime_ms + ms) {}
    })();
    return { pubSub, request };
  },
});

mongoose
  .connect(process.env.mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((_) => {
    const dir = path.join(__dirname, "images");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    Developer.find().then((isSuper) => {
      if (isSuper == 0) {
        const developer = new Developer({
          email: process.env.DEVELOPER_EMAIL,
          password: process.env.DEVELOPER_PASSWORD,
        });
        developer.save().catch((err) => {
          console.log(err.message);
        });
      }
    });

    server.start(
      { port: process.env.PORT || 3000, subscriptions: { keepAlive: 55000 } },
      () => {
        console.log("Server is up and running!");
      }
    );
  })
  .catch((err) => {
    console.log(err);
  });
