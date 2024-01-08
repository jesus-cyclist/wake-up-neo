type TgetRandomInterArgs = {
  start?: number
  end: number
}

export const getRandomInteger = ({ start = 0, end }: TgetRandomInterArgs) => {
  return Math.round(Math.random() * (end - start) + start)
}
