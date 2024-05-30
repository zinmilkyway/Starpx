export const USER_ACCEPT_COOKIES = 'USER_ACCEPT_COOKIES'
export const ACCESS_TOKEN = 'ACCESS_TOKEN'
export const LOGIN_STATUS = 'LOGIN_STATUS'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'
export const ACCOUNT_PROFILE = 'ACCOUNT_PROFILE'

export const storage = {
  get(key: string, type = 'local') {
    const storage = this.getStorage(type)
    return this.getItem(key, storage)
  },

  set(key: string, value: string, type = 'local') {
    const storage = this.getStorage(type)
    storage?.setItem(key, JSON.stringify(value))
  },

  remove(key: string, type = 'local') {
    const storage = this.getStorage(type)
    storage?.removeItem(key)
  },

  getItem(key: string, storage: any) {
    if (!key || !storage) return null
    const value = storage.getItem(key)
    if (!value) {
      return null
    }
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  },

  getStorage(type = 'local') {
    switch (type) {
      case 'session':
        return sessionStorage
      case 'local':
        return localStorage
      default:
        return null
    }
  }
}
