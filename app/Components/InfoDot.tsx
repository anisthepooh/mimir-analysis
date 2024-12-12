import React, { useEffect, useState } from 'react'
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '../../components/ui/tooltip'
import { cn } from '@/lib/utils'
import { TooltipArrow } from '@radix-ui/react-tooltip'
import { Progress } from '@/components/ui/progress'
import { useUtilitiesStore } from '../_store'

type Props = {
  classNames: string;
  message: string;
  side: "left" | "right" | "top" | "bottom";
  idx: number;
  animate: number;
  progress: number;
  setAnimate: any;
}

const InfoDot = ({classNames, message, side, idx, animate, progress, setAnimate}: Props) => {
  const {shouldAnimate} = useUtilitiesStore()
  const animating = animate === idx

  return (
    <div 
  className={cn(
    "absolute rounded-full z-30 flex items-center justify-center group", 
    classNames
  )}
>
  <div 
    className={cn(
      "absolute w-8 h-8 bg-sky-500/50 rounded-full duration-1000 group-hover:animate-ping",
      {"animate-ping": animating && shouldAnimate}
    )}
  ></div>
  <div className="z-10 h-4 w-4 flex items-center justify-center">
    <TooltipProvider>
      <Tooltip delayDuration={100} open={animating}>
        <TooltipTrigger 
          className={cn(
            "rounded-full w-4 h-4 bg-sky-500 shadow group-hover:scale-150 transition-transform duration-500",
            {"scale-150": animating && shouldAnimate} 
          )}
          onClick={() => setAnimate(idx)}
        ></TooltipTrigger>
        <TooltipContent side={side} data-side={side} className={cn(
          'flex flex-col relative min-h-12 justify-center',
          {'hidden': !shouldAnimate}
          )}>
          {(animating && shouldAnimate) && <Progress value={progress} max={100} className="w-full bg-white absolute top-0 right-0 rounded-none h-1 "></Progress>}
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