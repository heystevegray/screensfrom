import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { shows } from '@/lib/shows'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Container from '@/components/container'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const router = useRouter()
  const state = Route.useLoaderData()

  return (
    <Container main>
      <div className='flex md:flex-row gap-4 flex-wrap flex-col flex-grow'>
        {shows.map((show) => (
          <Link to='/shows/$showId' params={{ showId: show.id }} key={show.id} className='hover w-full md:w-64'>
            <Card className='pt-0 overflow-hidden'>
              <CardContent className='relative h-32 overflow-hidden'>{typeof show.image === 'string' ? <img src={show.image} alt={show.name} className='absolute top-0 left-0 object-cover size-full' /> : show.image}</CardContent>
              <CardHeader>
                <CardTitle>{show.name}</CardTitle>
                <CardDescription>{show.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  )
}
