import Dropdown from 'components/UI/Dropdown/Dropdown'
import React, { useState, FC, ReactNode } from 'react'
import styles from './EmojiDropdown.module.scss'
import {
  BsEmojiAngry,
  BsEmojiAstonished,
  BsEmojiDizzy,
  BsEmojiFrown,
  BsEmojiGrimace,
  BsEmojiGrin,
  BsEmojiHeartEyes,
  BsEmojiTear,
  BsEmojiKiss,
  BsEmojiWink,
  BsEmojiLaughing,
  BsEmojiNeutral,
  BsEmojiSmile,
  BsEmojiSmileUpsideDown,
  BsEmojiSunglasses,
  BsEmojiSurprise,
} from 'react-icons/bs'

type TEmojiDropdown = {
  addEmoji: (smile: ReactNode) => void
}

const EmojiDropdown: FC<TEmojiDropdown> = (props) => {
  const { addEmoji } = props

  const [isEmojiDropdownOpen, setIsEmojiDropdownOpen] = useState(false)

  const [emojiOptions] = useState([
    {
      component: <BsEmojiAngry />,
      description: 'angry',
      onClick: () => {
        addEmoji('😠')
      },
    },
    {
      component: <BsEmojiAstonished />,
      description: 'astonished',
      onClick: () => {
        addEmoji('😲')
      },
    },
    {
      component: <BsEmojiDizzy />,
      description: 'dizzy',
      onClick: () => {
        addEmoji('😵')
      },
    },
    {
      component: <BsEmojiFrown />,
      description: 'frown',
      onClick: () => {
        addEmoji('😦')
      },
    },
    {
      component: <BsEmojiGrimace />,
      description: 'grimace',
      onClick: () => {
        addEmoji('😬')
      },
    },
    {
      component: <BsEmojiGrin />,
      description: 'grin',
      onClick: () => {
        addEmoji('😁')
      },
    },
    {
      component: <BsEmojiHeartEyes />,
      description: 'heart eyes',
      onClick: () => {
        addEmoji('😍')
      },
    },
    {
      component: <BsEmojiTear />,
      description: 'tear',
      onClick: () => {
        addEmoji('😢')
      },
    },
    {
      component: <BsEmojiKiss />,
      description: 'kiss',
      onClick: () => {
        addEmoji('😘')
      },
    },
    {
      component: <BsEmojiWink />,
      description: 'wink',
      onClick: () => {
        addEmoji('😜')
      },
    },
    {
      component: <BsEmojiLaughing />,
      description: 'laughing',
      onClick: () => {
        addEmoji('😂')
      },
    },
    {
      component: <BsEmojiNeutral />,
      description: 'neutral',
      onClick: () => {
        addEmoji('😐')
      },
    },
    {
      component: <BsEmojiSmile />,
      description: 'smile',
      onClick: () => {
        addEmoji('😊')
      },
    },
    {
      component: <BsEmojiSmileUpsideDown />,
      description: 'smile upside down',
      onClick: () => {
        addEmoji('🙃')
      },
    },
    {
      component: <BsEmojiSunglasses />,
      description: 'sunglasses',
      onClick: () => {
        addEmoji('😎')
      },
    },
    {
      component: <BsEmojiSurprise />,
      description: 'surprise',
      onClick: () => {
        addEmoji('😮')
      },
    },
  ])

  const toggleEmojiDropdown = () => {
    setIsEmojiDropdownOpen((prev) => !prev)
  }

  const closeEmojiDropdown = () => {
    setIsEmojiDropdownOpen((prev) => false)
  }

  return (
    <div className={styles.container}>
      <Dropdown
        options={emojiOptions}
        rows={4}
        columns={4}
        button={<BsEmojiSmile />}
        isActive={isEmojiDropdownOpen}
        open={toggleEmojiDropdown}
        close={closeEmojiDropdown}
      />
    </div>
  )
}

export default EmojiDropdown
