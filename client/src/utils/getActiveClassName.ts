export const getActiveClassName = (
  styles: { [key: string]: string },
  className: string,
  isActive: boolean
) => {
  return isActive
    ? `${styles[className]} ${styles[`${className}Active`]}`
    : styles[className]
}
