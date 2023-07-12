var perms = function (xs) {
  if (!xs.length) return [[]];
  return xs.flatMap(x => {
    // get permutations of xs without x, then prepend x to each
    return perms(xs.filter(v => v !== x))
      .map(vs => [x, ...vs]);
  });
}
