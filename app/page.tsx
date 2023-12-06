'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useState } from 'react';
import Header from '../components/header/Header';
import Context from '../components/content/Content';

export default function Home() {
  const [position, setPosition] = useState<[]>([])
  const [countryName, setCountryName] = useState<string>("")
  const [zoom, setZoom] = useState<any | number>(null)
  const [openInfo, setOpenInfo] = useState<boolean>(false)
  const [fullData, setFullData] = useState<any>({})

  const Map = useMemo(
    () =>
      dynamic(() => import('../components/map/Map'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  const handleDataFromChild = async (data: any) => {
    setCountryName(data.name)
    setPosition(data.position)
    setZoom(data.zoom)
    setOpenInfo(data.open)
    setFullData(data.dataFull)
  }

  const handleDataFromChildMap = (data: any) => {
    setOpenInfo(data)
  }

  const closeInfoModal = (data: any) => {
    setOpenInfo(data)
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Header onDataChange={handleDataFromChild} />
      <Map
        position={position.length !== 0 ? position : [51.505, -0.09]}
        marker={position.length !== 0 ? position : []}
        zoom={zoom ? zoom : 2}
        onDataChange={handleDataFromChildMap}
      />
      <Context
        name={countryName}
        isOpen={openInfo}
        isClose={closeInfoModal}
        data={fullData} 
      />
    </div>
  )
}
