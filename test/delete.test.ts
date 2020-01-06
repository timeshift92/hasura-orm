import Delete from '../src/hasura-orm'

describe('delete test', () => {
  it('update where need error', () => {
    expect(new Delete('products').delete({ rest: 1 }).query()).toBeTruthy()
  })
  console.log(new Delete('products').delete({ rest: 1 }).query())
})
