/**
 * Given an object or array obj, return a compact object. A compact object is the same as the original object, except with keys containing falsy values removed. This operation applies to the object and any nested objects. Arrays are considered objects where the indices are keys. A value is considered falsy when Boolean(value) returns false.
 * You may assume the obj is the output of JSON.parse. In other words, it is valid JSON.
 * @param {Object} obj
 * @return {Object}
 */
var compactObject = function(obj) {
  const result = (Array.isArray(obj) ? [] : {});
  for (let key in obj) {
    if (!obj[key]) { continue; }
    if (typeof obj[key] === 'object') {
      if (Array.isArray(result)) {
        result.push(compactObject(obj[key]));
      } else {
        result[key] = compactObject(obj[key]);
      }
    } else {
      if (Array.isArray(result)) {
        result.push(obj[key]);
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
};
