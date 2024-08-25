'use client'

import React from 'react'
import Map from '../../../../libs/map'
import { LatLong } from '../../../../../types'

const Maps = () => {
  const latlong: LatLong = {
    type: 'Point',
    coordinates: [20.5888, -100.3899] // Centro de Querétaro
  }

  return (
    <div className="mb-5">
        <div className="mb-5 w-full">
            <header className="flex flex-row w-full items-center justify-between">
                <h1 className="text-4xl font-bold">Seguimiento de la mascota</h1>
            </header>
        </div>
        <Map latlong={latlong} />
    </div>
  )
}

export default Maps
