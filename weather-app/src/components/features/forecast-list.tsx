'use client';

import { useWeatherStore } from '@/store/weather-store';
import { GlassCard } from '@/components/ui/glass-card';
import { getWeatherIcon } from '@/lib/weather-utils';
import { motion } from 'framer-motion';

export function ForecastList() {
    const { weather } = useWeatherStore();

    if (!weather) return null;

    const { hourly, daily } = weather;

    // Clean next 24 hours
    // Current time index? OpenMeteo gives hourly from 00:00 of request day usually, or we find index.
    // Actually it gives past and future. We should filter for > now.
    const now = new Date();
    const currentHourIndex = hourly.time.findIndex(t => new Date(t) > now);

    // Safe fallback if not found
    const startIndex = currentHourIndex !== -1 ? currentHourIndex : 0;
    const next24Hours = hourly.time.slice(startIndex, startIndex + 24).map((time, i) => {
        const index = startIndex + i;
        return {
            time,
            temp: hourly.temperature_2m[index],
            code: hourly.weather_code[index]
        };
    });

    return (
        <div className="space-y-6 w-full max-w-3xl mt-6">
            {/* Hourly Section */}
            <section>
                <h3 className="text-sm uppercase tracking-wider opacity-70 mb-3 px-2">Hourly Forecast</h3>
                <GlassCard className="p-4 overflow-x-auto no-scrollbar">
                    <div className="flex gap-6 min-w-max">
                        {next24Hours.map((item, i) => {
                            const date = new Date(item.time);
                            const hours = date.getHours();
                            const isDay = hours > 6 && hours < 20; // Approx
                            const Icon = getWeatherIcon(item.code, isDay ? 1 : 0);

                            return (
                                <div key={item.time} className="flex flex-col items-center gap-2 min-w-[3.5rem]">
                                    <span className="text-sm opacity-80">
                                        {i === 0 ? 'Now' : date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}
                                    </span>
                                    <Icon className="w-6 h-6 my-1" />
                                    <span className="text-lg font-semibold">{Math.round(item.temp)}°</span>
                                </div>
                            )
                        })}
                    </div>
                </GlassCard>
            </section>

            {/* Daily Section */}
            <section>
                <h3 className="text-sm uppercase tracking-wider opacity-70 mb-3 px-2">7-Day Forecast</h3>
                <GlassCard className="p-6">
                    <div className="flex flex-col gap-4">
                        {daily.time.map((time, i) => {
                            const date = new Date(time);
                            const dayName = i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'long' });
                            const Icon = getWeatherIcon(daily.weather_code[i]);

                            return (
                                <div key={time} className="flex items-center justify-between border-b border-white/10 last:border-0 pb-4 last:pb-0">
                                    <span className="w-24 font-medium">{dayName}</span>
                                    <div className="flex flex-col items-center">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex gap-4 w-24 justify-end">
                                        <span className="font-semibold">{Math.round(daily.temperature_2m_max[i])}°</span>
                                        <span className="opacity-60">{Math.round(daily.temperature_2m_min[i])}°</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </GlassCard>
            </section>
        </div>
    );
}
