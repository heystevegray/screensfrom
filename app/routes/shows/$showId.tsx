import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { shows } from '../../lib/shows'
import Container from '@/components/container'

export const Route = createFileRoute('/shows/$showId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    if (!params.showId) {
      throw notFound()
    }

    const show = shows.find((show) => show.id === params.showId)

    if (!show?.ui) {
      throw notFound()
    }

    return params.showId
  },
  notFoundComponent: () => {
    return (
      <Container>
        <h1 className='text-2xl font-bold'>Show not found</h1>
        <Link to='/shows' className='mt-4 text-blue-500 hover:underline'>
          Go back to shows
        </Link>
      </Container>
    )
  },
})

function RouteComponent() {
  const showId = Route.useLoaderData()
  const show = shows.find((show) => show.id === showId)

  if (!show) {
    return <p>Show not found</p>
  }

  return show?.ui
}
