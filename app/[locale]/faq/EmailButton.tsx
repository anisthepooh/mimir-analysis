'use client'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import React from 'react'

const EmailButton = () => {
  return (
    <Button 
    variant={'ghost'} 
    onClick={() => window.location.href = 'mailto:torben.breindahl@rn.dk'}
    className='font-semibold'
  >
    <Mail className='text-muted-foreground' />
    torben.breindahl@rn.dk
  </Button>
  )
}

export default EmailButton