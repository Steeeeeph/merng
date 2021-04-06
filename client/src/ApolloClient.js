import * as Realm from "realm-web";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import dotenv from 'dotenv';

dotenv.config({path: '/server/.env'});

export const APP_ID = process.env.REALM_ID;

const graphqlUri = `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`
// Local apps should use a local URI!
// const graphqlUri = `https://us-east-1.aws.stitch.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`
// const graphqlUri = `https://eu-west-1.aws.stitch.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`
// const graphqlUri = `https://ap-southeast-1.aws.stitch.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`

const client = new ApolloClient({
  link: new HttpLink({
    uri: graphqlUri
  }),
  cache: new InMemoryCache(),
});