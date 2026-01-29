export interface WeatherData {
    current: CurrentWeather;
    hourly: HourlyForecast;
    daily: DailyForecast;
    location?: string;
}

export interface CurrentWeather {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
}

export interface HourlyForecast {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    precipitation_probability: number[];
    weather_code: number[];
}

export interface DailyForecast {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
}

export interface GeocodingResult {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    country_code: string;
    country: string;
    admin1?: string;
}
