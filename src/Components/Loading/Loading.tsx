import React from 'react'
import { Image, Spinner } from '@nextui-org/react'

interface LoadingProps {
  enabled?: boolean
  fixed?: boolean
}

export default function Loading({enabled, fixed}: LoadingProps) {
  return (
    <div 
    style={{display: enabled === false ? 'none' : 'inline'}}
    className={`${fixed ? 'loading-fixed' : ''}`}
    >
      <div className="flex flex-col align-middle gap-4 items-center">
        <Image
          src='/ZORRO_SIN1.webp'

        />
        <Spinner color="danger" size='lg'/>
      </div>
    </div>
  )
}
