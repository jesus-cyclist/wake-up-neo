import { ChangeEvent, useState } from 'react'

type TFormValues = {
  [key: string]: string
}

export const useForm = (inputValues: TFormValues) => {
  const [values, setValues] = useState(inputValues)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  return { handleChange, values }
}
