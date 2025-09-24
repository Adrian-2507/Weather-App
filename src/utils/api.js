export async function fetchWeatherByCity(city, apiKey) {
  try {
    const q = encodeURIComponent(city.trim());
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || "Could not get weather" };
    }

    return data;
  } catch (err) {
    return { error: err.message || "Network error" };
  }
}
