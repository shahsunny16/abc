
var map = L.map('map').setView([23.2599, 77.4126], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([23.2599, 77.4126]).addTo(map)
.bindPopup('A pretty CSS popup.<br> Easily customizable.')
.openPopup();

/*
const apiKey = '2775a94293f24945b94358942df8f9a1'; // replace with your real key

const address = 'delhi,india';

opencage.geocode({ q: address, key: apiKey })
.then(async (data) => { 
    if (data.results.length > 0) {
         const place = data.results[0];
  
        console.log(`Latitude: ${place.geometry.lat}`);
        console.log(`Longitude: ${place.geometry.lng}`);
  
    } else {
        console.log('No results found');
    }
})
.catch(error => {
console.error('Error:', error.message);
});*/