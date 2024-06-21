export default async function traverseAndReplaceUUIDsAsync(str, asyncCallback) {
  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi
  const uuidMatches = [ ...str.matchAll(uuidRegex) ]
  const promiseArray = uuidMatches.map(asyncCallback)
  const replacements = await Promise.all(promiseArray)
  uuidMatches.forEach((uuid,i) => str = str.replace(uuid[0], replacements[i]) )
  return str
}