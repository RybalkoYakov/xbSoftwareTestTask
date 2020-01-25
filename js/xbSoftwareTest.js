class CityMap {
    constructor(cities) {
        this.cities = cities || '';
        if (cities) {this.data = formatData()} else this.data = [];

        function formatData() {
            let citiesArr = cities.split(';');
            let finishArr = [];

            for (let i = 0; i < citiesArr.length; i++) {
                finishArr.push(citiesArr[i].split(','));
            }
            finishArr.pop();
            for (let i = 0; i < finishArr.length; i++) {
                for (let j = 0; j < finishArr[i].length; j++) {
                    finishArr[i][j] = finishArr[i][j].replace('"', '').replace(' ', '');
                }
            }
            return finishArr;
        }
    }

    returnRequestedCity(param) {
        let data = this.data;
        if (param) {
            param = param.trim().toLowerCase();
            let dotCharIndex = 2;

            let latitudes = [];
            let longitudes = [];

            for (let i = 0; i < data.length; i++) {
                latitudes.push(data[i][2]);
                longitudes.push(data[i][3]);
            }

            let maxLatitude = Math.max(...latitudes).toFixed(dotCharIndex).toString();
            let minLatitude = Math.min(...latitudes).toFixed(dotCharIndex).toString();
            let maxLongitude = Math.max(...longitudes).toFixed(dotCharIndex).toString();
            let minLongitude = Math.min(...longitudes).toFixed(dotCharIndex).toString();

            let northernmost = '';
            let southernmost = '';
            let easternmost = '';
            let westernmost = '';

            latitudes.forEach((value, index) => {if (value === maxLatitude) {northernmost = data[index][0]}});
            latitudes.forEach((value, index) => {if (value === minLatitude) {southernmost = data[index][0]}});
            longitudes.forEach((value, index) => {if (value === maxLongitude) {easternmost = data[index][0]}});
            longitudes.forEach((value, index) => {if (value === minLongitude) {westernmost = data[index][0]}});


            if (param === 'northernmost') {
                return northernmost;
            } else if (param === 'easternmost') {
                return easternmost;
            } else if (param === 'southernmost') {
                return southernmost;
            } else if (param === 'westernmost') {
                return westernmost;
            } else {
                return `parameter ${param} does not exist`;
            }
        } else {
            console.error('incorrect params at function returnreqStateuestedCity');
            return 'enter parameters please'
        }
    }

    returnNearestCity(latitude, longitude) {
        if (latitude && longitude) {
            latitude = parseFloat(latitude);
            longitude = parseFloat(longitude);
            let data = this.data;
            let nearestCity = '';

            let citiesCoordsAndDistance = [];
            let distances = [];
            for (let i = 0; i < data.length; i++) {
                citiesCoordsAndDistance.push(
                        [
                            data[i][0],                                           //city Name
                            data[i][2],                                           //city latitude
                            data[i][3],                                           //city longitude
                            getDistanceFromLatLonInKm(latitude, longitude, data[i][2], data[i][3])
                        ]
                    );
                distances.push(getDistanceFromLatLonInKm(latitude, longitude, data[i][2], data[i][3]));
            }

            let minDistance = Math.min(...distances);
            citiesCoordsAndDistance.forEach((value, index) => {
                if (value[3] === minDistance) {
                    nearestCity = value[0]
                }
            });

            function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
                const EARTH_RADIUS = 6371;
                let deltaLat = degToRad(lat2-lat1);  // degToRad
                let deltaLon = degToRad(lon2-lon1);
                let a =
                    Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
                    Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
                    Math.sin(deltaLon/2) * Math.sin(deltaLon/2)
                ;
                let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                return EARTH_RADIUS * c; // Distance in km
            }
            function degToRad(deg) {
                return deg * (Math.PI/180)
            }
            return nearestCity;
        } else {
            console.error('incorrect params at function getDistanceFromLatLonInKm');
            return 'incorrect params'
        }
    }

    returnCityAbbreviations() {
        let abbreviations = '';
        for (let i = 0; i < this.data.length; i++) {
            if (abbreviations.indexOf(this.data[i][1]) === -1) {
                abbreviations += (this.data[i][1] + ' ');
            }
        }
        return abbreviations.trim();
    }

    getStatesCities(reqState) {
        if (reqState) {
            reqState = reqState.toUpperCase();
            let statesCities = '';
            for (let i = 0; i < this.data.length; i++) {
                if (reqState === this.data[i][1]) {
                    statesCities += this.data[i][0] + ' ';
                }
            }
            if (statesCities) {
                return statesCities;
            } else {
                return 'cities not found';
            }
        } else {
            return 'incorrect request'
        }
    }

    addCity(cityName, cityState, cityLat, cityLong) {
        if (cityName && cityState && cityLat && cityLong) {
            this.cities += ` "${cityName}, ${cityState}", ${cityLat}, ${cityLong};`;
            this.data.push([cityName, cityState, cityLat, cityLong]);
            return `"${cityName}, ${cityState}", ${cityLat}, ${cityLong}; added`
        } else {
            return 'incorrect params';
        }
    }
}