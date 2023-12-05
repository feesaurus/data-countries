'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useState } from 'react';
import * as MainService from '../services/services/MainService';

export default function Home() {
  const [state, setState] = useState<[]>([]);

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

  useEffect(() => {
    getAllData();
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Map position={[51.505, -0.09]} zoom={13} />
    </div>
  )
}
