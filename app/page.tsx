'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useState } from 'react';
import * as MainService from '../services/services/MainService';
import Header from '../components/header/Header';

export default function Home() {
  const [state, setState] = useState<[]>([]);
  const [country, setCountry] = useState<[]>([])

  const getAllData = async () => {
    const data = await MainService.getAllData();
    setState(data)
  };

  const Map = useMemo(
    () =>
      dynamic(() => import('../components/map/Map'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  const handleDataFromChild = async (data: any) => {
    const res = await MainService.getByName(data)
    if (res.length === 1) {
      setCountry(res[0].latlng)
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Header onDataChange={handleDataFromChild} />
      <Map position={country.length !== 0 ? country : [51.505, -0.09]} zoom={2} />
    </div>
  )
}
