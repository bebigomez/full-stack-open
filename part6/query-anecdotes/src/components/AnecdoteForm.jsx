import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: 'Anecdote must be at least 5 characters long',
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAN_NOTIFICATION' })
      }, 3000)
    },
    retry: false
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({
      type: 'SHOW_NOTIFICATION',
      payload: `Note '${content}' succesfully created`,
    })
    setTimeout(() => {
      dispatch({ type: 'CLEAN_NOTIFICATION' })
    }, 3000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
