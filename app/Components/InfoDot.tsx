import React from 'react'
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '../../components/ui/tooltip'
import { cn } from '@/lib/utils'
import { TooltipArrow } from '@radix-ui/react-tooltip'

type Props = {
  classNames: string;
  message: string;
  side: "left" | "right" | "top" | "bottom"
}

const InfoDot = ({classNames, message, side}: Props) => {
  return (
    <div 
  className={cn(
    "absolute rounded-full z-30 flex items-center justify-center group", // Add `group` here
    classNames
  )}
>
  <div 
    className="absolute w-8 h-8 bg-sky-500/50 rounded-full duration-1000 
               group-hover:animate-ping" // Trigger animation on hover of the group
  ></div>
  <div className="z-10 h-4 w-4 flex items-center justify-center">
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger 
          className="rounded-full w-4 h-4 bg-sky-500 shadow
                     group-hover:scale-150 transition-transform duration-500" // Add scaling effect
        ></TooltipTrigger>
        <TooltipContent side={side} data-side={side}>
          {message}
          <TooltipArrow className='fill-sky-800' />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</div>
  )
}

export default InfoDot