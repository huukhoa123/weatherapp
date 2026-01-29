'use client';

import { useWeatherStore } from '@/store/weather-store';
import { useMemo, useEffect, useState } from 'react';

// Generate particles on client side to avoid hydration mismatch
export function WeatherEffects() {
    const { weather } = useWeatherStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const code = weather?.current?.weather_code;

    const effects = useMemo(() => {
        if (code === undefined) return null;

        // Rain: 51-67, 80-82
        if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="rain"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 1}s`,
                                animationDuration: `${0.5 + Math.random() * 0.5}s`,
                                opacity: 0.3 + Math.random() * 0.3,
                            }}
                        />
                    ))}
                </div>
            );
        }

        // Snow: 71-77, 85-86
        if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="snow"
                            style={{
                                left: `${Math.random() * 100}%`,
                                width: `${4 + Math.random() * 4}px`,
                                height: `${4 + Math.random() * 4}px`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${3 + Math.random() * 3}s`,
                                opacity: 0.1 + Math.random() * 0.4,
                            }}
                        />
                    ))}
                </div>
            );
        }

        // Clouds (Partly cloudy/Overcast): 1-3
        if (code >= 1 && code <= 3) {
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="cloud bg-white rounded-full blur-3xl"
                            style={{
                                top: `${10 + Math.random() * 30}%`,
                                width: `${200 + Math.random() * 200}px`,
                                height: `${100 + Math.random() * 100}px`,
                                left: `-${20 + Math.random() * 20}%`,
                                animationDelay: `${i * 10}s`,
                                animationDuration: `${40 + Math.random() * 20}s`,
                            }}
                        />
                    ))}
                </div>
            );
        }

        return null;
    }, [code]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-5 pointer-events-none">
            {effects}
        </div>
    );
}
