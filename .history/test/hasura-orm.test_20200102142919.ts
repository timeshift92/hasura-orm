import Query from "../src/query"

/**
 * Query test
 */
describe("Query test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("Query is instantiable", () => {
    expect(new Query('products')).toBeInstanceOf(Query)
  })

  it("Query where error", () => {
    expect.assertions(1);
    try {
      new Query('products').where('rest', 'gte', '1', '2')
    } catch (e) {
      expect(e).toEqual(new Error('where need min: 2 and max: 3 args'));
    }

  })


  it('Query select', () => {
    expect(
    new Query('products').select('id,rest,price')
      .where('id', '1')
      .where('rest', 'gte', '1')
      .with('product_locales', (query) => {
        return query.select('name')
          .where('locales_id', '1')
      })
      .orderBy({ rest: 'asc' })
      .distinct('rest')
      .paginate(5, 0)
      .query()).toEqual(`query {  products_aggregate( where: {
        id: {
          _eq: 1
        }

        rest: {
          _gte: 1
        }
      } orderBy: [object Object]  distinct_on: rest  limit:5  offset:0 ) {
      aggregate {
        count
      }
    } products( where: {
        id: {
          _eq: 1
        }

        rest: {
          _gte: 1
        }
      } orderBy: [object Object]  distinct_on: rest  limit:5  offset:0 ){  id rest price  product_locales( where: {
        locales_id: {
          _eq: 1
        }
      }){  name  } } }`);
  })
})
