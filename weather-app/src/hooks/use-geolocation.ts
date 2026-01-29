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
                try {
                    const cityName = await getCityName(latitude, longitude);

                    setLocation({
                        lat: latitude,
                        lon: longitude,
                        name: cityName
                    });
                } catch {
                    setError("Failed to process location");
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
