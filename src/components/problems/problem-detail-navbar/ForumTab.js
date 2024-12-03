import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import {
  getCurrentUserId,
  getComments,
  postComment,
  likeComment,
} from '../../../api'
import ForumLayout from './forum-elements/ForumLayout'
import { FILTER_OPTIONS } from './forum-elements/ForumFilter'
import CenteredCircleLoader from '../../utility/CenteredLoader'

const ForumTab = () => {
  const problemId = window.location.pathname.split('/').pop().trim()
  const [newMessage, setNewMessage] = useState('')
  const [filter, setFilter] = useState(FILTER_OPTIONS.MOST_LIKED)
  const queryClient = useQueryClient()

  // Get current user
  const { data: userId, isLoading: isUserLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUserId,
  })

  // Get comments
  const { data: messages = [], isLoading: isCommentsLoading } = useQuery({
    queryKey: ['comments', problemId],
    queryFn: () => getComments(problemId),
    enabled: !!problemId,
  })

  // Post comment mutation
  const postCommentMutation = useMutation({
    mutationFn: ({ problemId, userId, message }) =>
      postComment(problemId, userId, message),
    onSuccess: (response) => {
      queryClient.setQueryData(['comments', problemId], (old) => [
        ...old,
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
    },
  })

  // Like comment mutation
  const likeCommentMutation = useMutation({
    mutationFn: ({ problemId, messageId, userId }) =>
      likeComment(problemId, messageId, userId),
    onMutate: async ({ messageId }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries(['comments', problemId])

      // Get current comments
      const previousComments = queryClient.getQueryData(['comments', problemId])

      // Optimistic update
      queryClient.setQueryData(['comments', problemId], (old) =>
        old.map((msg) => {
          if (msg._id === messageId) {
            const hasLiked = msg.likedBy.includes(userId)
            return {
              ...msg,
              likes: hasLiked ? msg.likes - 1 : msg.likes + 1,
              likedBy: hasLiked
                ? msg.likedBy.filter((id) => id !== userId)
                : [...msg.likedBy, userId],
            }
          }
          return msg
        })
      )

      // Return previous comments for rollback
      return { previousComments }
    },
    onError: (err, variables, context) => {
      // On error, roll back to the previous state
      queryClient.setQueryData(
        ['comments', problemId],
        context.previousComments
      )
    },
    onSettled: () => {
      // Always refetch after error or success to ensure consistency
      queryClient.invalidateQueries(['comments', problemId])
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      postCommentMutation.mutate({ problemId, userId, message: newMessage })
    }
  }

  const handleLike = async (messageId) => {
    likeCommentMutation.mutate({ problemId, messageId, userId })
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

  // Determine if any loading is happening
  const isLoading =
    isUserLoading ||
    isCommentsLoading ||
    postCommentMutation.isLoading ||
    likeCommentMutation.isLoading

  return (
    <>
      {isLoading ? (
        <CenteredCircleLoader />
      ) : (
        <ForumLayout
          messages={getFilteredMessages()}
          newMessage={newMessage}
          handleLike={handleLike}
          handleSubmit={handleSubmit}
          setNewMessage={setNewMessage}
          filter={filter}
          onFilterChange={handleFilterChange}
          userId={userId}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default ForumTab
