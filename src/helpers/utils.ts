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
