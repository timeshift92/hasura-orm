import Delete from '../src/hasura-orm'

describe('delete test', () => {
  it('update where need error', () => {
    expect(new Delete('products').delete({ rest: 1 }).query()).toBeTruthy()
  })

  it('check provider', () => {
    const provider = {
      mutate: ({ query }: any) => {
        return query
      }
    }
    let query = new Delete('products', provider).select('id').delete({ rest: 1 })
    let query2 = new Delete('products', provider).delete({ rest: 1 })

    expect(query.alias('asdwq2').query()).toBeTruthy()
    expect(query2.mutate()).toBeTruthy()
  })
})
