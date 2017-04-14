# Realm Event Handler updates to GraphQL

Simple project used to demonstrate possible Realm / GraphQL integration.

## Requirements

- [Realm Mobile Platform - Professional Edition](https://realm.io/pricing/)
- [Apollo GraphQL Subscription Example](https://github.com/bmsantos/apollo-graphql-subscriptions-example)

## Deployment

1. [Install ROM](https://realm.io/docs/realm-object-server/#install-realm-object-server) and [start server](https://realm.io/docs/realm-object-server/#running-the-server)
1. [Start GraphQL Subscriptions Example](https://github.com/bmsantos/apollo-graphql-subscriptions-example#start-susbcription-client-and-server-apps) 
1. Open a browser window and a GraphiQL Subscriptions window as described [here](https://github.com/bmsantos/apollo-graphql-subscriptions-example#test-it)
1. Start the [Realm Browser](https://realm.io/docs/realm-object-server/#data-browser) found in OSX Realm's root directory 

## What's missing

The purposes of this app is simply to explore Realms server side API in order to study how to best integrate Realm with GraphQL endpoints.
At this stage only updates from Realm side get propagated to a GraphQL server. 

## The future

Tightly integrating Realm Object Server with a GraphQL API to access and mutate Realm's Object might be the way to go.  
