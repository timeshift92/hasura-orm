import HasuraORM from '../src/hasura-orm'
import Delete from '../src/delete'

describe('delete test', () => {
  it('update where need error', () => {
    expect(
      new Delete({ _prefix: '', _schema: 'products' }).delete({ rest: 1 }).query()
    ).toBeTruthy()
  })

  it('update where need error', () => {
    new HasuraORM({ _schema: 'products' }).delete({ rest: 1 }, 'tester')
    expect(new Delete({ _schema: 'products' }).delete({ rest: 1 }).query()).toBeTruthy()
  })

  it('check provider', () => {
    const provider = {
      mutate: ({ query }: any) => {
        return query
      }
    }
    let query = new Delete({ _schema: 'products', provider }).select('id').delete({ rest: 1 })
    let query2 = new Delete({ _schema: 'products', provider }).delete({ rest: 1 })

    expect(query.alias('asdwq2').query()).toBeTruthy()
    expect(query2.mutate()).toBeTruthy()
  })
})

describe('delete with custom schema test', () => {
  it('update where need error', () => {
    expect(
      new Delete({ _schema: 'products', _prefix: 'asd' })
        .alias('asd2')
        .delete({ rest: 1 })
        .query()
    ).toBeTruthy()
  })

  it('check provider', () => {
    const provider = {
      mutate: ({ query }: any) => {
        return query
      }
    }
    let query = new Delete({ _schema: 'products', provider, _prefix: 'test' })
      .select('id')
      .delete({ rest: 1 })
    let query2 = new Delete({ _schema: 'products', provider }).delete({ rest: 1 })

    expect(query.alias('asdwq2').query()).toBeTruthy()
    expect(query2.mutate()).toBeTruthy()
  })

  it('check provider', () => {
    const provider = {
      query: ({ query }: any) => {
        return query
      }
    }

    let query = new Delete({ _schema: 'products', provider }).where({ id: 1 })
    expect(query.query()).toBeTruthy()
  })
})
