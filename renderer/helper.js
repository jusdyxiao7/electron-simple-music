exports.$ = (id) => {
    return document.getElementById(id)
}

exports.convertDuration = (time) => {
    // 计算分钟
    // 单数返回 '01'
    // 多位数 '010'
    const minutes = "0" + Math.floor(time / 60)
    // 计算秒数
    // 单数返回 '02'
    // 多位数 '020'
    const seconds = "0" + Math.floor(time - minutes * 60)
    // console.log(minutes)
    // console.log(seconds)
    // return minutes.substring(-2) + ":" + seconds.substring(-2)

    // 采用新方法适配
    const minNumberStr = Math.floor(time / 60) + ""
    const secNumberStr = Math.floor(time - minutes * 60) + ""
    return minNumberStr.padStart(2, '0') + ":" + secNumberStr.padStart(2, '0')
}