import Insert from '../src/insert';

describe("Insert test", () => {

  it("insert", () => {
    new Insert('products').insert(
      {
        "images": [
          {"alt": "asdasd",
            "name": "Asdas"}
        ]
      })
  })
})
