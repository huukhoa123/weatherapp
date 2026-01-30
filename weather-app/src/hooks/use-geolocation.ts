import { useState, useCallback } from 'react';
import { useWeatherStore } from '@/store/weather-store';
import { getCityName } from '@/lib/weather';

export function useGeolocation() {
    const { setLocation, setError, setLoading } = useWeatherStore();
    const [isLocating, setIsLocating] = useState(false);

    const getLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        setIsLocating(true);
        setLoading(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                // 1. Set coords immediately to trigger weather fetch (FAST)
                setLocation({
                    lat: latitude,
                    lon: longitude,
                    name: "Đang định vị..."
                });

                // 2. Fetch City Name in background (SLOW)
                try {
                    const cityName = await getCityName(latitude, longitude);
                    // 3. Update name only (no weather re-fetch)
                    useWeatherStore.getState().updateLocationName(cityName);
                } catch {
                    // Keep "Đang định vị..." or set to fallback?
                    // setLocation handled checks, useWeatherStore handles state updates.
                    // getCityName already returns "My Location" on error.
                } finally {
                    setIsLocating(false);
                }
            },
            (error) => {
                let errorMessage = 'Unable to retrieve your location';
                if (error.code === error.PERMISSION_DENIED) {
                    errorMessage = 'Location permission denied. Please allow location access.';
                }
                setError(errorMessage);
                setIsLocating(false);
                setLoading(false);
            }
        );
    }, [setLocation, setError, setLoading]);

    return { getLocation, isLocating };
}
