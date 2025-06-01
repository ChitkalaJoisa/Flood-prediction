
const indianCities = [
  "Assam", "mangalore", "Udupi", "Chennai", "Mumbai", "Delhi", "Bangalore", "Kolkata", "Hyderabad", "Ahmedabad",
  "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Bhopal", "Patna",
  "Thiruvananthapuram", "Srinagar", "Guwahati", "Udupi", "Coimbatore", "Madurai",
  "Vijayawada", "Visakhapatnam", "Ranchi", "Jamshedpur", "Agra", "Varanasi", "Amritsar",
  "Shimla", "Manali", "Dehradun", "Panaji", "Raipur", "Surat", "Vadodara", "Rajkot", "manipal"
  ,"Kerala"
];

const select = document.getElementById('locationSelect');

indianCities.forEach(city => {
  const option = document.createElement('option');
  option.value = `${city},India`;
  option.textContent = `${city}`;
  select.appendChild(option);
});

function fetchSatelliteImage(predictionType) {
  const location = document.getElementById("locationSelect").value.trim();
  if (!location) {
    alert("Please enter a valid location.");
    return;
  }

  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("imageSection").classList.add("hidden");
  document.getElementById("result").classList.add("hidden");
  document.getElementById("error").classList.add("hidden");

  fetch("/get-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ location: location, predictionType: predictionType }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to get satellite image");
      return res.json();
    })
    .then((data) => {
      if (data.error) throw new Error(data.error);

      // Display satellite image
      const imgElement = document.getElementById("satelliteImage");
      imgElement.src = `${data.image_url}?v=${new Date().getTime()}`;
      imgElement.alt = `Satellite image of ${location}`;

      // Format weather data
      const weather = data.weather;
      const weatherInfo = `
        🌡 Temperature: ${weather.temperature}°C<br>
        💧 Humidity: ${weather.humidity}%<br>
        🌬 Wind Speed: ${weather.wind_speed} km/h<br>
        ⛆ Condition: ${weather.condition}<br>
        ☔ Rainfall: ${weather.rainfall} mm
      `;

      //  model prediction
      return fetch("/predict-weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          temperature: weather.temperature,
          humidity: weather.humidity,
          wind_speed: weather.wind_speed,
          rainfall: weather.rainfall
        }),
      })
      .then((res) => {
        if (!res.ok) throw new Error("Prediction failed");
        return res.json();
      })
      .then((predictionData) => {
        // Display results
        document.getElementById("predictionText").innerHTML = `
          <strong>Location:</strong> ${location}<br>
          (Lat: ${data.coordinates.lat.toFixed(4)}, Lon: ${data.coordinates.lon.toFixed(4)})<br><br>
          
          <strong>Weather Data:</strong><br>
          ${weatherInfo}<br><br>
          
          <strong>Flood Risk:</strong>
          ${predictionData.risk_level}<br>
          <strong>Landslide Risk:</strong>
          ${predictionData.risk_level}<br>
         
        `;

        // Update UI
        document.getElementById("loading").classList.add("hidden");
        document.getElementById("imageSection").classList.remove("hidden");
        document.getElementById("result").classList.remove("hidden");
      });
    })
    .catch((err) => {
      console.error("Error:", err);
      document.getElementById("loading").classList.add("hidden");
      document.getElementById("error").textContent = `Error: ${err.message}`;
      document.getElementById("error").classList.remove("hidden");
    });
}
