import React from 'react'

export type GeneralStatItemProps = {
  title:string;
  value:string;
  idx?:number;
}
const colors:string[] = [
  "#5956E9",
  "#FFCE31",
  "#428BC1",
  "#AF77C2",
  "#8CB14E"
]

const GeneralStatItem = (props: GeneralStatItemProps) => {
  return (
    <div style={{borderColor:colors[props.idx || 0]}} className='border-l-4 pt-3 rounded-r-lg h-20 pl-5 bg-white'>
      <p style={{color:colors[props.idx || 0]}} className='font-semibold text-xs'>{props.title}</p>
      <p className='font-bold mt-2 text-lg'>{props.value}</p>
    </div>
  )
}

export default GeneralStatItem