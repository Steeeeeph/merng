import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import {graphqlHTTP} from 'express-graphql';
import schema from './schema.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(process.env.PORT_SERVER, () => console.log(`Server Running on Port: http://localhost:${process.env.PORT_SERVER}`)))
.catch((error) => console.log(`${error} did not connect`));


app.get("/", (req, res) => {
    res.json({
      message: "Notetaking API v1"
    });
});
app.use("/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);
