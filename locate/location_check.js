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
            "name": "AirTattoo2024",
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
        {
            "name": "HullavingtonNatureTrail", 
            "longitude": -2.151137,
            "latitude": 51.528517,
        }, 
        {
            "name": "Oxford1605", 
            "longitude": -1.255878,
            "latitude": 51.750244,
        }, 
        {
            "name": "Bowood", 
            "longitude": -2.037633,
            "latitude": 51.428555,
        }, 
        {
            "name": "CorfeCastle", 
            "longitude": -2.059148,
            "latitude": 50.640147,
        }, 
        {
            "name": "Cambridge1575", 
            "longitude": 0.119077,
            "latitude": 52.205217,
        }, 
        {
            "name": "ChatuchakMarket", 
            "longitude": 100.550978,
            "latitude": 13.799503,
        }, 
        {
            "name": "OhopeCycleTrails", 
            "longitude": 177.0778410894016,
            "latitude": -37.99262196459595,
        }, 
        {
            "name": "BathSkyline", 
            "longitude": -2.334910,
            "latitude": 51.376907,
        },
        {
            "name": "RedRoseCamp", 
            "longitude": -2.72220276865230026,
            "latitude": 54.24528950433738572,
        },
        {
            "name": "London1561", 
            "longitude": -0.097726,
            "latitude": 51.513362,
        }, 
        {
            "name": "Avalon", 
            "longitude": -8.570899,
            "latitude": 115.258633,
        }, 
        {
            "name": "SanDiegoZoo",
            "longitude": -117.1497,
            "latitude": 32.7353,
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
