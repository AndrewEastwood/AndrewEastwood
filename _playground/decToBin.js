const decToBin = n => {
  const bits = [];
  let q = n;
  let r = 0;
  do {
    r = q % 2;
    q = Math.floor(q / 2);
    bits.unshift(r);
    if (q <= 1) {
      bits.unshift(q);
      break;
    }
  } while (true);
  return bits.join('')
}
