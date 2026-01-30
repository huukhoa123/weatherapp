'use client';

import { useWeatherStore } from '@/store/weather-store';
import { motion, AnimatePresence } from 'framer-motion';

// Weather code mapping to gradients
const getWeatherGradient = (code: number | undefined, isDay: number = 1) => {
    if (code === undefined) return "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-900 to-black";

    // 0: Clear sky, 1: Mainly clear
    if (code <= 1) {
        return isDay
            ? "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-400 via-blue-500 to-indigo-600" // Sunny Premium
            : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-purple-950 to-black"; // Clear Night Premium
    }

    // 2: Partly cloudy, 3: Overcast
    if (code <= 3) {
        return isDay
            ? "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-300 via-slate-400 to-slate-600" // Cloudy Premium
            : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-slate-900 to-black"; // Cloudy Night
    }

    // 45, 48: Fog
    if (code === 45 || code === 48) {
        return "bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-gray-400 via-gray-600 to-slate-800";
    }

    // 51-67, 80-82: Rain
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
        return "bg-[linear-gradient(to_bottom,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black";
    }

    // 71-77, 85-86: Snow
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
        return "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-blue-300 to-slate-500";
    }

    // 95-99: Thunderstorm
    if (code >= 95) {
        return "bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-purple-950 to-black";
    }

    return "bg-gradient-to-br from-blue-500 to-cyan-400";
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

            {/* Noise Texture for Premium Feel */}
            <div className="bg-noise" />

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
        </div>
    );
}
