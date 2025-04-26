import Severance from '@/components/shows/severance'
import { ReactNode } from '@tanstack/react-router'
import { JSX, ReactElement } from 'react'

type Show = {
  id: string
  name: string
  description: string
  image: string
  imdbURL: string
  ui: JSX.Element
}

export const shows: Show[] = [
  {
    id: '1',
    name: 'Severance',
    description: '"Scary Numbers" Interface',
    image: 'https://m.media-amazon.com/images/M/MV5BMDljNDZiMDAtY2FiZi00MGE5LWJjZWQtNzRkNTJlYjFlM2U1XkEyXkFqcGc@._V1_FMjpg_UX2160_.jpg',
    imdbURL: 'https://www.imdb.com/title/tt11280740/?ref_=ext_shr_lnk',
    ui: <Severance />,
  },
]
