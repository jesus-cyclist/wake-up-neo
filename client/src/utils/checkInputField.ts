type TCheckInputField = Array<string>

export const checkInputField = (inputField: TCheckInputField) => {
  return inputField.some((field) => field.length < 5)
}
