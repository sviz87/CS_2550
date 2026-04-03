function initWeatherWidget() {
  const weatherGrid = document.getElementById("weather-grid");
  if (!weatherGrid) return;
  const i18n = window.roadbookI18n;
  const translate = (key) => (i18n ? i18n.t(key) : key);
  const currentLanguage = i18n ? i18n.getLanguage() : "en";

  const weatherByCity = [
    { city: currentLanguage === "ro" ? "București" : "Bucharest", latitude: 44.4268, longitude: 26.1025 },
    { city: "Cluj-Napoca", latitude: 46.7712, longitude: 23.6236 },
    { city: "Suceava", latitude: 47.6514, longitude: 26.2556 },
    { city: currentLanguage === "ro" ? "Constanța" : "Constanta", latitude: 44.1598, longitude: 28.6348 }
  ];

  const weatherCodeMap = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Drizzle",
    55: "Dense drizzle",
    56: "Freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Rain",
    65: "Heavy rain",
    66: "Freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow",
    73: "Snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Rain showers",
    81: "Rain showers",
    82: "Violent rain showers",
    85: "Snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Thunderstorm with heavy hail"
  };

  function conditionFromCode(code) {
    return weatherCodeMap[code] || "Unknown";
  }

  function outfitSuggestion(tempC) {
    if (tempC < 10) return translate("weather.outfit.cold");
    if (tempC <= 20) return translate("weather.outfit.mild");
    return translate("weather.outfit.warm");
  }

  function weatherUrl(latitude, longitude) {
    return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,is_day&timezone=auto`;
  }

  function weatherIconData(weatherCode, isDay) {
    const snowCodes = new Set([71, 73, 75, 77, 85, 86]);
    const rainCodes = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82]);

    if (snowCodes.has(weatherCode)) return { glyph: "❄", tone: "snow" };
    if (rainCodes.has(weatherCode)) return { glyph: "💧", tone: "rain" };
    if (isDay === 0) return { glyph: "🌙", tone: "night" };
    return { glyph: "☀", tone: "sun" };
  }

  function cityHeading(cityName, weatherCode, isDay) {
    const icon = weatherIconData(weatherCode, isDay);
    return `
      <span class="city-label">
        <span class="city-icon city-glyph icon-${icon.tone}">${icon.glyph}</span>
        <span>${cityName}</span>
      </span>
    `;
  }

  function renderLoadingCards() {
    weatherGrid.innerHTML = "";
    weatherByCity.forEach((item) => {
      const card = document.createElement("article");
      card.className = "weather-card";
      card.innerHTML = `
        <h3>${cityHeading(item.city, 0, 1)}</h3>
        <p>${translate("weather.loading")}</p>
      `;
      weatherGrid.appendChild(card);
    });
  }

  function renderWeatherCards(weatherRows) {
    weatherGrid.innerHTML = "";
    weatherRows.forEach((row) => {
      const card = document.createElement("article");
      card.className = "weather-card";

      if (row.error) {
        card.innerHTML = `
          <h3>${cityHeading(row.city, 3, 1)}</h3>
          <p>${translate("weather.error")}</p>
        `;
        weatherGrid.appendChild(card);
        return;
      }

      card.innerHTML = `
        <h3>${cityHeading(row.city, row.weatherCode, row.isDay)}</h3>
        <p>${row.condition}</p>
        <p class="weather-temp">${row.temp}\u00B0C</p>
        <p class="suggestion"><i class="fa-solid fa-shirt"></i> ${outfitSuggestion(row.temp)}</p>
        <p class="weather-updated">${translate("weather.updated")} ${row.updatedLabel}</p>
      `;
      weatherGrid.appendChild(card);
    });
  }

  function renderFallbackMarchCard() {
    weatherGrid.innerHTML = "";
    const card = document.createElement("article");
    card.className = "weather-card";
    card.innerHTML = `
      <h3>
        <span class="city-label">
          <span class="city-icon city-glyph icon-sun">☀</span>
          <span>${translate("weather.snapshotTitle")}</span>
        </span>
      </h3>
      <p>${translate("weather.snapshotBody")}</p>
      <p class="weather-temp">11°C</p>
      <p class="suggestion"><i class="fa-solid fa-shirt"></i> ${translate("weather.outfit.mild")}</p>
      <p class="weather-updated">${translate("weather.offline")}</p>
    `;
    weatherGrid.appendChild(card);
  }

  async function fetchCityWeather(city) {
    try {
      const response = await fetch(weatherUrl(city.latitude, city.longitude));
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const payload = await response.json();
      const current = payload.current || {};
      const temp = Math.round(current.temperature_2m);
      const weatherCode = current.weather_code;
      const isDay = current.is_day;
      const updatedTime = current.time ? new Date(current.time) : new Date();
      const updatedLabel = updatedTime.toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });

      if (Number.isNaN(temp)) {
        throw new Error("Missing temperature");
      }

      return {
        city: city.city,
        temp,
        condition: conditionFromCode(weatherCode),
        updatedLabel,
        weatherCode,
        isDay
      };
    } catch (error) {
      return { city: city.city, error: true };
    }
  }

  async function loadLiveWeather() {
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      renderFallbackMarchCard();
      return;
    }

    renderLoadingCards();
    const weatherRows = await Promise.all(weatherByCity.map(fetchCityWeather));
    const allFailed = weatherRows.length > 0 && weatherRows.every((row) => row.error);
    if (allFailed) {
      renderFallbackMarchCard();
      return;
    }

    renderWeatherCards(weatherRows);
  }

  loadLiveWeather();
}
