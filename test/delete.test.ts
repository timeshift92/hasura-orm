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
    let query = new Delete('products', provider).delete({ rest: 1 })
    expect(query.mutate()).toBeTruthy()
  })
})
