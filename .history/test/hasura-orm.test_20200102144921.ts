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
    expect(new Query('products').select('1,2,3')).toBeInstanceOf(Query)
    const query =
    expect().toBeTruthy();
  })
})
