import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Props = {
  ltr?: boolean;
}

const RTLSection = ({ltr}: Props) => {
  return (
    <div id="cta" className="pb-0 py-16 max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="">
        <div className={cn(
          "items-center gap-x-12 lg:flex",
          {"flex-row-reverse": ltr}
        )}>
          <div className="flex-1 sm:hidden lg:block">
            <Image width={400} height={300} src={'https://plus.unsplash.com/premium_photo-1661628984416-946603207cfc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} className="rounded-lg w-full" alt="Create Successful Business Models with Our IT Solutions" />
          </div>
          <div className="max-w-xl mt-6 md:mt-0 lg:max-w-2xl">
            <h2 className="text-black text-3xl font-semibold sm:text-4xl">
                Create Successful Business Models with Our IT Solutions
            </h2>
            <p className="mt-3 text-slate-600 mb-4">Blinder, a software development company, helps to digitize businesses by focusing on client’s business challenges, needs. We value close transparent cooperation and encourage our clients to participate actively in the project development life cycle.</p>
            <Button>Get started</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RTLSection