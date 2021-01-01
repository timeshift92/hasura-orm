export function stringify(object: any, trim = true, rpRight = false): any {
  let res = JSON.stringify(object)
    .replace(/\"@cl\":(")([\w:\s,]+)["]/g, '$2')
    // .replace(/(\"order_by\":\{\"[\w,]+\":)\"([^"]+)\"/g, '$1$2')
    .replace(/((\"distinct_on\"|\"constraint\"):)\"([^"]+)\",/g, '$1$3,')
    .replace(/\"([^"]+)\":/g, '$1:')
  if (trim) {
    res = res.replace(/\uFFFF/g, '\\"').replace(/^.|.$/g, '')
  }
  if (rpRight) {
    res = res.replace(/[\"|{|}]/g, '')
  }

  return res
}

export function hasRelation(value: any) {
  Object.keys(value).map((key: any) => {
    if (typeof value[key] === 'object' && value.objects) {
      return value
    } else if (Array.isArray(value[key])) {
      value[key] = { data: value[key] }
    }
    return value
  })
  return value
}
