async function getTime() {
    let country = document.getElementById('countryInput').value.trim();

    // Normalize user input to match the API's naming convention
    country = country.replace(/\s+/g, '_').toLowerCase();

    const response = await fetch('https://worldtimeapi.org/api/timezone');
    const timezones = await response.json();

    let matchingTimezone = timezones.find(zone => zone.toLowerCase() === country);

    if (!matchingTimezone) {
        matchingTimezone = timezones.find(zone => zone.toLowerCase().includes(country));
    }

    if (matchingTimezone) {
        const timeResponse = await fetch(`https://worldtimeapi.org/api/timezone/${matchingTimezone}`);
        const timeData = await timeResponse.json();

        const timeZone = timeData.timezone;

        const dateTimeFormat = new Intl.DateTimeFormat('id-ID', { dateStyle: 'full', timeStyle: 'long', timeZone });
        const formattedDateTime = dateTimeFormat.format(new Date(timeData.datetime));

        document.getElementById('timeDisplay').innerText = `Waktu saat ini di ${matchingTimezone.replace('_', ' ')} adalah ${formattedDateTime}`;
    } else {
        document.getElementById('timeDisplay').innerText = 'Kota tidak ditemukan!';
    }
}