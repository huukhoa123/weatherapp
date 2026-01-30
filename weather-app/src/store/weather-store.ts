import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WeatherData } from '@/lib/types';
import { getWeather } from '@/lib/weather';

interface Location {
    lat: number;
    lon: number;
    name: string;
}

interface WeatherState {
    currentLocation: Location | null;
    weather: WeatherData | null;
    isLoading: boolean;
    error: string | null;

    setLocation: (location: Location) => void;
    updateLocationName: (name: string) => void;
    fetchWeather: () => Promise<void>;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useWeatherStore = create<WeatherState>()(
    persist(
        (set, get) => ({
            currentLocation: null,
            weather: null,
            isLoading: false,
            error: null,

            setLocation: (location) => {
                set({ currentLocation: location });
                // Auto fetch when location changes
                get().fetchWeather();
            },

            updateLocationName: (name) => {
                const { currentLocation } = get();
                if (currentLocation) {
                    set({ currentLocation: { ...currentLocation, name } });
                }
            },

            fetchWeather: async () => {
                const { currentLocation } = get();
                if (!currentLocation) return;

                set({ isLoading: true, error: null });
                try {
                    const data = await getWeather(currentLocation.lat, currentLocation.lon);
                    set({ weather: data, isLoading: false });
                } catch (error) {
                    set({ error: (error as Error).message, isLoading: false });
                }
            },

            setLoading: (loading) => set({ isLoading: loading }),
            setError: (error) => set({ error }),
        }),
        {
            name: 'vibeweather-storage',
            partialize: (state) => ({ currentLocation: state.currentLocation }), // Only persist location
        }
    )
);
