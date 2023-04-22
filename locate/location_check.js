// on load, check for geolocation support and already granted/denied permission

if (navigator.geolocation) {
    navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
        // console.log(result.state)
        if (result.state == 'granted') {
            // Permission already granted, redirect to closest map
            locationBasedRedirect()

        } else if (result.state == 'denied') {
            window.location.href = "location_access_error.html";
        }
    })
} else {
    // console.log("Geolocation is not supported by this browser.");
    window.location.href = "location_access_error.html";
}

function getClosestMap(position) {
    //given current position from geolocation, return closest map

    map_centres = [
        {
            "name": "Chippenham1773",
            "longitude": -2.117264,
            "latitude": 51.459066,
        },
        {
            "name": "Corsham",
            "longitude": -2.184995,
            "latitude": 51.432385,
        },
        {
            "name": "Malmesbury",
            "longitude": -2.098717,
            "latitude": 51.584384,
        },
        {
            "name": "CastleCombe",
            "longitude": -2.228871,
            "latitude": 51.493429,
        },
        {
            "name": "Bath",
            "longitude": -2.356641,
            "latitude": 51.381314,
        },
    ]

    const turf_position = turf.point([
        position.coords.longitude, position.coords.latitude
    ])

    const map_distances = map_centres.map(function (m) {
        return turf.distance(
            turf_position, turf.point([m.longitude, m.latitude]));
    })
    closestMapIndex = map_distances.indexOf(Math.min(...map_distances))
    return map_centres[closestMapIndex].name
}

function locationBasedRedirect() {

    navigator.geolocation.getCurrentPosition(function (position) {
        // Permission granted, redirect to another page
        // console.log(position)
        const closestMap = getClosestMap(position)
        console.log(`Redirect to closest map: ${closestMap}`)
        window.location.href = `../maps/${closestMap}`;
    }, function (position) {
        // Permission denied, redirect to error page
        window.location.href = "location_access_error.html";
    });
}