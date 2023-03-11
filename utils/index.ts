import { RequestMethods } from '@/constants'
import { endpoints } from '@/lib/config/endpoints'
import axios from 'axios'

export const onChangeInput = <StateType extends Record<string, unknown>>({ update, name, value, strategy } : {
  update: React.Dispatch<React.SetStateAction<StateType>>,
  name: string;
  value: unknown
  strategy?: (prev: StateType) => StateType
}) => {
  update((prev) => ({
    ...prev,
    [name]: value
  }))
}

const api = axios.create({
  baseURL: endpoints.nextServer
})

export const operate = async ({ method = RequestMethods.Get, url, data, onError } : {
  method?: string,
  url: string,
  data?: Record<string, unknown>,
  onError?: () => void;
}) => {
  switch (method) {
  case RequestMethods.Get: {
    const response = await api.get(`api${url}`)  

    return response.data
  }
  case RequestMethods.Post : {
    const response = await api.post(`api${url}`, data)

    return response.data
  }
  case RequestMethods.Put : {
    const response = await api.put(`api${url}`, data)

    return response.data
  }
  }
}

export const findIndexByIdPropertyInArray = <T extends { _id?: string }>({
  id,
  array
}: { id: string, array: T[] }) => {
  return array.findIndex(({ _id }) => _id === id)
}

export const insertInArrayByIndex = function <T>({
  index,
  array,
  item
}: { index: number, array: T[], item: T}) {
  const newArray = Array.from(array)

  newArray[index] = item

  return newArray
}