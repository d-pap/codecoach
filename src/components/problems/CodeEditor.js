/**
 * Code editor for problem solving page
 * Currently NOT a compiler, only an editor.
 * Using React-Ace code editor
 */
import React from 'react'
import AceEditor from 'react-ace'

// import a theme
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'

const CodeEditor = ({ code, setCode }) => {
  return (
    <AceEditor
      mode="python"
      theme="monokai"
      name="codeEditor"
      onChange={(newCode) => setCode(newCode)}
      value={code}
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2,
      }}
      width="100%"
      height="400px" // might need to adjust to fit good
    />
  )
}

export default CodeEditor
