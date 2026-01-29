'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2, MapPin } from 'lucide-react';
import { useWeatherStore } from '@/store/weather-store';
import { searchLocation } from '@/lib/weather';
import { GeocodingResult } from '@/lib/types';
import { GlassCard } from '@/components/ui/glass-card';
import { useGeolocation } from '@/hooks/use-geolocation';

export function LocationSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<GeocodingResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { setLocation } = useWeatherStore();
    const { getLocation, isLocating } = useGeolocation();

    // Debounced search effect
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!query.trim() || query.length < 2) {
                setResults([]);
                return;
            }

            setIsSearching(true);
            try {
                const data = await searchLocation(query);
                setResults(data);
                setIsOpen(true);
            } catch (error) {
                console.error(error);
            } finally {
                setIsSearching(false);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [query]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Search is handled by useEffect now, but we can keep this to prevent page reload
    };

    const handleSelect = (item: GeocodingResult) => {
        setLocation({
            lat: item.latitude,
            lon: item.longitude,
            name: `${item.name}, ${item.country_code}`
        });
        setIsOpen(false);
        setQuery('');
    };

    const handleCurrentLocation = () => {
        getLocation();
        setIsOpen(false);
    };

    return (
        <div className="relative w-full max-w-md z-50">
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search city..."
                    className="w-full h-12 pl-12 pr-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all shadow-lg"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70" />
                {isSearching && (
                    <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin opacity-70" />
                )}
            </form>

            {/* Results Dropdown */}
            {(isOpen && results.length > 0) && (
                <div className="absolute top-14 left-0 w-full animate-in fade-in slide-in-from-top-2">
                    <GlassCard className="p-2 max-h-60 overflow-y-auto">
                        {results.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleSelect(item)}
                                className="w-full text-left px-4 py-3 hover:bg-white/10 rounded-xl transition-colors flex items-center gap-3"
                            >
                                <MapPin className="w-4 h-4 opacity-70" />
                                <div className="flex flex-col">
                                    <span className="font-medium">{item.name}</span>
                                    <span className="text-xs opacity-60">
                                        {item.admin1 ? `${item.admin1}, ` : ''}{item.country}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </GlassCard>
                </div>
            )}

            {/* Initial state or empty query actions could go here, 
          but simpler to just have "Use Current Location" button available always? 
          Maybe as an icon in the input? Or a separate button.
      */}
            {!isOpen && !query && (
                <button
                    onClick={handleCurrentLocation}
                    disabled={isLocating}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-full transition-colors"
                    title="Use Current Location"
                >
                    {isLocating ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                </button>
            )}
        </div>
    );
}
