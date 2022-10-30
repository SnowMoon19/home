// 获取当前日期，格式YYYY-MM-DD
export function getNowFormatDay(nowDate) {
    const char = '-'
    if (nowDate == null) {
        nowDate = new Date()
    }
    const day = nowDate.getDate()
    const month = nowDate.getMonth() + 1// 注意月份需要+1
    const year = nowDate.getFullYear()
    // 补全0，并拼接
    return year + char + completeDate(month) + char + completeDate(day)
}

// 获取当前时间，格式YYYY-MM-DD HH:mm:ss
export function getNowFormatTime() {
    const nowDate = new Date()
    const colon = ':'
    const h = nowDate.getHours()
    const m = nowDate.getMinutes()
    const s = nowDate.getSeconds()
    // 补全0，并拼接
    return getNowFormatDay(nowDate) + ' ' + completeDate(h) + colon + completeDate(m) + colon + completeDate(s)
}

/**
 * 转化时间为标准格式的年月日
 */
export function formatDay(time) {
    const d = time ? new Date(time) : new Date()
    const char = '-'
    const day = d.getDate()
    const month = d.getMonth() + 1// 注意月份需要+1
    const year = d.getFullYear()
    return year + char + completeDate(month) + char + completeDate(day)
}

// 没有秒的标准格式具体时间
export function formatTimeWithoutSecond(time) {
    const d = time ? new Date(time) : new Date()
    const colon = ':'
    const hour = d.getHours()
    const minute = d.getMinutes()
    return formatDay(d) + ' ' + completeDate(hour) + colon + completeDate(minute)
}

// 没有秒和年份的标准格式具体时间
export function formatTimeWithoutSecondAndYear(time) {
    const d = time ? new Date(time) : new Date()
    const colon = ':'
    const char = '-'
    const hour = d.getHours()
    const minute = d.getMinutes()
    const day = d.getDate()
    const month = d.getMonth() + 1// 注意月份需要+1
    return completeDate(month) + char + completeDate(day) + ' ' + completeDate(hour) + colon + completeDate(minute)
}

// 没有秒和年份的标准格式具体时间
export function formatDateWithoutMonthAndYear(time) {
    const d = time ? new Date(time) : new Date()
    const char = '-'
    const day = d.getDate()
    const month = d.getMonth() + 1// 注意月份需要+1
    return completeDate(month) + char + completeDate(day)
}

/**
 * 相差时间（时分秒）
 */
export function formatGap(start, end) {
    const staytimeGap = new Date(end).getTime() - new Date(start).getTime()
    const stayDay = Math.floor(staytimeGap / (3600 * 1000 * 24))
    const leave = staytimeGap % (3600 * 1000 * 24)
    const stayHour = Math.floor(leave / (3600 * 1000))
    const leave1 = staytimeGap % (3600 * 1000)
    const stayMin = Math.floor(leave1 / (60 * 1000))
    const leave2 = leave1 % (60 * 1000)
    const staySec = Math.floor(leave2 / 1000)
    // return stayHour * 60 + stayMin
    return stayDay + '天' + stayHour + '小时' + stayMin + '分钟' + staySec + '秒'
}

// 补全0
function completeDate(value) {
    return value < 10 ? '0' + value : value
}