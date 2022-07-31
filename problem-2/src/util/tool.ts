function noRepeat(arr: any, id: string): any {
  let newArr:any = [];
  let map = new Map();
  arr.forEach(v => {
    if (!map.has(v[id])) {
      map.set(v[id], true);
      newArr.push(v);
    }
  });

  return newArr
}

export { noRepeat };




