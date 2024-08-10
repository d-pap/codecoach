// // /**
// //  * Code editor for problem solving page
// //  * Currently NOT a compiler, only an editor.
// //  * Using React-Ace code editor
// //  */
// // import React from 'react'
// // import AceEditor from 'react-ace'
// // import 'ace-builds/src-noconflict/theme-monokai'
// // import 'ace-builds/src-noconflict/mode-python'
// // import 'ace-builds/src-noconflict/ext-language_tools'

// // const CodeEditor = ({ code, setCode }) => {
// //   return (
// //     <AceEditor
// //       mode="python"
// //       theme="monokai"
// //       name="codeEditor"
// //       onChange={(newCode) => setCode(newCode)}
// //       fontSize={14}
// //       lineHeight={19}
// //       showPrintMargin={false}
// //       showGutter={true}
// //       highlightActiveLine={true}
// //       value={code}
// //       editorProps={{ $blockScrolling: true }}
// //       setOptions={{
// //         enableBasicAutocompletion: true,
// //         enableLiveAutocompletion: true,
// //         showLineNumbers: true,
// //         tabSize: 2,
// //       }}
// //       width="100%"
// //       height="100%" // might need to adjust to fit good
// //     />
// //   )
// // }

// // export default CodeEditor

// // src/components/problems/CodeEditor.js

// import React from 'react'
// import AceEditor from 'react-ace'
// import 'ace-builds/src-noconflict/theme-monokai'
// import 'ace-builds/src-noconflict/mode-python'
// import 'ace-builds/src-noconflict/ext-language_tools'
// import { executeCode } from '../../api'

// const CodeEditor = ({ code, setCode, setOutput }) => {
//   const handleRunCode = async () => {
//     try {
//       const result = await executeCode(code)
//       setOutput(result.stdout || result.stderr || 'No output')
//     } catch (error) {
//       setOutput('Error executing code')
//     }
//   }

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//       <AceEditor
//         mode="python"
//         theme="monokai"
//         name="codeEditor"
//         onChange={(newCode) => setCode(newCode)}
//         fontSize={14}
//         lineHeight={19}
//         showPrintMargin={false}
//         showGutter={true}
//         highlightActiveLine={true}
//         value={code}
//         editorProps={{ $blockScrolling: true }}
//         setOptions={{
//           enableBasicAutocompletion: true,
//           enableLiveAutocompletion: true,
//           showLineNumbers: true,
//           tabSize: 2,
//         }}
//         width="100%"
//         height="calc(100% - 40px)"
//       />
//       <button
//         onClick={handleRunCode}
//         style={{
//           marginTop: '10px',
//           padding: '10px',
//           backgroundColor: '#4CAF50',
//           color: 'white',
//           border: 'none',
//           cursor: 'pointer',
//         }}
//       >
//         Run Code
//       </button>
//     </div>
//   )
// }

// export default CodeEditor

// src/components/problems/CodeEditor.js

import React from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/ext-language_tools'
import { executeCode } from '../../api'
import styled from 'styled-components'

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const StyledAceEditor = styled(AceEditor)`
  flex: 1;
  width: 100% !important;
`

const RunButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
`

const CodeEditor = ({ code, setCode, setOutput }) => {
  const handleRunCode = async () => {
    try {
      const result = await executeCode(code)
      setOutput(result.stdout || result.stderr || 'No output')
    } catch (error) {
      setOutput('Error executing code')
    }
  }

  return (
    <EditorContainer>
      <StyledAceEditor
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
      />
      <RunButton onClick={handleRunCode}>Run Code</RunButton>
    </EditorContainer>
  )
}

export default CodeEditor
