/**
 * Allows the user to resize the columns on their screen.
 */

import React, { useState, useRef, useCallback } from 'react'

function ResizableColumn({
  children,
  initialWidth = 200,
  minWidth = 150,
  maxWidth = 250,
}) {
  const [width, setWidth] = useState(initialWidth)
  const resizableRef = useRef(null)

  const handleResize = useCallback(
    (startPosition, event) => {
      const handleMove = (moveEvent) => {
        const clientX =
          event.type === 'touchmove'
            ? moveEvent.touches[0].clientX
            : moveEvent.clientX
        const newWidth = Math.min(
          maxWidth,
          Math.max(minWidth, width + (clientX - startPosition))
        )
        setWidth(newWidth)
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
    [width, minWidth, maxWidth]
  )

  const handleMouseDown = useCallback(
    (e) => {
      handleResize(e.clientX, e)
    },
    [handleResize]
  )

  const handleTouchStart = useCallback(
    (e) => {
      handleResize(e.touches[0].clientX, e)
    },
    [handleResize]
  )

  return (
    <div style={{ display: 'flex', alignItems: 'stretch' }}>
      <div
        style={{
          width: `${width}px`,
          minWidth: `${minWidth}px`,
          maxWidth: `${maxWidth}px`,
          overflow: 'auto',
          borderRight: '2px solid #ccc',
        }}
        ref={resizableRef}
      >
        {children}
      </div>
      <div
        style={{
          cursor: 'ew-resize',
          width: '10px',
          backgroundColor: '#ddd',
          height: '100%',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
    </div>
  )
}

export default ResizableColumn
