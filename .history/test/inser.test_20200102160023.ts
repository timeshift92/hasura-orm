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
       
      })
      expect(ins).toBeInstanceOf(Insert)

      console.log(ins.query());
  })
})
