'use client'

import React, { useEffect, useRef, useState } from 'react'
import { LatLong } from '../../types'
import { useJsApiLoader } from '@react-google-maps/api'
import { Library } from '@googlemaps/js-api-loader'
import { Input, CircularProgress } from "@nextui-org/react"
import ReactDOMServer from 'react-dom/server' 

const libs: Library[] = ["core", "maps", "places", "marker"]

interface PetIdentification {
    petName: string
    ownerName: string
    locality: string
    age?: number
    breed?: string
    contactInfo?: string
}
const buildMapInfoCardContent = (info: PetIdentification): string => {
    const content = (
        <div className="border border-gray-300 p-4 rounded-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg flex items-start space-x-4">
            <div className="w-16 h-14 flex-shrink-0">
                <img
                    className="w-14 h-14 rounded-full object-cover mr-4 mt-4" 
                    src="https://petmatchbucketcd.s3.amazonaws.com/1723859299087_166" 
                    alt={info.petName}
                />
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{info.petName}</h3>
                <p><strong>Dueño:</strong> {info.ownerName}</p>
                <p><strong>Localidad:</strong> {info.locality}</p>
                {info.age && <p><strong>Edad:</strong> {info.age} años</p>}
                {info.breed && <p><strong>Raza:</strong> {info.breed}</p>}
                {info.contactInfo && <p><strong>Contacto:</strong> {info.contactInfo}</p>}
            </div>
        </div>
    );

    return ReactDOMServer.renderToString(content);
};


const petInfo = {
    petName: "Ares",
    ownerName: "Rafael Duarte Perez",
    locality: "Querétaro",
    age: 4,
    breed: "Border Collie",
    contactInfo: "442-555-1234"
}

// Asegúrate de desestructurar las props correctamente
function Map({ latlong }: { latlong: LatLong }) {
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null)
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        libraries: libs
    })

    const mapRef = useRef<HTMLDivElement>(null)
    const placeAutoCompleteRef = useRef<HTMLInputElement>(null)
    const [selectedPlace, setSelectedPlace] = useState<string | null>(null)

    useEffect(() => {
        if (isLoaded && latlong.coordinates.length === 2) {
            const mapOptions = {
                center: {
                    lat: latlong.coordinates[0],
                    lng: latlong.coordinates[1]
                },
                zoom: 17,
                mapId: 'MY-MAP-PETMATCH'
            }
            //SETUP the map
            const gMap = new google.maps.Map(mapRef.current as HTMLDivElement, mapOptions)

            //Limit the place bounds
            const ontarioBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng({ lat: 48.4026688, lng: -89.4053302 }), // south west
                new google.maps.LatLng({ lat: 54.3666786, lng: -82.5269667 }), // north west
            )

            //Setup autocomplete
            const gAutoComplete = new google.maps.places.Autocomplete(placeAutoCompleteRef.current as HTMLInputElement, {
                bounds: ontarioBounds,
                fields: ['formatted_address', 'geometry', 'name'],
                componentRestrictions: {
                    country: ['mx']
                }
            })
            setAutoComplete(gAutoComplete)
            setMap(gMap)
        }
    }, [isLoaded, latlong.coordinates])

    useEffect(() => {
        if (autoComplete) {
            autoComplete.addListener('place_changed', () => {
                const place = autoComplete.getPlace()
                setSelectedPlace(place.formatted_address as string)
                const position = place.geometry?.location
                if (position) {
                    //Place a marker
                    setMarker(position, place.name!)
                }
            })
        }
    }, [autoComplete])

    function setMarker(location: google.maps.LatLng, name: string) {
        if (!map) return

        map.setCenter(location)
        const marker = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: location,
            title: "Marker"
        })

        const infoCard = new google.maps.InfoWindow({
            position: location,
            content: buildMapInfoCardContent(petInfo),
            maxWidth: 400
        })

        infoCard.open({
            map: map,
            anchor: marker
        })
    }

    return (
        <div className='flex flex-col space-y-4'>
  <Input type='text' size="sm" label="Address" placeholder='Enter the address' ref={placeAutoCompleteRef} className='my-5'/>
  {isLoaded ? (
    <div 
      style={{ 
        height: '600px', 
        width: '100%', 
        maxWidth: '1300px' 
      }} 
      className='w-full h-[300px] md:h-[500px] lg:h-[600px]'
      ref={mapRef} 
    />
  ) : (
    <div className="flex justify-center items-center h-96">
      <CircularProgress />
    </div>
  )}
</div>

    )    
}

export default Map
