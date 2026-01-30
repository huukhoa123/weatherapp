'use client';

import { useWeatherStore } from '@/store/weather-store';
import { motion, AnimatePresence } from 'framer-motion';

// Weather code mapping to gradients
const getWeatherGradient = (code: number | undefined, isDay: number = 1) => {
    if (code === undefined) return "bg-gradient-to-br from-slate-900 to-slate-800"; // Default

    // 0: Clear sky, 1: Mainly clear
    if (code <= 1) {
        return isDay
            ? "bg-gradient-to-br from-blue-400 to-orange-300" // Sunny
            : "bg-gradient-to-br from-indigo-950 to-slate-900"; // Clear Night
    }

    // 2: Partly cloudy, 3: Overcast
    if (code <= 3) {
        return isDay
            ? "bg-gradient-to-br from-slate-600 to-slate-400" // Cloudy Day (Darker)
            : "bg-gradient-to-br from-slate-800 to-indigo-900"; // Cloudy Night
    }

    // 45, 48: Fog
    if (code === 45 || code === 48) {
        return "bg-gradient-to-br from-slate-500 to-gray-400";
    }

    // 51-67, 80-82: Drizzle, Rain, Showers
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
        return "bg-gradient-to-br from-blue-900 to-slate-800"; // Rain
    }

    // 71-77, 85-86: Snow
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
        return "bg-gradient-to-br from-blue-100 to-sky-200"; // Snow
    }

    // 95-99: Thunderstorm
    if (code >= 95) {
        return "bg-gradient-to-br from-indigo-950 to-purple-900"; // Storm
    }

    return "bg-gradient-to-br from-blue-500 to-cyan-400"; // Fallback
};

export function DynamicBackground() {
    const { weather } = useWeatherStore();

    // Derived state (no useEffect needed)
    const gradient = weather?.current
        ? getWeatherGradient(weather.current.weather_code, weather.current.is_day)
        : "bg-gradient-to-br from-slate-900 to-slate-800";

    return (
        <div className="fixed inset-0 -z-10 transition-all duration-1000 ease-in-out">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={gradient}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className={`absolute inset-0 ${gradient}`}
                />
            </AnimatePresence>

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
        </div>
    );
}
