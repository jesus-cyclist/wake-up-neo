import { FC, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import TextTyper from '../TextTyper/TextTyper'
import styles from './Hint.module.scss'

type THintProps = {
  hint: string
  setHint: Function
}

const Hint: FC<THintProps> = (props) => {
  const { hint = '', setHint } = props
  const [isHintActive, setIsHintActive] = useState(false)

  const hintRef = useRef(null)

  useEffect(() => {
    isHintActive && setTimeout(() => setIsHintActive(false), 15000)
  }, [isHintActive])

  useEffect(() => {
    if (hint) setIsHintActive(true)
  }, [hint])

  return (
    <CSSTransition
      in={isHintActive}
      timeout={500}
      nodeRef={hintRef}
      classNames={{
        enterActive: styles[`${'hint'}EnterActive`],
        enterDone: styles[`${'hint'}EnterDone`],
        exit: styles[`${'hint'}Exit`],
        exitActive: styles[`${'hint'}ExitActive`],
      }}
      onExited={() => setHint('')}
    >
      {(state) => (
        <span className={styles.hint} ref={hintRef}>
          {hint && <TextTyper text={hint} speed={'high'} isActive={false} />}
        </span>
      )}
    </CSSTransition>
  )
}

export default Hint
