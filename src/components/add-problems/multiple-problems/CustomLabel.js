import { Typography } from '@mui/material'

const CustomLabel = ({ children, ...props }) => (
  <Typography variant="h6" component="label" {...props}>
    {children}
  </Typography>
)

export default CustomLabel
