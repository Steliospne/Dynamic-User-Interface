function recursionFib(n) {
  if (n <= 0) return [];
  if (n == 1) return [0];
  if (n == 2) return [0, 1];

  const arr = recursionFib(n - 1);
  const nextNumber = arr[arr.length - 2] + arr[arr.length - 1];
  arr.push(nextNumber);
  return arr;
}

function fib(n) {
  if (n <= 0) return [];
  if (n == 1) return [0];
  if (n == 2) return [0, 1];
  let arr = [];
  for (let num = 0; num < n; num++) {
    num == 0
      ? arr.push(0)
      : num == 1 || num == 2
      ? arr.push(1)
      : arr.push(arr[num - 1] + arr[num - 2]);
  }
  return arr;
}