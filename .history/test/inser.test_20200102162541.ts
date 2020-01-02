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

      },{ product_id: 1})
      expect(ins).toBeInstanceOf(Insert)
      ins.where(1,2,3)
      console.log(ins.where({_or: {article: {_eq: "1"}, _and: [{article: {_eq: "2"}, rest: {_gt: 2}}]}}) .query());
  })
})
