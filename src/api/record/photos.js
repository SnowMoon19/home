import request from "@/myConfig/request";

/**
 * 查询当前用户的相册列表
 */
export function getAlbumList(formData) {
    return request({
        url: `/record/photos/getAlbumListById`,
        method: 'get',
        param: formData,
    })
}

/**
 * 新增一个相册
 */
export function addAlbum(formData) {
    return request({
        url: `/record/photos/addAlbum`,
        method: 'post',
        param: formData,
    })
}