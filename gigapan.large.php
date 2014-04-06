<?php
// =========================================================================
//	gigapan.large.php
//
//	This code takes a gigapan ID and builds a webpage with an extra large view 
//  of the gigapan as well as snapshots and extra details. 
//  
// =========================================================================

// Turn on error reporting
error_reporting(E_ALL);
ini_set('display_errors', '1');

// grab the passed in "id"
if (isset($_GET['id']))
	$id=$_GET['id'];
else
	trigger_error("no gigapan id passed in -- use gigapan.large.php?id=X where X is a valid gigapan id", E_USER_ERROR);

// Support for a user passed in parameter that can specify the desired viewer
// Note: this only works to force use of the sea dragon viewer in cases where flash is also an option.
// That is, when flash isn't available, the sea dragon viewer will always be used.
$viewer = 'flash';		// Assume that the default viewer is flash
if ( isset($_GET['viewer']) ) {
	switch ($_GET['viewer']) {
		case 'sd':		$viewer = 'sd'; break;
		case 'flash':	$viewer = 'flash'; break;
		default: trigger_error("invalid viewer parameter -- use '&viewer=sd' or '&viewer=flash'", E_USER_ERROR);
	}
}

include './gigapan.large/parse_gigapan_json.php';

// Populate the imageDetails array
$imageDetails = array();
$imageDetails = parse_gigapan_json($id);

?>
<!DOCTYPE HTML>
<html lang="en">
<head>
<meta charset="utf-8">
<title><?php echo $imageDetails['name']; ?></title>

<link rel="stylesheet" type="text/css" href="gigapan.large/gigapan.embedlarge.css">
<link rel="stylesheet" type="text/css" href="gigapan.large/gigapan.large.mobile.css">

<!-- bxslider carousel stuff -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script src="gigapan.large/jquery.bxslider/jquery.bxslider.min.js"></script>
<link href="gigapan.large/jquery.bxslider/jquery.bxslider.css" rel="stylesheet" />

<!-- gigapan jquery -->
<script type="text/javascript" src="gigapan.large/jquery.js"></script>
<script type="text/javascript"> var $j = jQuery.noConflict();</script>
<?php if ($viewer == 'flash') { ?>

<!-- flash viewer support -->
<script type="text/javascript" src="gigapan.large/swfobject.js"></script>
<?php } ?>

<!-- gigapan.large support -->
<script type="text/javascript" src="gigapan.large/gigapan.embedlarge.js"></script>
<script type="text/javascript" src="gigapan.large/gigapan.snapshots.embedlarge.js"></script>
<script type="text/javascript" src="gigapan.large/gigapan.embedlarge-sd.js"></script>

<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="width=device-width, maximum-scale=1, user-scalable=no">

<?php
//include("google.analytics.php");
?>
</head>

<?php
// Check to see if enough information is associated with the image to draw a meaningful map
$hasMapInfo = ( (isset($imageDetails['latitude'])) && 
				(isset($imageDetails['longitude'])) &&
				(isset($imageDetails['heading'])) &&
				(isset($imageDetails['fov_width']) && ($imageDetails['fov_width'] != 0)) );
?>

<script type="text/javascript">
$(document).ready(function() {
	// Setup the snapshot carousel
	$('.bxslider').bxSlider({
		slideWidth: 90,
		infiniteLoop: false,
		minSlides: 0,
		maxSlides: 25,
		slideMargin: 5
	});
	
<?php if ( $hasMapInfo ) { ?>
	// Initialize the map view
	$('.mapView').hide();
<?php } ?>
});
	
<?php
// Support for a user passed in parameter that can specify the desired viewer
// Note: this only works to force use of the sea dragon viewer in cases where flash is also an option.
// That is, when flash isn't available, the sea dragon viewer will always be used.
if ( $viewer == 'sd' )
	print 'var forceShowSDViewer = true;' . PHP_EOL;
else
	print 'var forceShowSDViewer = false;' . PHP_EOL;
?>
</script>


<body>

<div class="header">
	<div class="title"><?php print $imageDetails['name']; ?> - <a href="http://gigapan.com/gigapans/<?php echo $imageDetails['id']; ?>">view on gigapan.com</a></div>
	<div class="info">
<?php 
		$dateTaken = new DateTime($imageDetails['taken_at']);
		print "\t\t" . 'taken ' . $dateTaken->format('Y.m.d') . ', ';

		// Show the number of images and columns x rows if available
		if (isset($imageDetails['Input images']))
			print $imageDetails['num_images'] . ' images (' .  $imageDetails['num_columns'] . ' columns by ' .  $imageDetails['num_rows'] . ' rows), ';
	
		print $imageDetails['width'] . ' x ' . $imageDetails['height'] . ', ';
		print round( ($imageDetails['resolution']/(1000*1000*1000)), 2) . ' gigapixels';

		// Show the FOV details if available
		if (isset($imageDetails['fov_width']) && ($imageDetails['fov_width'] != 0))
		{
			print ', ' . PHP_EOL . "\t\t";
			print '<img src="gigapan.large/fovicon.white.width.png" alt="fov icon" height="12">' . $imageDetails['fov_width'] . '&deg;';

			if (isset($imageDetails['fov_height']) && ($imageDetails['fov_height'] != 0))
			{
				print ' x ';
				print PHP_EOL . "\t\t";
				print '<img src="gigapan.large/fovicon.white.height.png" alt="fov icon" height="12">' . $imageDetails['fov_height'] . '&deg;';
			}
		}
		print PHP_EOL;
?>
	</div>
</div>

<div class="mapView" id="mapView">
</div>

<div class="gigapan-view">
	<div id="gigapan-viewer"></div>
	<div id="flashholder"></div>
