export interface FakeWeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  high: number;
  low: number;
  extra: string;
}

export interface WeatherResult {
  location: string;
  message: string;
  roast: string;
}