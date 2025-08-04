import Image from 'next/image'
import React from 'react'

export default function iconcomponanet() {
  return (
    <div>
         <div className="sm:hidden w-full ">
  <Image src="/home/isconsMobile.svg" alt="heroimage" width={1728} height={100} />
</div>

<div className="hidden sm:block w-full ">
  <Image src="/home/iscons.svg" alt="heroimage" width={1728} height={100} />
</div>
    </div>
  )
}
