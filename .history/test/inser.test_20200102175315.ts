import Insert from '../src/insert';

describe("Insert test", () => {

  it("insert", () => {
    let params: any = {
      "name": "sadgasdg",
      "description": "sadgas",
      "price": "",
      "article": "123",
      "old_price": "123",
      "brand_id": 17,
      "color_id": [
        {
          "color_id": 1
        },
        {
          "color_id": 2
        },
        {
          "color_id": 3
        }
      ],
      "discount": "123",
      "charge": 1,
      "rest": 5,
      "images": [
        {
          "name": "Снимок экрана 2019-11-25 в 16",
          "is_main": false,
          "alt": "Снимок экрана 2019-11-25 в 16",
          "image": "data:image/png;base64,",
          "extension": "39.41.png"
        }
      ],
      "locales_id": 1
    };
    const result = Object.keys(params).map(function (key: any) {
      return { [key]: params[key] };
    });

    const ins = new Insert('products').insert(...result)
    expect(ins).toBeInstanceOf(Insert)

    console.log(ins.query());
  })
})