</div>

<div class="footer">
	<div class="snapshots">
		<ul class="bxslider" id="snapshots"></ul>
	</div>

	<div class="details">
<?php
			if ( isset($imageDetails['Camera make']) && isset($imageDetails['Camera model']) )
				print "\t\t" . 'Gear: ' . $imageDetails['Camera make'] . ' ' . $imageDetails['Camera model'] . '<br>' . PHP_EOL;
			
			if ( isset($imageDetails['Capture time']) && ($imageDetails['Capture time'] != 'unknown') )
			{
				// Format the capture time, including calculation of elapsed time
				$captureTimes = explode(" - ", $imageDetails['Capture time']);
				$captureStart = DateTime::createFromFormat('Y-m-d H:i:s', trim($captureTimes[0]));
				$captureEnd = DateTime::createFromFormat('Y-m-d H:i:s', trim($captureTimes[1]));

				// Sometimes the date is omitted from the end time, so it's necessary to reparse assuming a slightly different format
				if (!($captureEnd))
					$captureEnd = DateTime::createFromFormat('H:i:s', trim($captureTimes[1]));

				$captureElapsedTime = date_diff($captureStart, $captureEnd);
				$elapsedTimeString = $captureElapsedTime->format('(%H:%I:%S)');
				print "\t\t" . 'Capture Time: ' .	$captureStart->format('H:i:s') . ' - ' . $captureEnd->format('H:i:s') . ' ' . $elapsedTimeString . '<br>' . PHP_EOL;
			}

			if ( isset($imageDetails['Aperture']) && ($imageDetails['Aperture'] != 'unknown') )
				print "\t\t" . 'Aperture: ' . $imageDetails['Aperture'] . '<br>' . PHP_EOL;
			
			if ( isset($imageDetails['Exposure time']) && ($imageDetails['Exposure time'] != 'unknown') )
			{
				// make the exposure time more readable
				$exposureTimeText;
				if (($imageDetails['Exposure time'] > 0) && ($imageDetails['Exposure time'] < 1))
					$exposureTimeText = '1/' . round((1/$imageDetails['Exposure time']));
				else
					$exposureTimeText = $imageDetails['Exposure time'];
				
				print "\t\t" . 'Exposure: ' . $exposureTimeText . '<br>' . PHP_EOL;
			}

			if ( isset($imageDetails['ISO']) && ($imageDetails['ISO'] != 'unknown') )
				print "\t\t" . 'ISO: ' . $imageDetails['ISO'] . '<br>' . PHP_EOL;
			
			if ( isset($imageDetails['Focal length (35mm equiv.)']) && ($imageDetails['Focal length (35mm equiv.)'] != 'unknown') )
				print "\t\t" . 'Focal Length (35mm equiv.): ' .	$imageDetails['Focal length (35mm equiv.)'] . '<br>' . PHP_EOL;

			if ( $hasMapInfo )
				print "\t\t" . '<div class="mapView_toggle"><a href="#" id="mapView_toggle">toggle map / image</a></div>' . PHP_EOL;
?>
	</div>
</div>


<script type="text/javascript">

// Initialize the gigapan variable used to display the main image
<?php 
// tile server path is composed of the first 3 significant (or padded out to 2) digits of the id and the id itself
// example: "http://tile104.gigapan.org/gigapans0/104141/tiles/"
// example: "http://tile05.gigapan.org/gigapans0/5322/tiles/"
$tile_id = str_pad($imageDetails['id'], 5, "0", STR_PAD_LEFT);
$tile_server_path = 'http://tile' . substr($tile_id, 0, -3) . '.gigapan.org/gigapans0/' . $imageDetails['id'] . '/tiles/';
?>
var gigapan = {"gigapan":{"is_game":false,
			"tile_server_path":"<?php echo $tile_server_path; ?>",
			"id":<?php print $imageDetails['id']; ?>,
			"height":<?php print $imageDetails['height']; ?>,
			"levels":<?php print $imageDetails['levels']; ?>,
			"width":<?php print $imageDetails['width']; ?>}};

<?php
	// Get the snapshot data
	$snapshots = file_get_contents('http://www.gigapan.com/gigapans/'.$id.'/snapshots.json');
	$snapshots_items = utf8_encode($snapshots);
	$snapshots = json_decode($snapshots_items);
?>
var snapshots = {
	current_page: 1,
	per_page: 40,
	total_entries: <?php echo count($snapshots); ?>,
	total_pages: <?php echo round((count($snapshots) / 40)); ?>,
	items: <?php echo $snapshots_items; ?>,
	url: '/gigapans/<?php echo $imageDetails['id']; ?>/snapshots.json'
};

// Build the list of snapshots along the bottom
Filmstrip.setup();

</script>

<?php 
if ( $hasMapInfo ) {
?>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
<script type="text/javascript" src="gigapan.large/gigapan.map.js"></script>
<script>
var map;

$("#mapView_toggle").click(function() {
	$(".gigapan-view").fadeToggle();
	$(".mapView").fadeToggle();

	if ($("#mapView").is(':visible')) {
		// Initialize the map only once
		if ( typeof map === 'undefined' ) {
<?php
			print "\t\t\t" . 'map = initialize_map(' . $imageDetails['latitude'] . ',' . 
												$imageDetails['longitude'] . ',' . 
												$imageDetails['heading'] . ',' .
												$imageDetails['fov_width'] . ',' .
												'"mapView");' . PHP_EOL;
?>
		}
		google.maps.event.trigger(map, 'resize');
	}
});
</script>
<?php } ?>

<?php
//include("statcounter.php");
?>
</body>
</html>