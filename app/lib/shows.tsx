import { Icons } from '@/components/icons'
import Severance from '@/components/shows/severance'
import { ReactNode } from '@tanstack/react-router'
import { JSX, ReactElement } from 'react'

type Show = {
  id: string
  name: string
  description: string
  image: string | ReactElement
  imdbURL: string
  ui: JSX.Element
}

export const shows: Show[] = [
  {
    id: '1',
    name: 'Severance',
    description: '"Scary Numbers" Interface',
    image: <Icons.lumonBackground />,
    imdbURL: 'https://www.imdb.com/title/tt11280740/?ref_=ext_shr_lnk',
    ui: <Severance />,
  },
]
