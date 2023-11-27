import express from 'express';
import bodyParser from 'body-parser';
import graphqlHttp from 'express-graphql';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import GraphQLSchema from './graphql/schema/index';
dotenv.config();

// import graphQlResolvers from './graphql/resolvers/index.js';

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    credentials: true,
    origin: process.env.UI_URL || 'http://localhost:3000'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: GraphQLSchema,
    rootValue: null,
    graphiql: true
  })
);

const MONGO_URI = 'mongodb+srv://' + `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}` +
  '@complaint-register-syst.r5xlti0.mongodb.net/' + `${process.env.MONGO_DB}`
  + '?retryWrites=true&w=majority';

const MONGO_OPTIONS = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
}; 

async function Start_Server() {
  try {
    await mongoose
      .connect(
        MONGO_URI,
        MONGO_OPTIONS
      )
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  } catch (err) {
    console.log(err)
  }
}

Start_Server();


