# Hasura-orm
I think in normal cases, everyone will just copy queries from graphiql
but this library is needed to create programmatically generated queries, do not judge strictly =)

# setup
```
npm i hasura-orm
yarn add hasura-orm
```
# how-to use

```
import Hasura from 'hasura-orm';

import { GraphQLProvider, reportCacheErrors } from "graphql-svelte";

let accessToken;

function getToken() {
	return accessToken ? `Bearer ${accessToken}` : ''
}


let client = GraphQLProvider({
	url: 'http://localhost:8082/v1/graphql',
	headers: () => ({
		"content-type": "application/json",
		"x-hasura-admin-secret": "secret",
		authorization: getToken(),
	}),
	ws: {
		url: 'wss://go.pyrex.uz/v1/graphql'
	}
})
client.graphql.on('cache', reportCacheErrors)

export function hasura(schema) {
	Hasura.provider = client;
	const orm = new Hasura(schema)
	orm.provider = client;
	return orm;
}
-------------------------- other file -------------------------
const query = hasura('products')
      .where({ 'id': 1, 'product_locales': { "name": { "_ilike": "test" } } })
      .with('product_locales', query => {
        return query.select('name').where({ 'locales_id': 1 })
      })
      .compose('address', query => {
        return query
          .select('name')
          .where({ 'id': { '_gte': 1 } })
          .paginate(5, 0)
      })
      .where({
        _or: { article: { _eq: '1' }, _and: [{ article: { _eq: '2' }, rest: { _gt: 2 } }] }
      })
      .orderBy({ rest: 'asc' })
      .distinct('rest')
      .paginate(5, 0)
      .paginate(5, 0)
      .query()

```

!!! note the provider can be anything but I use my own as an example

# api 

api is in the docs folder, and so you can always see the source

