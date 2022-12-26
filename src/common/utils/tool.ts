/**
 * 把id和pid组合成树
 * @param {array} [arr] 需要组合的数组
 */
export const idPidToTree = (arr) => {
  // 使用reduce给数组定义一个方法
  let formatObj = arr.reduce((pre, cur) => {
    return { ...pre, [cur['id']]: cur }
  }, {})
  // 构造新的数据
  let formatArray = arr.reduce((arr, cur) => {
    let pid = cur.pid ? cur.pid : 0
    let parent = formatObj[pid]
    if (parent) {
      parent.children ? parent.children.push(cur) : (parent.children = [cur])
    } else {
      arr.push(cur)
    }
    return arr
  }, [])
  return formatArray
}
