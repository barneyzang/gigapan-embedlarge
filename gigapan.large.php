<?php
// =========================================================================
//	gigapan.large.php
//
//	This code takes a gigapan ID and builds a webpage with an extra large view 
//  of the gigapan as well as snapshots and extra details. 
//  
//	- First it tries to read the notes from the Gigapan Stitching SW
//  - For the cases where the image has been uploaded by 3P stitching sw (eg AutoPano),
// 	and doesn't have the stitching notes, the code looks in the description field
//  for "--Image Details--" and attempts to parse the text using the same key value pairs
//  as with stitching notes.  This makes it possible to copy the Stitching notes from
//  a Gigapan Stitching run into the description field and still have them show up
//	correctly.
//
// =========================================================================

// Turn on error reporting
error_reporting(E_ALL);
ini_set('display_errors', '1');


// grab the passed in "id"
$id='';
if (isset($_GET['id']))
	$id=$_GET['id'];

include './gigapan.large/parse_gigapan_json.php';

// Populate the imageDetails array
$imageDetails = array();
$imageDetails = parse_gigapan_json($id);
$dateTaken = new DateTime($imageDetails['taken_at']);

?>
<!DOCTYPE HTML>
<html lang="en">
<head>
<meta charset="utf-8">
<title><?php echo $imageDetails['name']; ?></title>
	
<!-- carousel stuff -->
<link rel="stylesheet" type="text/css" href="gigapan.large/carousel/richardscarrott-jquery-ui-carousel/css/jquery.rs.carousel.css" media="all" />
<link rel="stylesheet" type="text/css" href="gigapan.large/carousel/richardscarrott-jquery-ui-carousel/css/jquery.rs.carousel-touch.css" media="all" />
<link rel="stylesheet" type="text/css" href="gigapan.large/carousel/gigapan.carousel.css" media="all" />

<link rel="stylesheet" type="text/css" href="gigapan.large/gigapan.embedlarge.css">
<link rel="stylesheet" type="text/css" href="gigapan.large/gigapan.large.mobile.css">
	
<script type="text/javascript" src="gigapan.large/jquery.js"></script>
<script type="text/javascript"> var $j = jQuery.noConflict();</script>
<script type="text/javascript" src="gigapan.large/swfobject.js"></script>

<!-- carousel stuff -->
<script type="text/javascript" src="gigapan.large/carousel/richardscarrott-jquery-ui-carousel/js/lib/jquery.js"></script>
<script type="text/javascript" src="gigapan.large/carousel/richardscarrott-jquery-ui-carousel/js/lib/jquery.ui.widget.js"></script>
<script type="text/javascript" src="gigapan.large/carousel/richardscarrott-jquery-ui-carousel/js/jquery.rs.carousel.js"></script>
<script type="text/javascript" src="gigapan.large/carousel/gigapan.carousel.js"></script>

<script type="text/javascript" src="gigapan.large/gigapan.embedlarge.js"></script>
<script type="text/javascript" src="gigapan.large/gigapan.snapshots.embedlarge.js"></script>
<script type="text/javascript" src="gigapan.large/gigapan.embedlarge-sd.js"></script>


<?php
//include("google.analytics.php");
?>
</head>
<body>

<script type="text/javascript">
	$(document).ready(function() {
	    gigapanCarousel.init($('#container'));
	});
</script>


<div class="header">
	<div class="title"><?php print $imageDetails['name']; ?> - <a href="http://gigapan.com/gigapans/<?php echo $imageDetails['id']; ?>">view on gigapan.com</a></div>
	<div class="info">
<?php 
		print "\t\t";
		print 'taken ' . $dateTaken->format('Y.m.d') . ', ';

		// Show the number of images and columns x rows if available
		if (isset($imageDetails['Input images']))
			print $imageDetails['num_images'] . ' images (' .  $imageDetails['num_columns'] . ' columns by ' .  $imageDetails['num_rows'] . ' rows), ';
	
		print $imageDetails['width'] . ' x ' . $imageDetails['height'] . ', ';
		print round( ($imageDetails['resolution']/(1000*1000*1000)), 2) . ' gigapixels, ';

		// Show the FOV details if available (the api->field_of_view_w numbers don't always appear to be correct
		// if a 3P stitcher is used
		if (isset($imageDetails['Field of view']))
		{
			print PHP_EOL . "\t\t";
			print '<img src="gigapan.large/fovicon.white.width.png" alt="fov icon" height="12">' . $imageDetails['fov_width'] . '&deg; x ';
			print PHP_EOL . "\t\t";
			print '<img src="gigapan.large/fovicon.white.height.png" alt="fov icon" height="12">' . $imageDetails['fov_height'] . '&deg;';
		}
		print PHP_EOL;
?>
	</div>
</div>

<div class="map-full" id="map-full">
</div>

<div class="gigapan-view">
	<div id="gigapan-viewer"></div>
	<div id="flashholder"></div>
</div>

<div class="footer">
	<div class="snapshots">
		<div id="container">
			<div id="rs-carousel" class="rs-carousel module">
				<ul class="rs-carousel-runner" id="snapshots"></ul>
			</div>
		</div>
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
				if ($imageDetails['Exposure time'] < 1)
					$exposureTimeText = '1/' . round((1/$imageDetails['Exposure time']));
				else
					$exposureTimeText = $imageDetails['Exposure time'];
				
				print "\t\t" . 'Exposure: ' . $exposureTimeText . '<br>' . PHP_EOL;
			}

			if ( isset($imageDetails['ISO']) && ($imageDetails['ISO'] != 'unknown') )
				print "\t\t" . 'ISO: ' . $imageDetails['ISO'] . '<br>' . PHP_EOL;
			
			if ( isset($imageDetails['Focal length (35mm equiv.)']) && ($imageDetails['Focal length (35mm equiv.)'] != 'unknown') )
				print "\t\t" . 'Focal Length (35mm equiv.): ' .	$imageDetails['Focal length (35mm equiv.)'] . '<br>' . PHP_EOL;
?>
		<div class="map_toggle"><a href="#" id="map_toggle">toggle map / image</a></div>
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

var ios_url = "http://www.gigapan.com/mobile/iOS/1.0/?id=<?php print $imageDetails['id']; ?>";

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



<script type="text/javascript">
// Hide the map view until toggled
$(function() {
    $('.map-full').hide();
});

$("#map_toggle").click(function() {
    $(".gigapan-view").toggle();
    isSnapshotDialogVisible = !isSnapshotDialogVisible;		// we piggyback on this variable to disable javascript for thumbnails when the map is visible

    $(".map-full").toggle();
	google.maps.event.trigger(map, 'resize');
	map.fitBounds(bounds);
});
</script>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
<script type="text/javascript" src="gigapan.large/gigapan.map.js"></script>
<?php
print '<script type="text/javascript">';

// Revert to the JSON fov data if the Image Details version isn't available
if ( !isset($fov_width) )
	$fov_width = $imageDetails['field_of_view_w'];

// Disable the map toggle if not all the right data is available
if ( !isset($imageDetails['latitude']) || !isset($imageDetails['longitude']) || !isset($imageDetails['heading']) || !isset($fov_width) )
	print '$(".map_toggle").toggle();';
else
	print 'var map = initialize_map(' . $imageDetails['latitude'] . ',' . 
										$imageDetails['longitude'] . ',' . 
										$imageDetails['heading'] . ',' .
										$fov_width . ');';

?>
</script>

<?php
//include("statcounter.php");
?>
</body>
</html>