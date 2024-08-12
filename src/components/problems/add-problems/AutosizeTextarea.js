import AutosizeTextarea from 'react-autosize-textarea'

const AutoSizeTextField = ({ value, onChange, ...props }) => (
  <AutosizeTextarea value={value} onChange={onChange} {...props} />
)

export default AutoSizeTextField
