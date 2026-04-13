import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind, Droplets, Thermometer, Eye } from "lucide-react";

interface WeatherData {
  temperature: number;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
  description: string;
  daily: {
    date: string;
    tempMax: number;
    tempMin: number;
    weatherCode: number;
  }[];
}

const weatherDescriptions: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Slight showers",
  81: "Moderate showers",
  82: "Violent showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail",
};

const getWeatherIcon = (code: number) => {
  if (code === 0 || code === 1) return Sun;
  if (code <= 3) return Cloud;
  if (code <= 48) return Eye;
  if (code <= 55) return Droplets;
  if (code <= 65 || (code >= 80 && code <= 82)) return CloudRain;
  if (code <= 75) return CloudSnow;
  if (code >= 95) return CloudLightning;
  return Cloud;
};

// Coordinates for each destination
const destinationCoords: Record<string, { lat: number; lng: number }> = {
  "araku-valley": { lat: 18.3274, lng: 82.8756 },
  "papikondalu": { lat: 17.3458, lng: 81.4756 },
  "borra-caves": { lat: 18.2821, lng: 83.0367 },
  "srisailam": { lat: 16.0736, lng: 78.8688 },
  "tirupati": { lat: 13.6288, lng: 79.4192 },
  "lepakshi": { lat: 15.5833, lng: 77.6067 },
  "amaravati": { lat: 16.5733, lng: 80.3572 },
  "gandikota": { lat: 15.2486, lng: 78.2869 },
  "konaseema": { lat: 16.9167, lng: 81.7500 },
  "horsley-hills": { lat: 13.6603, lng: 78.3997 },
  "rishikonda": { lat: 17.7869, lng: 83.3836 },
  "yarada": { lat: 17.6533, lng: 83.2742 },
  "nagarjuna-sagar": { lat: 16.5756, lng: 79.3122 },
  "ahobilam": { lat: 15.4833, lng: 78.7333 },
  "mantralayam": { lat: 15.6667, lng: 77.3833 },
  "talakona": { lat: 13.7167, lng: 79.1333 },
  "ethipothala": { lat: 16.5333, lng: 79.2833 },
  "pulicat-lake": { lat: 13.4167, lng: 80.3167 },
  "lambasingi": { lat: 17.9500, lng: 82.6000 },
};

interface WeatherWidgetProps {
  destinationId: string;
}

const WeatherWidget = ({ destinationId }: WeatherWidgetProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const coords = destinationCoords[destinationId];
    if (!coords) { setLoading(false); return; }

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia/Kolkata&forecast_days=5`
    )
      .then((res) => res.json())
      .then((data) => {
        const daily = data.daily.time.map((date: string, i: number) => ({
          date,
          tempMax: Math.round(data.daily.temperature_2m_max[i]),
          tempMin: Math.round(data.daily.temperature_2m_min[i]),
          weatherCode: data.daily.weather_code[i],
        }));
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          weatherCode: data.current.weather_code,
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m),
          description: weatherDescriptions[data.current.weather_code] || "Unknown",
          daily,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [destinationId]);

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-xl p-5 animate-pulse">
        <div className="h-4 w-32 bg-muted rounded mb-3" />
        <div className="h-10 w-20 bg-muted rounded" />
      </div>
    );
  }

  if (!weather) return null;

  const CurrentIcon = getWeatherIcon(weather.weatherCode);

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
        <Thermometer className="h-5 w-5 text-primary" /> Current Weather
      </h3>
      <div className="flex items-center gap-4 mb-4">
        <CurrentIcon className="h-12 w-12 text-accent" />
        <div>
          <p className="text-3xl font-bold text-foreground">{weather.temperature}°C</p>
          <p className="text-sm text-muted-foreground">{weather.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Droplets className="h-4 w-4 text-coastal" /> Humidity: {weather.humidity}%
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Wind className="h-4 w-4 text-coastal" /> Wind: {weather.windSpeed} km/h
        </div>
      </div>
      <div className="border-t border-border pt-3">
        <p className="text-xs font-semibold text-muted-foreground mb-2">5-Day Forecast</p>
        <div className="grid grid-cols-5 gap-1">
          {weather.daily.map((day) => {
            const DayIcon = getWeatherIcon(day.weatherCode);
            const dayLabel = new Date(day.date).toLocaleDateString("en-IN", { weekday: "short" });
            return (
              <div key={day.date} className="flex flex-col items-center gap-1 text-center">
                <span className="text-[10px] text-muted-foreground">{dayLabel}</span>
                <DayIcon className="h-4 w-4 text-foreground" />
                <span className="text-[10px] font-semibold text-foreground">{day.tempMax}°</span>
                <span className="text-[10px] text-muted-foreground">{day.tempMin}°</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
