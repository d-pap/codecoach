import React, { useState, useEffect } from 'react'
import {
  getCurrentUserId,
  postForumComment,
  likeForumComment,
} from '../../../api'
import ForumLayout from './forum-elements/ForumLayout'
import { FILTER_OPTIONS } from './forum-elements/ForumFilter'

const ForumTab = () => {
  const problemId = window.location.pathname.split('/').pop()
  const [userId, setUserId] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [filter, setFilter] = useState(FILTER_OPTIONS.MOST_LIKED)

  useEffect(() => {
    const loadUserIdAndMessages = async () => {
      try {
        const currentUserId = await getCurrentUserId()
        setUserId(currentUserId)

        // ------------------- Comment out this block -------------------
        // const messages = await fetchForumComments(problemId);

        const messages = [
          {
            id: 1,
            userId: 1,
            username: 'John Doe',
            message: 'First message lorem ipsum dolor sit amet',
            likes: 5,
            likedBy: [1, 2],
            timestamp: new Date('2023-10-01'),
          },
          {
            id: 2,
            userId: 2,
            username: 'Alice Smith',
            message:
              'Second message lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
            likes: 2,
            likedBy: [3],
            timestamp: new Date('2023-10-02'),
          },
          {
            id: 3,
            userId: 3,
            username: 'Bob Brown',
            message:
              'Third message lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
            likes: 8,
            likedBy: [1, 2, 3],
            timestamp: new Date('2023-10-03'),
          },
        ]

        setMessages(messages)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    loadUserIdAndMessages()
  }, [problemId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      try {
        const response = await postForumComment(problemId, userId, newMessage)
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            ...response,
            message: newMessage,
            userId,
            likes: 0,
            likedBy: [],
            timestamp: new Date(),
          },
        ])
        setNewMessage('')
      } catch (error) {
        console.error('Error posting message:', error)
      }
    }
  }

  const handleLike = async (messageId) => {
    try {
      // Optimistically update the frontend state
      setMessages((prevMessages) =>
        prevMessages.map((msg) => {
          if (msg.id === messageId || msg._id === messageId) {
            if (msg.likedBy.includes(userId)) {
              // User has already liked the message; do not allow unliking
              return msg
            }
            return {
              ...msg,
              likes: msg.likes + 1,
              likedBy: [...msg.likedBy, userId],
            }
          }
          return msg
        })
      )

      // Call the API to like the comment
      await likeForumComment(messageId, userId)
    } catch (error) {
      console.error('Error liking message:', error)
      // Optionally, revert the optimistic update if API call fails
      setMessages((prevMessages) =>
        prevMessages.map((msg) => {
          if (msg.id === messageId || msg._id === messageId) {
            return {
              ...msg,
              likes: msg.likes - 1,
              likedBy: msg.likedBy.filter((id) => id !== userId),
            }
          }
          return msg
        })
      )
      alert(error) // Show error message to the user
    }
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  const getFilteredMessages = () => {
    switch (filter) {
      case FILTER_OPTIONS.NEWEST:
        return [...messages].sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        )
      case FILTER_OPTIONS.OLDEST:
        return [...messages].sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        )
      case FILTER_OPTIONS.MOST_LIKED:
        return [...messages].sort((a, b) => b.likes - a.likes)
      case FILTER_OPTIONS.LEAST_LIKED:
        return [...messages].sort((a, b) => a.likes - b.likes)
      default:
        return messages
    }
  }

  return (
    <ForumLayout
      messages={getFilteredMessages()}
      newMessage={newMessage}
      handleLike={handleLike}
      handleSubmit={handleSubmit}
      setNewMessage={setNewMessage}
      filter={filter}
      onFilterChange={handleFilterChange}
      userId={userId}
    />
  )
}

export default ForumTab
