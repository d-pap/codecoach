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

  const handleMouseDown = useCallback(
    (e) => {
      const startX = e.clientX

      const handleMouseMove = (moveEvent) => {
        const newWidth = Math.min(
          maxWidth,
          Math.max(minWidth, width + (moveEvent.clientX - startX))
        )
        setWidth(newWidth)
      }

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [width, minWidth, maxWidth]
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
      />
    </div>
  )
}

export default ResizableColumn
