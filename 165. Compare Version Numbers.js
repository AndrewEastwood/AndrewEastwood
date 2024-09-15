/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
  const v1Blocks = version1.split('.').map(v => parseInt(v));
  const v2Blocks = version2.split('.').map(v => parseInt(v));

  let subVer1;
  let subVer2;
  while (v1Blocks.length > 0 || v2Blocks.length > 0) {
    subVer1 = v1Blocks.shift() ?? 0;
    subVer2 = v2Blocks.shift() ?? 0;
    if (subVer1 > subVer2) {
      return 1;
    }
    if (subVer1 < subVer2) {
      return -1;
    }
  }

  return 0;
};
