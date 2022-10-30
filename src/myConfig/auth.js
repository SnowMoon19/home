import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const IdKey = 'Admin-Id'
const UsernameKey = 'Admin-User'
const NameKey = 'Admin-Name'
const AnotherIdKey = 'Admin-Another-Id'
const AnotherUsernameKey = 'Admin-Another-User'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

/**
 *  用户名信息保存到Cookie中，防止刷新消失
 */
export function setUsername(username) {
  return Cookies.set(UsernameKey, username)
}

export function getUsername() {
  return Cookies.get(UsernameKey)
}

export function removeUsername() {
  return Cookies.remove(UsernameKey)
}

/**
 *  id信息保存到Cookie中
 */
export function setId(id) {
  return Cookies.set(IdKey, id)
}

export function getId() {
  return Cookies.get(IdKey)
}

export function removeId() {
  return Cookies.remove(IdKey)
}

/**
 *  名称信
 */
export function setName(name) {
  return Cookies.set(NameKey, name)
}

export function getName() {
  return Cookies.get(NameKey)
}

export function removeName() {
  return Cookies.remove(NameKey)
}

/**
 *  另一半的id信息保存到Cookie中
 */
export function setAnotherId(id) {
  return Cookies.set(AnotherIdKey, id)
}

export function getAnotherId() {
  return Cookies.get(AnotherIdKey)
}

export function removeAnotherId() {
  return Cookies.remove(AnotherIdKey)
}

/**
 *  另一半的用户名信息
 */
export function setAnotherUsername(username) {
  return Cookies.set(AnotherUsernameKey, username)
}

export function getAnotherUsername() {
  return Cookies.get(AnotherUsernameKey)
}

export function removeAnotherUsername() {
  return Cookies.remove(AnotherUsernameKey)
}
