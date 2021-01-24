import { v4 as uuidv4 } from 'uuid';


export const getId = () => uuidv4();


export const getLocalItem = (key: string) => {
  const data = window.localStorage.getItem(key)
  if (!data) return
  return JSON.parse(data)
}

export const setLocalItem = (key: string, data: any) => {
  const dataString = JSON.parse(data)
  window.localStorage.setItem(key, dataString)
}

export const pushLocalItem = (key: string, data: any) => {
  const oldList = getLocalItem(key) || []
  oldList.push(data)
  setLocalItem(key, oldList)
}

export const popLocalItem = (key: string) => {
  const oldList = getLocalItem(key) || []
  const popItem = oldList.pop()
  setLocalItem(key, oldList)
  return popItem
}