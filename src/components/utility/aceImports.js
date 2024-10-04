// dynamic imports for ace editor themes and modes
export const loadTheme = async (theme) => {
  switch (theme) {
    case 'github':
      await import('ace-builds/src-noconflict/theme-github')
      break
    case 'solarized_dark':
      await import('ace-builds/src-noconflict/theme-solarized_dark')
      break
    case 'dracula':
      await import('ace-builds/src-noconflict/theme-dracula')
      break
    case 'one_dark':
      await import('ace-builds/src-noconflict/theme-one_dark')
      break
    case 'terminal':
      await import('ace-builds/src-noconflict/theme-terminal')
      break
    case 'xcode':
      await import('ace-builds/src-noconflict/theme-xcode')
      break
    default:
      // handle default or unknown themes?
      break
  }
}

//TODO: implement more languages when we add them
export const loadMode = async (mode) => {
  switch (mode) {
    case 'javascript':
      await import('ace-builds/src-noconflict/mode-javascript')
      break
    case 'java':
      await import('ace-builds/src-noconflict/mode-java')
      break
    default:
      // handle default or unknown modes?
      break
  }
}
