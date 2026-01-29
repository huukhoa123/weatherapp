import { WeatherData, GeocodingResult } from "./types";

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";
const REVERSE_GEO_API_URL = "https://nominatim.openstreetmap.org/reverse";

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
    const params = new URLSearchParams({
        latitude: lat.toString(),
        longitude: lon.toString(),
        current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m",
        hourly: "temperature_2m,relative_humidity_2m,precipitation_probability,weather_code",
        daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
        timezone: "auto",
    });

    const response = await fetch(`${WEATHER_API_URL}?${params.toString()}`);

    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }

    return response.json();
}

export async function searchLocation(query: string): Promise<GeocodingResult[]> {
    const params = new URLSearchParams({
        name: query,
        count: "5",
        language: "en",
        format: "json",
    });

    const response = await fetch(`${GEOCODING_API_URL}?${params.toString()}`);

    if (!response.ok) {
        throw new Error("Failed to search location");
    }

    const data = await response.json();
    return data.results || [];
}

export async function getCityName(lat: number, lon: number): Promise<string> {
    try {
        const response = await fetch(`${REVERSE_GEO_API_URL}?format=json&lat=${lat}&lon=${lon}`);
        const data = await response.json();

        // Nominatim hierarchy: city > town > village > hamlet > suburb > etc.
        const address = data.address;
        return address.city || address.town || address.village || address.municipality || "My Location";
    } catch (error) {
        console.error("Reverse geocoding failed", error);
        return "My Location";
    }
}
