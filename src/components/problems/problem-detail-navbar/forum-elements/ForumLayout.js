import React from 'react'
import {
  Container,
  List,
  ListItem,
  Typography,
  IconButton,
  Box,
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Avatar,
  Stack,
} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import NavbarStack from '../NavbarStack'
import { FILTER_OPTIONS } from './ForumFilter'

const ForumLayout = ({
  messages,
  newMessage,
  handleLike,
  handleSubmit,
  setNewMessage,
  filter,
  onFilterChange,
  userId,
}) => {
  return (
    <NavbarStack>
      <Box sx={{ maxHeight: '80vh', overflowY: 'auto', p: 2 }}>
        <Container
          component={Paper}
          sx={{ p: 2, mt: 2, borderRadius: 2, position: 'relative' }}
        >
          <Typography variant="h5" gutterBottom>
            Discussions
          </Typography>

          <Box
            sx={{
              top: 0,
              zIndex: 1,
              backgroundColor: 'white',
              p: 1,
              borderBottom: 1,
              borderColor: 'grey.300',
            }}
          >
            <TextField
              label="Share your thoughts"
              variant="outlined"
              fullWidth
              multiline
              minRows={4}
              maxRows={10} // Adjust the max rows as needed
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              sx={{ flexGrow: 1 }}
              InputProps={{ sx: { fontSize: 14 } }}
              InputLabelProps={{ sx: { fontSize: 14 } }}
            />
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mt: 2, width: '100%', justifyContent: 'space-between' }}
            >
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="medium"
                  onClick={handleSubmit}
                  sx={{ minWidth: 100, minHeight: 25, ml: 2 }}
                >
                  Post
                </Button>
              </Box>

              <Box>
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                  <InputLabel id="filter-label" sx={{ fontSize: 14 }}>
                    Filter By
                  </InputLabel>
                  <Select
                    labelId="filter-label"
                    value={filter}
                    onChange={(e) => onFilterChange(e.target.value)}
                    label="Filter By"
                    sx={{ fontSize: 14, minWidth: 125, maxHeight: 50, mr: 2 }}
                  >
                    <MenuItem
                      value={FILTER_OPTIONS.MOST_LIKED}
                      sx={{ fontSize: 14 }}
                    >
                      Most Liked
                    </MenuItem>
                    <MenuItem
                      value={FILTER_OPTIONS.LEAST_LIKED}
                      sx={{ fontSize: 14 }}
                    >
                      Least Liked
                    </MenuItem>
                    <MenuItem
                      value={FILTER_OPTIONS.NEWEST}
                      sx={{ fontSize: 14 }}
                    >
                      Newest
                    </MenuItem>
                    <MenuItem
                      value={FILTER_OPTIONS.OLDEST}
                      sx={{ fontSize: 14 }}
                    >
                      Oldest
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ mt: 2 }}>
            <List>
              {messages.map((msg, idx) => (
                <ListItem
                  key={idx}
                  sx={{
                    mb: 1,
                    backgroundColor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 1,
                    padding: 2,
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                          {msg.username[0]}{' '}
                          {/* Show the first letter of the username as avatar */}
                        </Avatar>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 'bold', fontSize: 14 }}
                        >
                          {msg.username}{' '}
                        </Typography>
                      </Box>
                      <Typography variant="subtitle2" sx={{ fontSize: 14 }}>
                        Likes: {msg.likes}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 1, mb: 1 }}>
                      <Typography variant="body2" sx={{ fontSize: 16 }}>
                        {msg.message}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',
                      }}
                    >
                      <IconButton
                        edge="end"
                        onClick={() => handleLike(msg.id)}
                        size="small"
                      >
                        {msg.likedBy.includes(userId) ? (
                          <ThumbUpIcon fontSize="small" />
                        ) : (
                          <ThumbUpAltOutlinedIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        </Container>
      </Box>
    </NavbarStack>
  )
}

export default ForumLayout