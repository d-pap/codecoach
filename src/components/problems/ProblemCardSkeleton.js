import { Box, Skeleton, Stack } from '@mui/material'

const ProblemCardSkeleton = () => (
  <Box sx={{ flexGrow: 1 }}>
    {/* top pagination skeleton */}
    {/* <Box sx={{ display: 'flex', justifyContent: 'right' }}>
      <Skeleton variant="text" width={150} sx={{ fontSize: '2rem' }} />
    </Box> */}
    {/* problems list skeleton */}
    <Stack spacing={2}>
      {[...Array(5)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          height={120}
          sx={{ borderRadius: (theme) => theme.spacing(2) }}
        />
      ))}
    </Stack>
  </Box>
)

export default ProblemCardSkeleton
