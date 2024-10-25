// dynamic imports for ace editor themes and modes
export const loadTheme = async (theme) => {
  switch (theme) {
    case 'github':
      return import('ace-builds/src-noconflict/theme-github')
    case 'solarized_dark':
      return import('ace-builds/src-noconflict/theme-solarized_dark')
    case 'dracula':
      return import('ace-builds/src-noconflict/theme-dracula')
    case 'one_dark':
      return import('ace-builds/src-noconflict/theme-one_dark')
    case 'terminal':
      return import('ace-builds/src-noconflict/theme-terminal')
    case 'xcode':
      return import('ace-builds/src-noconflict/theme-xcode')
    default:
      console.warn(`Unknown theme: ${theme}. Falling back to default theme.`)
      return import('ace-builds/src-noconflict/theme-monokai') // or any default theme you prefer
  }
}

// TODO: implement more languages when we add them
export const loadMode = async (language) => {
  switch (language) {
    case 'python':
      return import('ace-builds/src-noconflict/mode-python')
    case 'java':
      return import('ace-builds/src-noconflict/mode-java')
    case 'c':
      return import('ace-builds/src-noconflict/mode-c_cpp')
    case 'cpp':
      return import('ace-builds/src-noconflict/mode-c_cpp')
    // Add more cases for other languages as needed
    default:
      console.warn(
        `Unsupported language: ${language}. Falling back to plain text mode.`
      )
      return import('ace-builds/src-noconflict/mode-text') // or any default mode you prefer
  }
}
