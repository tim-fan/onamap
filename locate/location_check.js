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
        {
            "name": "Woodhill",
            "longitude": 174.417313,
            "latitude": -36.739776,
        },
        {
            "name": "QueenstownGardens",
            "longitude": 168.659394,
            "latitude": -45.038173,
        },
        {
            "name": "AirTattoo2018",
            "longitude": -1.780300,
            "latitude": 51.679255,
        },
        {
            "name": "KewGardens",
            "longitude": -0.2957171446359524,
            "latitude": 51.47750563954119,
        },
        {
            "name": "AucklandZoo",
            "longitude": 174.7174963,
            "latitude": -36.864113,
        },
        {
            "name": "PuxtonPark", 
            "longitude": -2.867963,
            "latitude": 51.362046,
        }, 
        {
            "name": "BealePark", 
            "longitude": -1.1093396,
            "latitude": 51.4969703,
        },
        {
            "name": "EdenProject", 
            "longitude": -4.7573804,
            "latitude": 50.3667136,
        },
        {
            "name": "DiggerlandDevon", 
            "longitude": -3.37899,
            "latitude": 50.8776498,
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
