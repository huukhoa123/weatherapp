'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, MapPin } from 'lucide-react';
import { useGeolocation } from '@/hooks/use-geolocation';
import { useWeatherStore } from '@/store/weather-store';
import { CurrentWeather } from './features/current-weather';
import { DynamicBackground } from './features/dynamic-background';
import { ForecastList } from './features/forecast-list';
import { LocationSearch } from './features/location-search';
import { WeatherEffects } from './features/weather-effects';
import { InstallApp } from './features/install-app';

export function WeatherDashboard() {
    const { currentLocation, isLoading, weather, error: weatherStoreError } = useWeatherStore();
    const { getLocation } = useGeolocation();

    useEffect(() => {
        // Only try to locate if no location is stored
        if (!currentLocation) {
            getLocation();
        }
    }, [getLocation, currentLocation]);

    return (
        <main className="min-h-screen flex flex-col items-center p-4 md:p-8 relative overflow-x-hidden text-white">
            <DynamicBackground />
            <WeatherEffects />
            <InstallApp />

            <div className="w-full max-w-md z-50 mt-safe-top">
                <LocationSearch />
            </div>

            <div className="flex-1 w-full max-w-3xl flex flex-col items-center gap-6 mt-8 z-10 pb-safe-bottom">
                <AnimatePresence>
                    {weatherStoreError && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-red-500/20 backdrop-blur-md border border-red-500/30 text-white px-4 py-3 rounded-xl flex items-center gap-2"
                        >
                            <span>⚠️ {weatherStoreError}</span>
                            <button onClick={() => useWeatherStore.setState({ error: null })} className="ml-2 opacity-70 hover:opacity-100">✕</button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {isLoading && !weather ? (
                    <div className="flex flex-col items-center justify-center mt-20 opacity-80">
                        <Loader2 className="w-10 h-10 animate-spin mb-4" />
                        <p>Đang tải dữ liệu...</p>
                    </div>
                ) : !weather ? (
                    <div className="flex flex-col items-center justify-center mt-10 p-8 glass rounded-3xl text-center">
                        <h2 className="text-2xl font-bold mb-2">Chào mừng đến với Vibe Weather</h2>
                        <p className="opacity-70 mb-6">Tìm kiếm thành phố hoặc sử dụng vị trí của bạn.</p>
                        <button
                            onClick={getLocation}
                            className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors flex items-center gap-2"
                        >
                            <MapPin className="w-5 h-5" />
                            Bật định vị
                        </button>
                    </div>
                ) : (
                    <>
                        <CurrentWeather />
                        <ForecastList />
                    </>
                )}
            </div>

            <footer className="w-full text-center py-4 opacity-40 text-xs z-10">
                <p>Vibe Weather • Open-Meteo</p>
            </footer>
        </main>
    );
}
