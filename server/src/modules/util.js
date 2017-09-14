module.exports = {

  /**
   * Returns a nicely formatted string of JSON-literal
   *
   * @param o
   */
  jstr (o) {
    return JSON.stringify(o, null, 2)
  },

  /**
   * In-place removal of item from a list of dictionaries, using the key
   * to make the comparison for equality for the item
   *
   * @param aList
   * @param item
   * @param key
   */
  removeItem (aList, item, key) {
    const iLast = aList.length - 1
    for (let i = iLast; i >= 0; i -= 1) {
      if (aList[i][key] === item[key]) {
        aList.splice(i, 1)
      }
    }
  },

  /**
   * Returns an n-length array of v values
   *
   * @param n
   * @param v
   * @returns {Array}
   */
  makeArray (n, v) {
    let l = []
    for (let i = 0; i < n; i += 1) {
      l.push(v)
    }
    return l
  },

  /**
   * Synchronous sleep function, useful for debugging
   *
   * @param ms
   */
  sleep(ms) {
    let start = new Date().getTime()
    let expire = start + ms
    while (new Date().getTime() < expire) {
    }
  }

}
