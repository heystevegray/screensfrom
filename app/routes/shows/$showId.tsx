import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { shows } from '../../lib/shows'

export const Route = createFileRoute('/shows/$showId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const show = shows.find((show) => show.id === params.showId)
    if (!show) {
      throw notFound()
    }

    return show
  },
})

function RouteComponent() {
  const show = Route.useLoaderData()
  return <div>{show.name}</div>
}
