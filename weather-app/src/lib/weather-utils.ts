import {
    Sun, Moon, Cloud, CloudSun, CloudMoon, CloudFog,
    CloudRain, CloudLightning, Snowflake
} from 'lucide-react';

export const getWeatherDescription = (code: number): string => {
    switch (code) {
        case 0: return 'Trời quang';
        case 1: return 'Ít mây';
        case 2: return 'Có mây';
        case 3: return 'Nhiều mây';
        case 45: return 'Sương mù';
        case 48: return 'Sương muối';
        case 51: return 'Mưa phùn nhẹ';
        case 53: return 'Mưa phùn vừa';
        case 55: return 'Mưa phùn dày';
        case 56: return 'Mưa phùn băng giá nhẹ';
        case 57: return 'Mưa phùn băng giá dày';
        case 61: return 'Mưa nhỏ';
        case 63: return 'Mưa vừa';
        case 65: return 'Mưa to';
        case 66: return 'Mưa băng giá nhẹ';
        case 67: return 'Mưa băng giá nặng';
        case 71: return 'Tuyết rơi nhẹ';
        case 73: return 'Tuyết rơi vừa';
        case 75: return 'Tuyết rơi dày';
        case 77: return 'Hạt tuyết';
        case 80: return 'Mưa rào nhẹ';
        case 81: return 'Mưa rào vừa';
        case 82: return 'Mưa rào rất to';
        case 85: return 'Mưa tuyết nhẹ';
        case 86: return 'Mưa tuyết nặng';
        case 95: return 'Dông';
        case 96: return 'Dông kèm mưa đá nhẹ';
        case 99: return 'Dông kèm mưa đá nặng';
        default: return 'Không xác định';
    }
};

export const getWeatherIcon = (code: number, isDay: number = 1) => {
    if (code === 0 || code === 1) return isDay ? Sun : Moon;
    if (code === 2) return isDay ? CloudSun : CloudMoon;
    if (code === 3) return Cloud;
    if (code === 45 || code === 48) return CloudFog;
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return CloudRain;
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) return Snowflake;
    if (code >= 95) return CloudLightning;
    return isDay ? Sun : Moon;
};
