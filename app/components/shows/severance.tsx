import { Dispatch, PropsWithChildren, SetStateAction, useEffect, useRef, useState } from 'react'
import { Icons } from '../icons'
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

const Divider = () => {
  return <div className='h-3 border-2 border-x-0 border-cyan-500 w-full' />
}

const getRandomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandomHexColor = () => {
  return <span className='font-bold'>{`0x${Math.floor(Math.random() * 16777215).toString(16)}`}</span>
}

const Numbers = ({ numbers, centerPoint, isDragging, setIsDragging }: { numbers: (number | string)[]; centerPoint: number; isDragging: boolean; setIsDragging: Dispatch<SetStateAction<Boolean>> }) => {
  return (
    <div
      className={cn('flex flex-row items-center justify-center gap-2 flex-wrap overflow-scroll', {
        'bg-red-700 z-40': isDragging,
      })}
    >
      {numbers.map((number, index) => {
        return (
          <DraggableNumber key={index} id={index} centerPoint={centerPoint} setIsDragging={setIsDragging}>
            {number}
          </DraggableNumber>
        )
      })}
    </div>
  )
}

const BoxLid = ({ open }: { open: boolean }) => {
  if (!open) {
    return null
  }

  return (
    <div className='absolute top-0 left-0 right-0 z-0'>
      <div className='absolute -top-4 left-0 right-0 border-cyan-100 border-2 h-4 bg-slate-950' />
      <div className='absolute -top-9 -skew-x-[136deg] -translate-x-1/2 -left-[22px] rotate-45 border-cyan-100 h-3 w-16 border-l-0 border-4' />
      <div className='absolute -top-9 skew-x-[136deg] translate-x-1/2 -right-[22px] -rotate-45 border-cyan-100 h-3 w-16 border-r-0 border-4' />
    </div>
  )
}

const Bin = ({ number, open }: { number: number; open?: boolean }) => {
  const completionRef = useRef<number>(getRandomNumberBetween(0, 100))
  return (
    <div className='grid grid-cols-1 grid-rows-2 gap-1 relative md:text-lg'>
      {open ? <BoxLid open={open} /> : null}
      <div className='border-cyan-500 border-2 flex justify-center items-center'>{String(number).padStart(2, '0')}</div>
      <div
        className='border-cyan-500 border-2 flex justify-center items-center'
        style={{
          background: `linear-gradient(to right, var(--color-cyan-100) ${completionRef.current}%, transparent ${completionRef.current}%)`,
        }}
      >
        {completionRef.current}%
      </div>
    </div>
  )
}

const DraggableNumber = ({ id, centerPoint, children, setIsDragging }: { id: number; centerPoint: number; setIsDragging: Dispatch<SetStateAction<Boolean>> } & PropsWithChildren) => {
  const isCenter = id === centerPoint
  const isSurrounding = id === centerPoint - 1 || id === centerPoint + 1

  const sharedDraggableId = isCenter || isSurrounding ? centerPoint : id
  const { attributes, listeners, setNodeRef, isDragging, transform } = useDraggable({
    id: sharedDraggableId,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  useEffect(() => {
    console.log(`isDragging: ${isDragging}`)

    setIsDragging(isDragging)
  }, [isDragging, setIsDragging])

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className='size-12 touch-none'>
      <div
        className={cn('rounded cursor-grab border border-transparent transition-all duration-300 ease-in-out hover:text-6xl z-50 flex items-center justify-center font-bold hover:font-normal text-3xl size-full', {
          'border-border text-6xl': isDragging,
          'text-green-500': isCenter,
          'text-green-800': isSurrounding,
        })}
      >
        {children}
      </div>
    </div>
  )
}

const DroppableBin = ({ id }: { id: number }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  return (
    <div ref={setNodeRef} className='w-full'>
      <Bin number={Number(id)} open={isOver} />
    </div>
  )
}

const shuffleNumbers = (count: number) => {
  return Array.from({ length: count }, () => getRandomNumberBetween(0, 9))
}

const totalNumbers = 1000

const Severance = () => {
  const bins = new Array(5).fill(0).map((_, index) => index + 1)
  const center = useRef(getRandomNumberBetween(0, totalNumbers))
  const centerPoint = center.current
  const numbersRef = useRef<(number | string)[]>(shuffleNumbers(totalNumbers))
  const [numbers, setNumbers] = useState<(number | string)[]>(numbersRef.current)
  const [isDragging, setIsDragging] = useState(false)

  return (
    <DndContext
      onDragEnd={(event) => {
        console.log('Drag ended', event)

        const { active, over } = event
        if (over) {
          console.log(`Dropped ${active.id} over ${over.id}, centerPoint: ${centerPoint}`)
          numbersRef.current = shuffleNumbers(totalNumbers)
          center.current = getRandomNumberBetween(0, totalNumbers)
          setNumbers(numbersRef.current)
        }
      }}
    >
      <div className='h-svh overflow-hidden w-full bg-slate-950 text-cyan-500 flex flex-col relative'>
        <div className='absolute top-0 bg-slate-950 left-0 right-0 z-10 pt-6 flex flex-col gap-12'>
          <div className='md:px-8 pt-6 px-2'>
            <div className='flex items-center justify-between h-[52px] border-2 border-cyan-500 md:pr-0 max-w-6xl w-full p-2 mx-auto'>
              <h1 className='md:text-2xl text-sm font-bold flex-1'>Dranesville</h1>
              <div className='order-2 md:order-1 flex justify-end md:flex-1 items-center flex-1'>
                <p className='text-sm md:text-base md:mr-4'>
                  19% <span className='hidden: md:inline-flex'>Complete</span>
                </p>
              </div>
              <Icons.lumonBackground className='size-24 md:size-48 order-1 md:order-2' backgroundClassName='fill-slate-950' foregroundClassName='fill-cyan-500' />
            </div>
          </div>
          <Divider />
        </div>
        <TransformWrapper smooth disabled={isDragging} disablePadding>
          <TransformComponent>
            <Numbers numbers={numbers} centerPoint={centerPoint} isDragging={isDragging} setIsDragging={setIsDragging} />
          </TransformComponent>
        </TransformWrapper>
        <div className='flex flex-col gap-2 w-full items-center absolute bottom-0 bg-slate-950 left-0 right-0 z-10'>
          <Divider />
          <div className='flex flex-row gap-2 md:gap-6 p-2 max-w-3xl w-full'>
            {bins.map((id) => (
              <DroppableBin id={id} key={id} />
            ))}
          </div>
          <div className='w-full flex items-center justify-center gap-2 pb-6'>
            {getRandomHexColor()} : {getRandomHexColor()}
          </div>
        </div>
      </div>
    </DndContext>
  )
}

export default Severance
