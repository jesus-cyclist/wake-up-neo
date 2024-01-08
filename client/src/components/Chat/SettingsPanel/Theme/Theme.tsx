import Dropdown from 'components/UI/Dropdown/Dropdown'
import { useTheme } from 'hooks/useTheme'
import { useEffect, useState } from 'react'

import styles from './Theme.module.scss'

const Theme = () => {
  const [theme, setTheme] = useTheme()
  const [choosenColor, setChoosenColor] = useState<null | JSX.Element>(null)

  useEffect(() => {
    const isColorValid = colorScheme.find(
      (color) => color.description === theme
    )

    setChoosenColor(isColorValid!.component)
  }, [theme])

  const [colorScheme, setColorScheme] = useState([
    {
      component: (
        <div
          style={{
            width: '1rem',
            height: '1rem',
            background:
              'linear-gradient(45deg,  rgba(102,255,102,1) 50%, rgba(19,117,13,1)  50%)',
          }}
        ></div>
      ),
      description: 'green',
      onClick: () => setTheme('green'),
    },
    {
      component: (
        <div
          style={{
            width: '1rem',
            height: '1rem',
            background:
              'linear-gradient(45deg, rgba(238,238,238,1) 50%, rgba(201,198,194,1) 50%)',
          }}
        ></div>
      ),
      description: 'white',
      onClick: () => setTheme('white'),
    },
    {
      component: (
        <div
          style={{
            width: '1rem',
            height: '1rem',
            background:
              'linear-gradient(45deg,rgba(255,203,107,1) 50%, rgba(181,137,0,1) 50% )',
          }}
        ></div>
      ),
      description: 'yellow',
      onClick: () => setTheme('yellow'),
    },
    {
      component: (
        <div
          style={{
            width: '1rem',
            height: '1rem',
            background:
              'linear-gradient(45deg,  rgba(102,217,239,1) 50%,rgba(0,119,134,1) 50%)',
          }}
        ></div>
      ),
      description: 'cyan',
      onClick: () => setTheme('cyan'),
    },
    {
      component: (
        <div
          style={{
            width: '1rem',
            height: '1rem',
            background:
              'linear-gradient(45deg,  rgba(210,105,30,1) 50%,rgba(139,69,19,1) 50%)',
          }}
        ></div>
      ),
      description: 'brown',
      onClick: () => setTheme('brown'),
    },
    {
      component: (
        <div
          style={{
            width: '1rem',
            height: '1rem',
            background:
              'linear-gradient(45deg,  rgba(255,102,102,1) 50%,rgba(165,42,42,1) 50%)',
          }}
        ></div>
      ),
      description: 'pink',
      onClick: () => setTheme('pink'),
    },

    {
      component: (
        <div
          style={{
            width: '1rem',
            height: '1rem',
            background:
              'linear-gradient(45deg, rgba(191,141,255,1) 50%, rgba(106,13,173,1) 50%)',
          }}
        ></div>
      ),
      description: 'purple',
      onClick: () => setTheme('purple'),
    },
    {
      component: (
        <div
          style={{
            width: '1rem',
            height: '1rem',
            background:
              ' linear-gradient(45deg, rgba(176,190,197,1) 50%, rgba(96,125,139,1) 50%)',
          }}
        ></div>
      ),
      description: 'blue-gray',
      onClick: () => setTheme('blue-gray'),
    },
    {
      component: (
        <div
          style={{
            width: '1rem',
            height: '1rem',
            background:
              'linear-gradient(45deg, rgba(0,150,136,1) 50%, rgba(0,77,64,1) 50%)',
          }}
        ></div>
      ),
      description: 'teal',
      onClick: () => setTheme('teal'),
    },
  ])

  const [colorSchemeIsOpen, setColorSchemeIsOpen] = useState(false)

  const toggleColorSchemeDropdown = () => {
    setColorSchemeIsOpen((prev) => !prev)
  }

  const closeColorSchemeDropdown = () => {
    setColorSchemeIsOpen((prev) => false)
  }

  return (
    <div className={styles.colorScheme}>
      <span className={styles.title}>Цветовая схема</span>
      <Dropdown
        options={colorScheme}
        button={choosenColor}
        rows={2}
        columns={3}
        isActive={colorSchemeIsOpen}
        close={closeColorSchemeDropdown}
        open={toggleColorSchemeDropdown}
      />
    </div>
  )
}

export default Theme
