import Update from '../src/hasura-orm'
import Insert from '../src/insert'
import Upd from '../src/update'

describe('updert test', () => {
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
    article: '123',
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
  it('with custom query', () => {
    expect(
      new Upd({ _prefix: 'test', _schema: 'asd', provider: {}, _schemaArguments: {}, _alias: 'as' })
        .where({ id: 1 })
        .update({ rest: 1, article: 'asdgasdgsadg' }, { _append: '1' })
        .update({ _append: { addins: { z: 1 } } })
        .query()
    ).toBeTruthy()
  })

  it('update with custom schema where need error', () => {
    expect.assertions(1)
    try {
      new Update({ _schema: 'products' })
        .update({ rest: 1, article: 'asdgasdgsadg' }, 'test')
        .query()
    } catch (e) {
      expect(e).toEqual(new Error('where condition need'))
    }
  })

  it('update where need error', () => {
    expect.assertions(1)
    try {
      new Update({ _schema: 'products' }).update({ rest: 1, article: 'asdgasdgsadg' }).query()
    } catch (e) {
      expect(e).toEqual(new Error('where condition need'))
    }
  })

  it('update', () => {
    const upd = new Update({ _schema: 'products' })
      .alias('test')
      .select('id name')
      .with('product_locales', lc => {
        return lc.select('description  name locales_id')
      })
      .update({ rest: 1, article: 'asdgasdgsadg' })
      .where({ id: 1 })
      .compose('categories_product', upd => {
        return upd
          .update({ id: 1 })
          .where({ id: 1 })
          .select('id')
      })
      .insert('product_images', (ins: Insert) => {
        return ins.insert({
          on_conflict: { constraint: 'product_images_pkey', update_columns: [] },
          objects: [
            {
              name: 'Снимок экрана 2019-11-25 в 16',
              is_main: false,
              alt: 'Снимок экрана 2019-11-25 в 16',
              image:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkAQIMNBPg5llCAAACl0lEQVRIx5XVT29UZRQG8F/H0tBEChnLRgnOOBBXdLpjlrrQhYldaqIB+x2UTa2ygBrSsIOF0LJSyifQRBNaVlPjho5dgC6QjaaEMdpx2oRRelz0TufemWlrz928ec7f+z7vOWdAPxnxrjeUFRzDXx6rWfSNhv8hr7tlUyTfU093zpvmnd7bedhVLeFvt5130iFwyEkfWdAUWmYd3s39lFVh3SWjffWjLlsXakr91OOeCFWFPWssWBbWjPdmfyLU5fe9o7y6sJatYthPQl2oGtnTfUQ1sawZ7sBXhaq86j4hRhKLvGVhtkNcy7pCymA7RNkF1113wVjGfQRFDa02qbeES105Ku7t8B/CkkpXfTPC/LbLpmaKuO0QITwwZcKETz1MkPTvjWracIQPhduZP60Iz015YQcZNG1LqGTsFoT3mRPO44SSHLgnTPVc4LSwCHJKTmBSuMGPwqtYEfIoCw9S2TtVPBTGkBdWUBR+yCkKv6cM38ZXnvcE+NfXeCuF/CYUc476wz8puIjVvq9gNdG2peVPR3PCQMYs6ELaMpBoM0hOQz5p2215jDN9A5xJtG0Zcsx6ziMDXk7B3+GcwT6XeA7fp5BXDHjEzR4al4TpngAXhbs9NH7JB30f0pbpVBWDLtoSzmbs7gjv7fWUf/aZCRM+90ufp3xc04YXYV64nHGvqljMNNNdZ7ua6Qthbvt4epd2HvOJa675OGGlu52fOdUuZ1ZYPsBAecmycKWjOKx24JG2kh3vJWsHHKqvdSvK1oTlfcZ6MRnr5X7KkprQMLPLYjluRkO435u9LcNmtYSmBZMKhsCQgkl3NIVnruy+2tqkzqeWa11957xhrkNcW/o37hHveNO4YrLef3Xfkm81e03/A/WIJ6IcPLzIAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTAxLTAyVDEyOjUyOjE5KzAwOjAwjR2uxgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wMS0wMlQxMjo1MjoxOSswMDowMPxAFnoAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC',
              extension: '39.41.png'
            }
          ]
        })
      })

    expect(upd).toBeInstanceOf(Upd)

    // console.log(upd.query())
  })
  it('with _set key', () => {
    const provider = {
      mutate: ({ query }: any) => {
        return query
      }
    }

    let query = new Update({ _schema: 'categories', provider })
      .update({ _set: { sort: 1, data: 'asdas' } })
      .update({ _append: { addins: { a: 1 } } })
      .where({ id: 1 })
    expect(query.mutate()).toBeTruthy()
  })
  it('with empty  prefix', () => {
    const provider = {
      mutate: ({ query }: any) => {
        return query
      }
    }

    let query = new Update({ _schema: 'categories', provider })
      .update({ _set: { sort: 1, data: 'asdas' } }, '')
      .update({ _append: { addins: { a: 1 } } })
      .where({ id: 1 })
    // console.log(query.query())
    expect(query.mutate()).toBeTruthy()
  })

  it('update composer', () => {
    const provider = {
      mutate: ({ query, variables }: any) => {
        // console.log(query)
        // console.log(variables)
        return query
      }
    }

    let query = new Update({ _schema: 'categories', provider })
      .update({ _set: { sort: 1, addins: { test: '1' } } })
      .where({ id: 'b2284d8a-68bf-47fb-a619-f496df4e67e0' })
      .compose('category_locales', upd => {
        return upd

          .update({ name: 'asdasd', description: 'asdasda' })
          .where({ category_id: 'b2284d8a-68bf-47fb-a619-f496df4e67e0' })
      })

    // console.log(query.query())
    expect(query.mutate()).toBeTruthy()
  })

  it('check provider', () => {
    const provider = {
      mutate: ({ query }: any) => {
        return query
      }
    }

    let query = new Update({ _schema: 'categories', provider })
      .update({ sort: 1 })
      .update({ _append: { addins: { a: 1 } } })
      .where({ id: 1 })
    // console.log(query.query())
    expect(query.mutate()).toBeTruthy()
  })
})
