import request from '@/myConfig/request'

/**
 * 查询当前用户的第一次记录列表
 */
export function getFirstRecordList(formData) {
    return request({
        url: `/record/firstRecord/getFirstRecordListById`,
        method: 'get',
        param: formData,
    })
}

/**
 * 新增一条第一次记录
 */
export function addFirstRecord(formData) {
    return request({
        url: `/record/firstRecord/addFirstRecord`,
        method: 'post',
        param: formData,
    })
}

/**
 * 确认一条待完成第一次记录
 */
export function confirmTodoFirstRecord(formData) {
    return request({
        url: `/record/firstRecord/confirmTodoFirstRecord`,
        method: 'post',
        param: formData,
    })
}

/**
 * 删除一条待完成的第一次记录
 */
export function deleteTodoFirstRecord(formData) {
    return request({
        url: `/record/deleteTodoFirstRecord`,
        method: 'post',
        param: formData,
    })
}