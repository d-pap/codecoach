/**
 * Allows the user to resize the columns vertically.
 */

import React, { useState, useRef, useCallback } from 'react'

function VerticalResizableColumn({
  children,
  initialHeight = 200,
  minHeight = 150,
  maxHeight = 250,
}) {
  const [height, setHeight] = useState(initialHeight)
  const resizableRef = useRef(null)

  // Handle resizing on mouse move or touch move events
  const handleResize = useCallback(
    (startPosition, event) => {
      const handleMove = (moveEvent) => {
        const clientY =
          event.type === 'touchmove'
            ? moveEvent.touches[0].clientY
            : moveEvent.clientY
        const newHeight = Math.min(
          maxHeight,
          Math.max(minHeight, height + (clientY - startPosition))
        )
        setHeight(newHeight)
      }

      const handleEnd = () => {
        document.removeEventListener('mousemove', handleMove)
        document.removeEventListener('mouseup', handleEnd)
        document.removeEventListener('touchmove', handleMove)
        document.removeEventListener('touchend', handleEnd)
      }

      document.addEventListener('mousemove', handleMove)
      document.addEventListener('mouseup', handleEnd)
      document.addEventListener('touchmove', handleMove, { passive: false })
      document.addEventListener('touchend', handleEnd, { passive: false })
    },
    [height, minHeight, maxHeight]
  )

  // Handle resizing on mouse down
  const handleMouseDown = useCallback(
    (e) => {
      handleResize(e.clientY, e)
    },
    [handleResize]
  )

  // Handle resizing on touch start
  const handleTouchStart = useCallback(
    (e) => {
      handleResize(e.touches[0].clientY, e)
    },
    [handleResize]
  )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <div
        style={{
          height: `${height}px`,
          minHeight: `${minHeight}px`,
          maxHeight: `${maxHeight}px`,
          overflow: 'auto',
          borderBottom: '2px solid #ccc',
        }}
        ref={resizableRef}
      >
        {children}
      </div>
      <div
        style={{
          cursor: 'ns-resize',
          height: '10px',
          backgroundColor: '#ddd',
          width: '100%',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
    </div>
  )
}

export default VerticalResizableColumn
