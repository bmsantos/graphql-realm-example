"use strict";
import fs from "fs";
import path from "path";
import Realm from "realm";

// Must set enterprise token first
Realm.Sync.setAccessToken(fs.readFileSync(path.join(__dirname, '../access-token.professional'), 'utf-8'));

const ADMIN_USER = Realm.Sync.User.adminUser(fs.readFileSync(path.join(__dirname, '../admin_token.base64'), 'utf-8'));

const SERVER_URL = 'realm://127.0.0.1:9080';

const NOTIFIER_PATH = '^\/[0-9a-f]+\/messages$';

// Lokka
import Lokka from "lokka";
import Transport from "lokka-transport-http";

const MUTATE_MESSAGE = `
    ($message: String!, $broadcast: Boolean!) {
        addMessage(message: $message, broadcast: $broadcast)
    }
`;

const client = new Lokka({
  transport: new Transport('http://localhost:5060/graphql')
});

const mutate = async (message) => {
  let vars = {message: message.current, broadcast: true};
  const data = await client.mutate(MUTATE_MESSAGE, vars);
  console.log(`mutation result: ${data.addMessage}`);
};

const handleUserMessageChange = (changeEvent) => {
  console.log(`Received event`);

  const matches = changeEvent.path.match(/^\/([0-9a-f]+)\/messages$/);
  const userId = matches[1];

  const realm = changeEvent.realm;
  const messages = realm.objects('UserMessage');
  const changes = changeEvent.changes.UserMessage;

  for (let messageIndex in changes.insertions) {
    const message = messages[messageIndex];
    console.log(`User with ID: ${userId} created new message set to: ${message.current}`);
  }

  for (let messageIndex in changes.modifications) {
    const message = messages[messageIndex];
    console.log(`User with ID: ${userId} updated message to: ${message.current}`);
    mutate(message).catch(error => console.error(`GraphQL Server Down? ${error}`)); // does not work when using Apollo Client
  }
};

Realm.Sync.addListener(SERVER_URL, ADMIN_USER, NOTIFIER_PATH, 'change', handleUserMessageChange);

console.log('Listening for Realm changes');

mutate({current: 'Hello from Realm!'}).catch(error => console.error(`GraphQL Server Down? ${error}`)); // Works