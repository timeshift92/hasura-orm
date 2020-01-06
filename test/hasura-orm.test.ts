import Query from '../src/hasura-orm'
import Hasura from '../src/hasura'

/**
 * Query test
 */
describe('Query test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('Query is instantiable', () => {
    expect(new Query('products')).toBeInstanceOf(Hasura)
  })

  it('Query select', () => {
    expect(new Query('products').select('1,2,3')).toBeInstanceOf(Hasura)
    expect(new Query('products').select('1,2,3').parsed()).toBeTruthy()
    expect(
      new Query('products')
        .select('1,2,3')
        .where({ id: { _in: [1, 2, 3] } })
        .parsed()
    ).toBeTruthy()
    const query = new Query('products')
      .where({ id: 1, product_locales: { name: { _ilike: 'test' } } })
      .with('product_locales', query => {
        return query.select('name').where({ locales_id: 1 })
      })
      .compose('address', query => {
        return query
          .select('name')
          .where({ id: { _gte: 1 } })
          .paginate(5, 0)
      })
      .where({
        _or: { article: { _eq: '1' }, _and: [{ article: { _eq: '2' }, rest: { _gt: 2 } }] }
      })
      .orderBy({ rest: 'asc' })
      .distinct('rest')
      .paginate(5, 0)
      .paginate(5, 0)

    // console.log(query)
    expect(query.query()).toBeTruthy()
    expect(query.subscription()).toBeTruthy()
  })

  it('check provider', () => {
    const provider = {
      get: ({ query }: any) => {
        return query
      },
      query: ({ query }: any) => {
        return query
      },
      subscribe: ({ query }: any) => {
        return query
      },
      mutate: ({ query }: any) => {
        return query
      }
    }
    let query = new Query('products', provider)
      .where({ id: 1, product_locales: { name: { _ilike: 'test' } } })
      .with('product_locales', query => {
        return query.select('name').where({ locales_id: 1 })
      })
      .compose('address', query => {
        return query
          .select('name')
          .where({ id: { _gte: 1 } })
          .paginate(5, 0)
      })
      .where({
        _or: { article: { _eq: '1' }, _and: [{ article: { _eq: '2' }, rest: { _gt: 2 } }] }
      })
      .orderBy({ rest: 'asc' })
      .distinct('rest')
      .paginate(5, 0)
      .paginate(5, 0)
    expect(query.get()).toBeTruthy()
    expect(query.await()).toBeTruthy()
    expect(query.subscribe()).toBeTruthy()
  })
})
