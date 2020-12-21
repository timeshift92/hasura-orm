import Insert from '../src/hasura-orm'

describe('Insert test', () => {
  let params: any = {
    product_locales: [
      {
        name: 'sadgasdg',
        description: 'sadgas',
        locales_id: 1
      }
    ],
    categories_products: [{ category_id: 2 }],
    price: 12,
    article: '124',
    old_price: '123',
    brand_id: 17,
    product_colors: [
      {
        color_id: 1
      },
      {
        color_id: 2
      },
      {
        color_id: 3
      }
    ],
    discount: '123',
    charge: 1,
    rest: 5,
    product_images: [
      {
        name: 'Снимок экрана 2019-11-25 в 16',
        is_main: false,
        alt: 'Снимок экрана 2019-11-25 в 16',
        image:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkAQIMNBPg5llCAAACl0lEQVRIx5XVT29UZRQG8F/H0tBEChnLRgnOOBBXdLpjlrrQhYldaqIB+x2UTa2ygBrSsIOF0LJSyifQRBNaVlPjho5dgC6QjaaEMdpx2oRRelz0TufemWlrz928ec7f+z7vOWdAPxnxrjeUFRzDXx6rWfSNhv8hr7tlUyTfU093zpvmnd7bedhVLeFvt5130iFwyEkfWdAUWmYd3s39lFVh3SWjffWjLlsXakr91OOeCFWFPWssWBbWjPdmfyLU5fe9o7y6sJatYthPQl2oGtnTfUQ1sawZ7sBXhaq86j4hRhKLvGVhtkNcy7pCymA7RNkF1113wVjGfQRFDa02qbeES105Ku7t8B/CkkpXfTPC/LbLpmaKuO0QITwwZcKETz1MkPTvjWracIQPhduZP60Iz015YQcZNG1LqGTsFoT3mRPO44SSHLgnTPVc4LSwCHJKTmBSuMGPwqtYEfIoCw9S2TtVPBTGkBdWUBR+yCkKv6cM38ZXnvcE+NfXeCuF/CYUc476wz8puIjVvq9gNdG2peVPR3PCQMYs6ELaMpBoM0hOQz5p2215jDN9A5xJtG0Zcsx6ziMDXk7B3+GcwT6XeA7fp5BXDHjEzR4al4TpngAXhbs9NH7JB30f0pbpVBWDLtoSzmbs7gjv7fWUf/aZCRM+90ufp3xc04YXYV64nHGvqljMNNNdZ7ua6Qthbvt4epd2HvOJa675OGGlu52fOdUuZ1ZYPsBAecmycKWjOKx24JG2kh3vJWsHHKqvdSvK1oTlfcZ6MRnr5X7KkprQMLPLYjluRkO435u9LcNmtYSmBZMKhsCQgkl3NIVnruy+2tqkzqeWa11957xhrkNcW/o37hHveNO4YrLef3Xfkm81e03/A/WIJ6IcPLzIAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTAxLTAyVDEyOjUyOjE5KzAwOjAwjR2uxgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wMS0wMlQxMjo1MjoxOSswMDowMPxAFnoAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC',
        extension: '39.41.png'
      }
    ]
  }

  it('insert', () => {
    const ins = new Insert({ _schema: 'products' })
      .alias('asd')
      .insert(params)
      .insert(params)
      .select('name id')
      .with('test', query => {
        return query.select('id')
      })
    // console.log(ins.query())
    expect(ins.query()).toBeTruthy()

    // console.log(ins.query())
  })
  it('insert', () => {
    const ins = new Insert({ _schema: 'products' })

      .insert([
        { a: 1, b: 2 },
        { a: 23, b: 5 }
      ])
      .insert({ a: 1, f: 2 })
      .select('name id')
      .with('test', query => {
        return query.select('id')
      })
    // console.log(ins.query())
    expect(ins.query()).toBeTruthy()

    // console.log(ins.query())
  })

  it('insert with custom schema', () => {
    const ins = new Insert({ _schema: 'products' })

      .insert([
        { a: 1, b: 2 },
        { a: 23, b: 5 }
      ])
      .insert({ a: 1, f: 2 })
      .select('name id')
      .with('test', query => {
        return query.select('id')
      })
    // console.log(ins.query())
    expect(ins.query()).toBeTruthy()

    // console.log(ins.query())
  })

  it('check provider', () => {
    const provider = {
      mutate: ({ query }: any) => {
        return query
      }
    }
    let query = new Insert({ _schema: 'products', provider }).insert(params)
    expect(query.mutate()).toBeTruthy()
  })
})
