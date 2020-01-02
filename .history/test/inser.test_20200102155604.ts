import Insert from '../src/insert';

describe("Insert test", () => {

  it("insert", () => {
    const ins = new Insert('products').insert(
      {
        "images": [
          {
            "alt": "asdasd",
            "name": "Asdas"
          }
        ],
        product_id: 1
      })
      expect(new Query('products').select('1,2,3')).toBeInstanceOf(Query)

      console.log(ins);
  })
})
