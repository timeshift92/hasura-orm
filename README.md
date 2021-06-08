# Hasura-orm

I think in normal cases, everyone just copies queries from graphiql.
But this library creates programmatically generated queries, do not judge strictly =)

## setup

```bash
npm i hasura-orm
yarn add hasura-orm
```

## how-to use with svelte-graphql
src/core/svqlConfig.ts
```ts
import { svqlConfig } from 'graphql-svelte'
import Hasura from 'hasura-orm';
import {writable} from 'svelte/store'
// graphUrl = "htpp://graphql-server/v1/graphql"
export let _client = svqlConfig.getClient({
	url: graphUrl, wsUrl: graphUrl.replace('http', 'ws')
})

let accessToken$ = writable();

accessToken$.subscribe(token => {
	if (token) {
		svqlConfig.setHeaders({ ...svqlConfig.headers, 'authorization': `Bearer ${token}` })
	}
});


export function hasura(_schema) {
	Hasura['provider'] = client()
	const orm = new Hasura({ _schema })
	orm['provider'] = client()
	return orm
}
```

## query Example
```ts

import {hasura} from 'src/core/svqlConfig'

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
Insert
``` ts
import {hasura} from 'src/core/svqlConfig'

 hasura('categories')
      .alias('asd')
      .insert(params)
      .conflicts({
        constraint: 'categories_pkey',
        update_columns: ['addins'],
        where: {
          id: { _eq: '1' }
        }
      })
      .select('sort id')
      .with('category_locales', query => {
        return query.select('category_id')
      })

```

Update

```ts

 hasura('categories')
        .where({ id: 1 })
        .update({ rest: 1, article: 'asdgasdgsadg' }, { _append: '1' })
        .update({ _append: { addins: { z: 1 } } })
        .query()

```
Delete
```ts
hasura('products').select('id').delete({ rest: 1 })
```
!!! note the provider can be anything but I use my own as an example.

## api 

api is in the docs folder, and so you can always see the source.

