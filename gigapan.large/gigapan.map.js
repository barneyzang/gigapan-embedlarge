// Initializes a Google Map with an overlay that shows the field of view (FOV)
// for a particular point

function computeLatLonFromOrigin(lat1, lon1, crs12, d12)
{
	// Based on code found at http://williams.best.vwh.net/gccalc.htm
	var dlon,lat,lon;
	
	lat1 = (Math.PI/180)*lat1;
	lon1 = (Math.PI/180)*lon1;
	crs12 = (Math.PI/180)*crs12 * -1;
	
	d12 /= 1.852;
	d12 /= (180*60/Math.PI);

	lat = Math.asin(Math.sin(lat1)*Math.cos(d12)+Math.cos(lat1)*Math.sin(d12)*Math.cos(crs12))
	dlon = Math.atan2(Math.sin(crs12)*Math.sin(d12)*Math.cos(lat1),	Math.cos(d12)-Math.sin(lat1)*Math.sin(lat))
	lon = mod(lon1-dlon+Math.PI,2*Math.PI )-Math.PI;

	var computedLatLon = new google.maps.LatLng(lat*(180/Math.PI),lon*(180/Math.PI));
	return computedLatLon;
}


// Based on code found at http://www.geocodezip.com/v3_polyline_example_arc.html
var EarthRadiusMeters = 6378137.0; // meters

function fillArcArray(center, initialBearing, finalBearing, radius) { 
	var d2r = Math.PI / 180;   // degrees to radians 
	var r2d = 180 / Math.PI;   // radians to degrees 
	
	var points = 32; 
	
	// find the raidus in lat/lon 
	var rlat = (radius / EarthRadiusMeters) * r2d; 
	var rlng = rlat / Math.cos(center.lat() * d2r); 
	
	var extp = new google.maps.MVCArray();
	
	var deltaBearing = (finalBearing - initialBearing)/points;
	for (var i=0; (i < points+1); i++) 
	{ 
		extp.push(computeLatLonFromOrigin(center.lat(), center.lng(), (initialBearing + i*deltaBearing), radius));
	} 
	return extp;
}


function initialize_map(originLat, originLon, heading, fov, id)
{
//	log(originLat);
//	log(originLon);
//	log(heading);
//	log(fov);

	var origin = new google.maps.LatLng(originLat, originLon);
	var fovArcRadius = 8;	// radius of bounding lines (in km)

	var mapOptions = {
		center: origin,
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.TERRAIN,
		scaleControl: true,
		scaleControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM },
		panControl: false,
		streetViewControl: false,
		};
	var map = new google.maps.Map(document.getElementById(id), mapOptions);

	var bounds = new google.maps.LatLngBounds(origin)
		
	// compute the FOV bounding endpoints; fill in a polyLineCoordinates array to draw on the map
	var computedLeft	= computeLatLonFromOrigin(origin.lat(), origin.lng(), (heading + fov/2), fovArcRadius);
	var computedRight	= computeLatLonFromOrigin(origin.lat(), origin.lng(), (heading - fov/2), fovArcRadius);
	
	bounds.extend(computedLeft);
	bounds.extend(computedRight);
	
	var polyLineCoordinates = [
		new google.maps.LatLng(computedLeft.lat(), computedLeft.lng()),
		new google.maps.LatLng(origin.lat(), origin.lng()),
		new google.maps.LatLng(computedRight.lat(), computedRight.lng()),
	];

	var fovBoundingLines = new google.maps.Polyline({
		path: polyLineCoordinates,
		strokeColor: "#FF0000",
		strokeOpacity: 0.6,
		strokeWeight: 3
	});
	fovBoundingLines.setMap(map)

	var arcArray = fillArcArray(origin, (heading + fov/2), (heading - fov/2), (fovArcRadius*.9));
	for (var i = 0; i < arcArray.getLength(); i++) {
		bounds.extend(arcArray.getAt(i));
	}

	// Draw the arc connecting the two bounding line, but make the radius a little shorter
	var arc = new google.maps.Polyline({
					 path: arcArray,
					 strokeColor: "#FF0000",
					 strokeOpacity: 0.6,
					 strokeWeight: 2
		 });
	arc.setMap(map);
	
	map.fitBounds(bounds);
	
	return map;
}


function mod(x,y){
	return x-y*Math.floor(x/y)
}

function log(msg) {
	setTimeout(function() {
		throw new Error(msg);
	}, 0);
}


