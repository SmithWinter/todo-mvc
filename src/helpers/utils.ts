import { type MenuItem } from './interface'

export const menuList: MenuItem[] = [
  {
    name: 'All',
    path: '/',
    params: {}
  },
  {
    name: 'Active',
    path: '/active',
    params: { isFinished: false }
  },
  {
    name: 'Completed',
    path: '/completed',
    params: { isFinished: true }
  }
]
/**
 * Generates a random string of specified length using a combination of uppercase and lowercase letters, and numbers.
 *
 * @param length - The desired length of the generated string.
 * @returns A random string of the specified length.
 *
 */
export function uuidGenerator(length: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
