import { PropsWithChildren, useRef, useState } from 'react'
import { Icons } from '../icons'
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

const Divider = () => {
  return <div className='h-3 border-2 border-cyan-500' />
}

const getRandomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandomHexColor = () => {
  return <span className='font-bold'>{`0x${Math.floor(Math.random() * 16777215).toString(16)}`}</span>
}

const Numbers = () => {
  const randomNumbers = Array.from({ length: 1000 }, () => getRandomNumberBetween(0, 9))

  return (
    <div className='flex flex-row items-center justify-center gap-2 flex-wrap overflow-y-scroll'>
      {randomNumbers.map((number, index) => (
        <div key={index} className='size-8 flex items-center justify-center font-bold hover:font-normal hover:text-6xl transition-all duration-300 ease-in-out'>
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
    <div className='grid grid-cols-1 grid-rows-2 gap-1 relative md:text-lg'>
      {open ? <BoxLid open={open} /> : null}
      <div className='border-cyan-500 border-2 flex justify-center items-center'>{String(number).padStart(2, '0')}</div>
      <div
        className='border-cyan-500 border-2 flex justify-center items-center'
        style={{
          background: `linear-gradient(to right, var(--color-cyan-100) ${completion}%, transparent ${completion}%)`,
        }}
      >
        {completion}%
      </div>
    </div>
  )
}

function DraggableItem({ id, children }: { id: string } & PropsWithChildren) {
  const { attributes, listeners, setNodeRef, isDragging, transform } = useDraggable({
    id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={`p-2 rounded cursor-grab ${isDragging ? 'opacity-50' : 'bg-blue-500 text-white'}`}>
      {children}
    </div>
  )
}

function DropBucket({ bucket, onDrop }: { bucket: string[]; onDrop: (id: string) => void }) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'bucket',
  })

  return (
    <div ref={setNodeRef} className={`p-4 rounded w-64 min-h-32 ${isOver ? 'bg-green-300' : 'bg-gray-200'}`}>
      <h2 className='font-bold mb-2'>Bucket</h2>
      {bucket.length === 0 ? (
        <p className='text-gray-500'>Drop items here</p>
      ) : (
        bucket.map((item) => (
          <div key={item} className='p-2 bg-green-500 text-white rounded mb-2'>
            {item}
          </div>
        ))
      )}
    </div>
  )
}

const Severance = () => {
  const [bucket, setBucket] = useState<string[]>([])

  const handleDragEnd = (event: any) => {
    const { over, active } = event
    if (over?.id === 'bucket' && !bucket.includes(active.id)) {
      setBucket((prev) => [...prev, active.id])
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='flex gap-8 p-4'>
        <div className='space-y-2'>
          <h2 className='font-bold'>Items</h2>
          {/* <Numbers /> */}
          {Array.from({ length: 3 }, (_, index) => (
            <DraggableItem key={index} id={index.toString()}>
              <div className='p-2 bg-blue-500 text-white rounded'>Item {index}</div>
            </DraggableItem>
          ))}

          <DropBucket bucket={bucket} onDrop={(id) => setBucket((prev) => [...prev, id])} />
        </div>
      </div>
    </DndContext>
  )

  return (
    <div className='h-svh w-full bg-slate-950 text-cyan-500 flex flex-col'>
      <div className='md:p-8 p-2'>
        <div className='flex items-center justify-between h-[52px] border-2 border-cyan-500 p-2 md:pr-0 max-w-3xl mx-auto'>
          <h1 className='text-2xl font-bold'>Dranesville</h1>
          <div className='order-2 md:order-1 flex md:justify-end justify-center md:flex-1 items-center'>
            <p className='text-sm md:text-base md:mr-4'>
              19% <span className='hidden: md:inline-flex'>Complete</span>
            </p>
          </div>
          <Icons.lumonBackground className='size-24 md:size-48 order-1 md:order-2' backgroundClassName='fill-slate-950' foregroundClassName='fill-cyan-500' />
        </div>
      </div>
      <div className='flex flex-col gap-2 md:max-h-[73%] max-h-[70%] flex-1'>
        <Divider />
        <Numbers />
        <Divider />
      </div>
      <div className='flex flex-col gap-2 w-full justify-center mx-auto max-w-3xl'>
        <div className='grid grid-cols-5 grid-rows-1 gap-6 p-2 max-w-3xl'>
          <Bin number={1} />
          <Bin number={2} />
          <Bin number={3} initialOpen />
          <Bin number={4} />
          <Bin number={5} />
        </div>
        <div className='w-full flex items-center justify-center gap-2'>
          {getRandomHexColor()} : {getRandomHexColor()}
        </div>
      </div>
    </div>
  )
}

export default Severance
