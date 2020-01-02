import Query from '../src/hasura-orm'

/**
 * Query test
 */
describe('Query test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('Query is instantiable', () => {
    expect(new Query('products')).toBeInstanceOf(Query)
  })

  it('Query where error', () => {
    expect.assertions(1)
    try {
      new Query('products').where('rest', 'gte', '1', '2')
    } catch (e) {
      expect(e).toEqual(new Error('where need min: 2 and max: 3 args'))
    }
  })

  it('Query select', () => {
    expect(new Query('products').select('1,2,3')).toBeInstanceOf(Query)
    expect(new Query('products').select('1,2,3').parsed()).toBeTruthy()
    expect(
      new Query('products')
        .select('1,2,3')
        .where('id', 'in', [1, 2, 3])
        .parsed()
    ).toBeTruthy()
    const query = new Query('products')
      .select('id,rest,price')

      .where('id', '1')
      .where('rest', 'gte', '1')
      .with('product_locales', query => {
        return query.select('name').where('locales_id', '1')
      })
      .compose('address', query => {
        return query
          .select('name')
          .where('id', 'gte', '1')
          .paginate(5, 0)
      })
      .where({
        _or: { article: { _eq: '1' }, _and: [{ article: { _eq: '2' }, rest: { _gt: 2 } }] }
      })
      .orderBy({ rest: 'asc' }, { id: 'desc' })
      .distinct('rest')
      .paginate(5, 0)
      .query()
    // console.log(query);
    expect(query).toBeTruthy()
  })
})
