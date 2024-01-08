// import React, { useState, FC, useEffect, useRef, Ref, RefObject } from 'react'
// import styles from './ContextMenu.module.scss'
// import { createPortal } from 'react-dom'
// import { getActiveClassName } from 'utils/getActiveClassName'

// type TOption = {
//   text: string
//   onClick: Function
// }

// type TContextMenuProps = {
//   options: Array<TOption>
//   contextMenuCoordinate: {
//     clientX: number
//     clientY: number
//   }
//   closeContextMenu: Function
//   isContextMenuOpen: boolean
// }

// const ContextMenu: FC<TContextMenuProps> = (props) => {
//   const {
//     options,
//     contextMenuCoordinate,
//     closeContextMenu,
//     isContextMenuOpen,
//   } = props

//   const overlayRef = useRef<HTMLDivElement>(null)
//   const listRef = useRef<HTMLUListElement>(null)

//   const listReverseDirectionX = () => {
//     const screenWidth =
//       window.innerWidth || document.documentElement.clientWidth
//     if (screenWidth / 2 > contextMenuCoordinate.clientX) {
//       return `${contextMenuCoordinate.clientX}px`
//     } else {
//       return `calc(${contextMenuCoordinate.clientX}px - ${listRef.current?.offsetWidth}px)`
//     }
//   }

//   const listReverseDirectionY = () => {
//     const screenHeight =
//       window.innerHeight || document.documentElement.clientHeight

//     if (screenHeight / 2 > contextMenuCoordinate.clientY) {
//       return `${contextMenuCoordinate.clientY}px`
//     } else {
//       return `calc(${contextMenuCoordinate.clientY}px - ${listRef.current?.offsetHeight}px)`
//     }
//   }

//   return (
//     <div
//       className={getActiveClassName(styles, 'container', isContextMenuOpen)}
//       ref={overlayRef}
//     >
//       <div
//         className={getActiveClassName(styles, 'overlay', isContextMenuOpen)}
//         onClick={(e) => closeContextMenu()}
//         onContextMenu={(e) => closeContextMenu()}
//       ></div>

//       <ul
//         className={getActiveClassName(styles, 'contextMenu', isContextMenuOpen)}
//         style={{
//           top: listReverseDirectionY(),
//           left: listReverseDirectionX(),
//         }}
//         ref={listRef}
//       >
//         {options.map((option) => (
//           <li
//             key={option.text}
//             className={styles.contextMenu__item}
//             onClick={() => option.onClick()}
//           >
//             {option.text}
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default ContextMenu

import { FC, useRef } from 'react'
import { getActiveClassName } from 'utils/getActiveClassName'
import styles from './ContextMenu.module.scss'

type TOption = {
  text: string
  onClick: Function
}

type TContextMenuProps = {
  options: Array<TOption>
  contextMenuCoordinate: {
    clientX: number
    clientY: number
  }
  closeContextMenu: Function
  isContextMenuOpen: boolean
}

const ContextMenu: FC<TContextMenuProps> = (props) => {
  const {
    options,
    contextMenuCoordinate,
    closeContextMenu,
    isContextMenuOpen,
  } = props

  const overlayRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const listReverseDirectionX = () => {
    const screenWidth =
      window.innerWidth || document.documentElement.clientWidth
    if (screenWidth / 2 > contextMenuCoordinate.clientX) {
      return `${contextMenuCoordinate.clientX}px`
    } else {
      return `calc(${contextMenuCoordinate.clientX}px - ${listRef.current?.offsetWidth}px)`
    }
  }

  const listReverseDirectionY = () => {
    const screenHeight =
      window.innerHeight || document.documentElement.clientHeight

    if (screenHeight / 2 > contextMenuCoordinate.clientY) {
      return `${contextMenuCoordinate.clientY}px`
    } else {
      return `calc(${contextMenuCoordinate.clientY}px - ${listRef.current?.offsetHeight}px)`
    }
  }

  return (
    <div
      className={getActiveClassName(styles, 'container', isContextMenuOpen)}
      ref={overlayRef}
    >
      <div
        className={getActiveClassName(styles, 'overlay', isContextMenuOpen)}
        onClick={(e) => closeContextMenu()}
        onContextMenu={(e) => closeContextMenu()}
      ></div>

      <ul
        className={getActiveClassName(styles, 'contextMenu', isContextMenuOpen)}
        style={{
          top: listReverseDirectionY(),
          left: listReverseDirectionX(),
        }}
        ref={listRef}
      >
        {options.map((option) => (
          <li
            key={option.text}
            className={styles.contextMenu__item}
            onClick={() => option.onClick()}
          >
            {option.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ContextMenu
