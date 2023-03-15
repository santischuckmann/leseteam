import { RequestMethods } from '@/constants'
import axios from 'axios'
import { useState } from 'react'
import { endpoints } from '../config/endpoints'

const api = axios.create({
  baseURL: endpoints.nextServer
})

export interface OperateArgs {
  method?: string,
  url: string,
  data?: Record<string, unknown>,
  onError?: () => void;
}

const operate = async ({ method = RequestMethods.Get, url, data, onError } : {
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
  case RequestMethods.Delete : {
    const response = await api.delete(`api${url}`)

    return response.data
  }
  }
}

export const useOperate = () => {
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState<any>(null)

  const performOperation = async (operationArgs: OperateArgs) => {
    setLoading(true)
    try {
      const data = await operate(operationArgs)
      
      return data
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }

  }

  return [ performOperation, { loading, error } ] as const

}