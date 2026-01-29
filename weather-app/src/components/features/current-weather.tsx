'use client';

import { useWeatherStore } from '@/store/weather-store';
import { GlassCard } from '@/components/ui/glass-card';
import { getWeatherDescription, getWeatherIcon } from '@/lib/weather-utils';
import { getFunnyQuote } from '@/lib/funny-quotes';
import { motion } from 'framer-motion';
import { MapPin, Wind, Droplets, Thermometer } from 'lucide-react';

export function CurrentWeather() {
    const { weather, currentLocation } = useWeatherStore();

    if (!weather || !currentLocation) return null;

    const { current, daily } = weather;
    const isDay = current.is_day;
    // eslint-disable-next-line react/no-unstable-nested-components
    const Icon = getWeatherIcon(current.weather_code, isDay);
    const description = getWeatherDescription(current.weather_code);
    const temp = Math.round(current.temperature_2m);
    const quote = getFunnyQuote(current.weather_code, temp);
    const maxTemp = Math.round(daily.temperature_2m_max[0]);
    const minTemp = Math.round(daily.temperature_2m_min[0]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <GlassCard className="flex flex-col items-center p-8 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-sm uppercase tracking-wider opacity-80 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{currentLocation.name}</span>
                </div>

                <div className="flex flex-col items-center mb-6">
                    <Icon className="w-24 h-24 mb-4 text-yellow-300 drop-shadow-lg" />
                    <h1 className="text-8xl font-thin tracking-tighter mb-2">{temp}°</h1>
                    <p className="text-xl font-medium capitalize">{description}</p>
                    <p className="text-sm italic opacity-70 mt-2 text-center max-w-[250px]">"{quote}"</p>
                    <div className="flex gap-4 mt-4 text-sm opacity-80">
                        <span>H: {maxTemp}°</span>
                        <span>L: {minTemp}°</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-8 w-full border-t border-white/10 pt-6">
                    <div className="flex flex-col items-center gap-1">
                        <Wind className="w-5 h-5 opacity-70" />
                        <span className="text-sm">{current.wind_speed_10m} km/h</span>
                        <span className="text-xs opacity-50">Gió</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Droplets className="w-5 h-5 opacity-70" />
                        <span className="text-sm">{current.relative_humidity_2m}%</span>
                        <span className="text-xs opacity-50">Độ ẩm</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Thermometer className="w-5 h-5 opacity-70" />
                        <span className="text-sm">{Math.round(current.apparent_temperature)}°</span>
                        <span className="text-xs opacity-50">Cảm giác</span>
                    </div>
                </div>
            </GlassCard>
        </motion.div>
    );
}
