import { useState } from 'react'

type TUseFetchingResult = [Function, boolean, boolean]

export const useFetching = (callback: Function): TUseFetchingResult => {
  const [isLoading, setIsloading] = useState(false)
  const [isError, setIsError] = useState(false)

  const fetching = async (...args: any) => {
    try {
      setIsloading(true)
      await callback(...args)
    } catch (error) {
      setIsError(true)
    } finally {
      setIsloading(false)
    }
  }
  return [fetching, isLoading, isError]
}
