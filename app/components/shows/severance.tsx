import { useState } from 'react'

const Divider = () => {
  return <div className='h-3 border-4 border-cyan-500' />
}

const getRandomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandomHexColor = () => {
  return <span className='font-bold'>{`0x${Math.floor(Math.random() * 16777215).toString(16)}`}</span>
}

const Numbers = () => {
  const randomNumbers = Array.from({ length: 100 }, () => getRandomNumberBetween(0, 9))

  return (
    <div className='flex flex-row items-center justify-center gap-2 flex-wrap'>
      {randomNumbers.map((number, index) => (
        <div key={index} className='size-8 flex border-red-500 border items-center justify-center font-bold hover:font-normal hover:text-6xl transition-all duration-300 ease-in-out'>
          {number}
        </div>
      ))}
    </div>
  )
}

const BoxLid = ({ open }: { open: boolean }) => {
  if (!open) {
    return null
  }

  return (
    <div className='absolute top-0 left-0 right-0'>
      <div className='absolute -top-4 left-0 right-0 border-cyan-100 border-2 h-4 bg-slate-950' />
      <div className='absolute -top-9 -skew-x-[136deg] -translate-x-1/2 -left-[22px] rotate-45 border-cyan-100 h-3 w-16 border-l-0 border-4' />
      <div className='absolute -top-9 skew-x-[136deg] translate-x-1/2 -right-[22px] -rotate-45 border-cyan-100 h-3 w-16 border-r-0 border-4' />
    </div>
  )
}

const Bin = ({ number, initialOpen = false }: { number: number; initialOpen?: boolean }) => {
  const [open, setOpen] = useState(initialOpen)
  const completion = getRandomNumberBetween(0, 100)
  return (
    <div className='grid grid-cols-1 grid-rows-2 gap-1 relative'>
      {open ? <BoxLid open={open} /> : null}
      <div className='text-lg border-cyan-500 border-2 flex justify-center items-center'>{String(number).padStart(2, '0')}</div>
      <div
        className='text-lg border-cyan-500 border-2 flex justify-center items-center'
        style={{
          background: `linear-gradient(to right, var(--color-cyan-100) ${completion}%, transparent ${completion}%)`,
        }}
      >
        {completion}%
      </div>
    </div>
  )
}

const Severance = () => {
  return (
    <div className='h-dvh w-full bg-slate-950 text-cyan-500 grid grid-rows-[auto_1fr_auto]'>
      <div className='p-8'>
        <header className='flex items-center justify-between h-16 border-2 border-cyan-500 p-2 max-w-3xl mx-auto'>
          <h1 className='text-2xl font-bold'>Dranesville</h1>
          <div className='flex flex-row items-center gap-2'>
            <p>19% Complete</p>
            <p>Lumenn</p>
          </div>
        </header>
      </div>
      <div className='grid grid-rows-[auto_1fr_auto] gap-2'>
        <Divider />
        <Numbers />
        <Divider />
      </div>
      <div>
        <div className='grid grid-cols-5 grid-rows-1 gap-6 p-2 max-w-3xl mx-auto'>
          <Bin number={1} />
          <Bin number={2} />
          <Bin number={3} initialOpen />
          <Bin number={4} />
          <Bin number={5} />
        </div>
        <div className='w-full flex items-center justify-center gap-2 pb-4'>
          {getRandomHexColor()} : {getRandomHexColor()}
        </div>
      </div>
    </div>
  )
}

export default Severance
