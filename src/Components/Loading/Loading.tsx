import React from 'react'
import { Image, Spinner } from '@nextui-org/react'

export default function Loading() {
  return (
    <>
      <div className="flex flex-col align-middle gap-4">
        <Image
          src='ZORRO_SIN1.webp'
        />
        <Spinner color="danger" size='lg'/>
      </div>
    </>
  )
}
