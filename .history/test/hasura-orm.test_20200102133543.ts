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

  it('Query select', () => {
    expect(new Query('products').select('1,2,3')).toBeInstanceOf(Query)
    console.log(new Query('products').select('id,rest,price')
    .where('id','in',[272,23,41])
    .where('rest','gte','1')
    .with('product_locales',(query)=>{
      return query.
    })
    .query());
  })
})
