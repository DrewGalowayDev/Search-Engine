/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

/*Copyright @drewgallowaydev22 -
Github -https://github.com/DrewGalowayDev/x-flashmessenger
Linkedin -Robinson Otochi

*/

    
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const timeString = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
    document.getElementById('time').textContent = timeString;
  }
  setInterval(updateTime, 1000);
  
  
  function updateDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.toLocaleString('default', { month: 'long' });
    const day = now.getDate();
    const dayOfWeek = now.toLocaleString('default', { weekday: 'long' });
    const dateString = `${month} ${day}, ${year}`;
    const dayString = `${dayOfWeek}`;
    document.getElementById('date').textContent = dateString;
    document.getElementById('day').textContent = dayString;
  }
  updateDate();
  
  
  function updateGreeting() {
    const now = new Date();
    const hours = now.getHours();
    let greeting;
    if (hours < 6) {
      greeting = 'Good night @Robin🎬drewgallowaydev™ © 2024';
    } else if (hours < 12) {
      greeting = 'Good morning  @Robin🎬drewgallowaydev™ © 2024';
    } else if (hours < 14) {
      greeting = 'Good afternoon  @Robin🎬drewgallowaydev™ © 2024';
    } else {
      greeting = 'Good evening  @Robin🎬drewgallowaydev™ © 2024';
    }
    document.getElementById('greeting').textContent = greeting;
  }
  updateGreeting();
  
  
  const quotes = [
    "No quotes are available",
    "Check out some quotes websites.",
  
  ];
  function updateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('quote').textContent = quote;
  }
  updateQuote();
  
  
  function updateWeather(temperature) {
    const weatherIcon = document.getElementById('weatherIcon');
    const weatherText = document.getElementById('weatherText');
    const weatherTemp = document.getElementById('weather');
  
    if (temperature < 15) {
      weatherIcon.className = 'weather-icon fas fa-snowflake';
      weatherText.textContent = 'Cold';
    } else if (temperature >= 15 && temperature < 25) {
      weatherIcon.className = 'weather-icon fas fa-cloud-sun';
      weatherText.textContent = 'Mild';
    } else if (temperature >= 25 && temperature < 35) {
      weatherIcon.className = 'weather-icon fas fa-sun ';
      weatherText.textContent = ' Hot';
    } else {
      weatherIcon.className = 'weather-icon fas fa-meteor';
      weatherText.textContent = ' Extreme';
    }
  
    weatherTemp.textContent = `${temperature}°C`;
  }
  
  
  const temperature = 25;
  updateWeather(temperature);
  
  
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  
  searchBtn.addEventListener('click', () => {
    const searchQuery = searchInput.value.trim();
    if (searchQuery) {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      window.open(searchUrl, '_blank');
      searchInput.value = ''; 
    }
  });
  
  
  const luckyBtn = document.getElementById('luckyBtn');
  const confettiSettings = { spread: 360 };
  
  luckyBtn.addEventListener('click', () => {
    confetti(confettiSettings);
  });
  /*====take note of this====*/
      const CACHE_NAME = 'app-cache-v1';
  const urlsToCache = [
      '/',
      '/index.html',
      '/styles.css',
      '/app.js',
      '/logo.png',
  ];
  
  self.addEventListener('install', (event) => {
      event.waitUntil(
          caches.open(CACHE_NAME).then((cache) => {
              console.log('Opened cache');
              return cache.addAll(urlsToCache);
          })
      );
  });
  
  self.addEventListener('fetch', (event) => {
      event.respondWith(
          caches.match(event.request).then((response) => {
              return response || fetch(event.request);
          })
      );
  });
  
      /*==========================this is the new cache script*/
      // Service Worker registration
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(function(error) {
          console.log('ServiceWorker registration failed: ', error);
      });
  }
  
  // Caching files with Service Worker (inside service-worker.js file)
  
  // LocalStorage for saving data locally
  function saveDataLocally(key, value) {
      localStorage.setItem(key, value);
      console.log('Data saved locally: ', key, value);
  }
  
  function getDataLocally(key) {
      return localStorage.getItem(key);
  }
  
  // Example usage of local storage
  const exampleData = { message: 'Hello from X-Flash Messenger!' };
  saveDataLocally('userMessage', JSON.stringify(exampleData));
  
  // Fetching the saved data later
  const savedMessage = JSON.parse(getDataLocally('userMessage'));
  console.log('Retrieved from LocalStorage:', savedMessage);
  
  // Offline Sync: Detecting when back online
  window.addEventListener('online', () => {
      console.log('Back online, syncing data...');
      syncData();
  });
  
  // Simulating sync process
  function syncData() {
      const unsentData = getDataLocally('userMessage');
      if (unsentData) {
          // Send this data to the server (implement this for your scenario)
          console.log('Syncing data to the server:', JSON.parse(unsentData));
          // Remove data after sync
          localStorage.removeItem('userMessage');
      }
  }
  
  // Check if offline
  if (!navigator.onLine) {
      console.log('You are offline. Local data will be used.');
      // Load local data instead of server data here
  }
  
    
