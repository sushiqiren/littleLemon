// Seeded random number generator for consistent results
const seededRandom = function (seed) {
    var m = 2**35 - 31;
    var a = 185852;
    var s = seed % m;
    return function () {
        return (s = s * a % m) / m;
    };
}

// Fetch available booking times for a given date
window.fetchAPI = function(date) {
    // Validate input
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        console.error('Invalid date provided to fetchAPI');
        return [];
    }
    
    let result = [];
    let random = seededRandom(date.getDate());

    for(let i = 17; i <= 23; i++) {
        if(random() < 0.5) {
            result.push(i + ':00');
        }
        if(random() < 0.5) {
            result.push(i + ':30');
        }
    }
    
    // Ensure we always return at least some times
    if (result.length === 0) {
        result = ['19:00', '20:00'];
    }
    
    return result;
};

// Submit booking data to the API
window.submitAPI = function(formData) {
    // Validate required fields
    if (!formData) {
        console.error('No form data provided to submitAPI');
        return false;
    }
    
    if (!formData.date || !formData.time || !formData.guests) {
        console.error('Missing required fields in form data');
        return false;
    }
    
    // Validate guests is a valid number
    if (typeof formData.guests !== 'number' || formData.guests < 1 || formData.guests > 10) {
        console.error('Invalid number of guests');
        return false;
    }
    
    // Log the successful submission
    console.log('Booking submitted successfully:', formData);
    
    return true;
};
