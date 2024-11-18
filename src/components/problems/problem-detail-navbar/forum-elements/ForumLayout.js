import React from 'react'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import { FILTER_OPTIONS } from './ForumFilter'
import CircularProgress from '@mui/material/CircularProgress'

const ForumLayout = ({
  messages,
  newMessage,
  handleLike,
  handleSubmit,
  setNewMessage,
  filter,
  onFilterChange,
  userId,
  isPosting,
}) => {
  return (
    <Box sx={{ maxHeight: '90vh', overflowY: 'auto' }}>
      <Container component={Paper} sx={{ position: 'relative', boxShadow: 0 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Discussions
        </Typography>

        <Box
          sx={{
            top: 0,
            zIndex: 1,
            backgroundColor: 'white',
            p: 1,
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
                disabled={isPosting}
                sx={{ minWidth: 100, minHeight: 25, ml: 2 }}
              >
                {isPosting ? <CircularProgress size={24} /> : 'Post'}
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
                  <MenuItem value={FILTER_OPTIONS.NEWEST} sx={{ fontSize: 14 }}>
                    Newest
                  </MenuItem>
                  <MenuItem value={FILTER_OPTIONS.OLDEST} sx={{ fontSize: 14 }}>
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
                key={msg._id} //! must use _id here
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
                      <Avatar
                        sx={{ width: 24, height: 24, mr: 1 }}
                        //! use Anonymous below until we configure usernames
                      >
                        {msg.username ? msg.username[0] : 'A'}
                        {/* Show the first letter of the username as avatar */}
                      </Avatar>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold', fontSize: 14 }}
                        //! use Anonymous below until we configure usernames
                      >
                        {msg.username || 'Anonymous'}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ fontSize: 14 }}>
                      Likes: {msg.likes}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 1, mb: 1 }}>
                    <Typography variant="body1" sx={{ fontSize: 16 }}>
                      {msg.message}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <Typography variant="caption" sx={{ fontSize: 12, ml: 1 }}>
                      {new Date(msg.timestamp).toLocaleDateString()}
                    </Typography>
                    <IconButton
                      onClick={() => handleLike(msg._id)} //! must use _id here
                      color={
                        msg.likedBy?.includes(userId) ? 'primary' : 'default'
                      }
                    >
                      <ThumbUpIcon />
                    </IconButton>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Box>
  )
}

export default ForumLayout
