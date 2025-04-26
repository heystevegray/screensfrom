import { createFileRoute, Link } from '@tanstack/react-router'
import { shows } from '../../lib/shows'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/shows/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex md:flex-row gap-4 flex-wrap flex-col items-center justify-center'>
      {shows.map((show) => (
        <Link to='/shows/$showId' params={{ showId: show.id }} key={show.id} className='hover w-full md:w-64'>
          <Card>
            <CardContent className='relative h-32 md:h-64 overflow-hidden'>
              <div className='w-full h-full'>
                <img src={show.image} alt={show.name} className='absolute top-0 left-0 object-cover size-full' />
              </div>
            </CardContent>
            <CardHeader>
              <CardTitle>{show.name}</CardTitle>
              <CardDescription>{show.description}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
