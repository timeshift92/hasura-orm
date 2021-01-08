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
    expect(new Query({ _schema: 'products' })).toBeInstanceOf(Hasura)
  })

  it('Query is instantiable', () => {
    expect(
      new Query({
        _alias: 'ali',
        _schema: 'products',
        _with: 'test',
        _fields: 'asd,asd',
        _schemaArguments: { a: 1, b: 1 }
      })
    ).toBeInstanceOf(Hasura)
  })

  it('Query is instantiable', () => {
    expect(
      new Query({ _schema: 'products' })
        .where({ id: 5 })
        .paginate(5, 5)
        .query()
    ).toBeTruthy()
  })

  it('Query select', () => {
    expect(new Query({ _schema: 'products' }).select('1,2,3')).toBeInstanceOf(Hasura)
    expect(new Query({ _schema: 'products' }).select('1,2,3').parsed()).toBeTruthy()
    expect(
      new Query({ _schema: 'products' })
        .select('1,2,3')
        .where({ id: { _in: [1, 2, 3] } })
        .parsed()
    ).toBeTruthy()
    const query = new Query({ _schema: 'products' })
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
      .where({ 'alex-mer': { _eq: 'asdasdas' } })
      .orderBy({ rest: 'asc', asda: 'desc' })
      .distinct('rest')
      .paginate(5, 0)
      .paginate(5, 0)

    // console.log(query.query())
    expect(query.query()).toBeTruthy()
    expect(query.subscriptionQuery()).toBeTruthy()
  })

  it('check provider', () => {
    const provider = {
      get: ({ query }: any) => {
        return query
      },
      query: ({ query }: any) => {
        return query
      },
      subscription: ({ query }: any) => {
        return query
      },
      mutate: ({ query }: any) => {
        return query
      }
    }
    let query = new Query({ _schema: 'products', provider })
      .alias('tasd')
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
    expect(query.get(false)).toBeTruthy()

    expect(query.subscription()).toBeTruthy()
  })
})
