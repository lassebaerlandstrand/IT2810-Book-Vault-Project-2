# Backend

This is the backend of the project. It is a GraphQL server built with [Apollo Server](https://www.apollographql.com/docs/apollo-server/), [GraphQL](https://graphql.org/), [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/).

## How to run

1. Install dependencies

```bash
npm install
```

2. Create a MongoDB database and get the connection URI. See the MongoDB Community Edition [installation guide](https://www.mongodb.com/docs/manual/administration/install-community/).

3. Run [`preprocessing.py`](../preprocessing/preprocessing.py) to preprocess the data. This will create json files in [`/preprocessing`](/preprocessing/) which you have to import to the MongoDB database. Import the files by running [`upload_json_to_mongo.py`](../preprocessing/upload_json_to_mongo.py). This assumes you have a database called "bookvault". If you have a different database name, you have to change the database name in the script.

4. Modify the `.env` file in [`/backend`](/backend/.env) to your MongoDB URI:

```env
ATLAS_URI=<your mongodb uri>
PORT=<your port number>
```

5. Start the server

```bash
npm run start
```

6. The server is now running on `http://localhost:<your port number>` and the API is available at `http://localhost:<your port number>/graphql`. You can use the [sandbox](https://studio.apollographql.com/sandbox/explorer) to test the API.

## How to run on the VM

TODO
