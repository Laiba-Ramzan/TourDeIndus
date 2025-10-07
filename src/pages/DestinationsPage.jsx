import React from 'react'
import { Destinations } from '../components'
 import { DestinationsVideos } from '../components'
function DestinationsPage() {
  return (
    <div className='min-h-screen bg-gray-100 py-10'>
     <Destinations/>
     <DestinationsVideos/>
    </div>
  )
}

export default DestinationsPage
