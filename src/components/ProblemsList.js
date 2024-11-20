import { Box, Stack } from '@mui/material'

const ProblemsList = ({
  children,
  filters,
  filterToolbar,
  pagination,
  topPagination,
  bottomPagination,
}) => (
  <>
    {filters && filterToolbar && (
      <Box sx={{ flexGrow: 1 }}>{filterToolbar}</Box>
    )}
    <Box
      sx={{
        flexGrow: 1,
        padding: (theme) => theme.spacing(2),
        backgroundColor: (theme) => theme.palette.background.default,
        borderRadius: (theme) => theme.spacing(2),
        boxShadow: (theme) => theme.shadows[1],
      }}
    >
      {pagination && topPagination && (
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'right' }}>
          {topPagination}
        </Box>
      )}
      <Stack spacing={2}>{children}</Stack>
      {pagination && bottomPagination && (
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'right' }}>
          {bottomPagination}
        </Box>
      )}
    </Box>
  </>
)

export default ProblemsList
