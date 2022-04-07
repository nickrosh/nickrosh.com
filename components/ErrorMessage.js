import { Box } from './Box'

export default function ErrorMessage({ code }) {
  let title = '500'
  let description = "Something isn't right."

  if (code === 404) {
    title = '404'
    description = "This page doesn't exist."
  }

  return (
    <Box css={{ textAlign: 'center' }}>
      <h1>{title}</h1>
      <p>{description}</p>
    </Box>
  )
}
