/**
 * Code editor for problem solving page
 * Currently NOT a compiler, only an editor.
 * Using React-Ace code editor
 */
import React from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/ext-language_tools'

const CodeEditor = ({ code, setCode }) => {
  return (
    <AceEditor
      mode="python"
      theme="monokai"
      name="codeEditor"
      onChange={(newCode) => setCode(newCode)}
      fontSize={14}
      lineHeight={19}
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={true}
      value={code}
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
      width="100%"
      height="100%" // might need to adjust to fit good
    />
  )
}

export default CodeEditor
