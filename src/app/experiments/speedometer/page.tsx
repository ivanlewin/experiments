"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge } from "lucide-react";

export default function Speedometer() {
  const [speed, setSpeed] = useState < number | null > (null);
  const [error, setError] = useState < string | null > (null);

  useEffect(() => {
    let watchId: number;

    const successCallback = (position: GeolocationPosition) => {
      if (position.coords.speed !== null) {
        // Convert m/s to km/h
        const speedKmh = position.coords.speed * 3.6;
        setSpeed(Math.round(speedKmh * 10) / 10); // Round to 1 decimal place
      } else {
        setSpeed(null);
      }
      setError(null);
    };

    const errorCallback = (error: GeolocationPositionError) => {
      setError(`Error: ${error.message}`);
      setSpeed(null);
    };

    if ('geolocation' in navigator) {
      watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, {
        enableHighAccuracy: true,
        maximumAge: 0
      });
    } else {
      setError('Geolocation is not supported by your browser');
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Speedometer</CardTitle>
          <Gauge className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : speed !== null ? (
            <div className="text-center">
              <p className="text-5xl font-bold">{speed}</p>
              <p className="text-xl text-muted-foreground">km/h</p>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Calculating speed...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}