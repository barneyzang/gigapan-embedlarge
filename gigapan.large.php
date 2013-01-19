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

	// grab the passed in "id"
	$id='';
	if (isset($_GET['id']))
	{ 
		$id=$_GET['id'];
	}
  
	// Get the data using the new API
	$contents = file_get_contents('http://www.gigapan.com/gigapans/'.$id.'.json');
	$contents = utf8_encode($contents);
	$contents = json_decode($contents);
	$gigapan_newAPI = $contents->gigapan;

	// Retrieve a few fields from the stitcher notes if it exists
	$unparsed_ImageDetails = array();
	$imageDetails = array();
	if (isset($gigapan_newAPI->stitcher_notes))
	{
		$unparsed_ImageDetails = explode("\n", $gigapan_newAPI->stitcher_notes);
	}
	else
	{
		// otherwise, try to parse the description for pasted in information
		// note we assume that anything after "--Image Details--" is made up of 
		// the same key-value pairs that are in the Gigapan stiching notes
		$description = explode("--Image Details--", $gigapan_newAPI->description);
		$unparsed_ImageDetails = explode("\n", $description[1]);
	}
	
	// Build the imageDetails key-value array
	foreach($unparsed_ImageDetails as $imageDetailArrayItem)
	{
		// Only look at lines with a ":" in them
		if (strpos($imageDetailArrayItem, ': '))
		{
			$tempImageDetail = explode(": ", $imageDetailArrayItem);
			$imageDetails[trim($tempImageDetail[0])] = $tempImageDetail[1];
		}
	}

	// Get the data using the old API (no longer needed)
//	$contents = file_get_contents('http://api.gigapan.com/beta/gigapans/'.$id.'.json');
//	$contents = utf8_encode($contents);
//	$contents = json_decode($contents);
//	$gigapan_oldAPI = $contents;
	
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<title><?php echo $gigapan_newAPI->name; ?></title>
	
	<!-- carousel stuff -->
	<link rel="stylesheet" type="text/css" href="gigapan.large/carousel/richardscarrott-jquery-ui-carousel/css/jquery.rs.carousel.css" media="all" />
	<link rel="stylesheet" type="text/css" href="gigapan.large/carousel/richardscarrott-jquery-ui-carousel/css/jquery.rs.carousel-touch.css" media="all" />
	<link rel="stylesheet" type="text/css" href="gigapan.large/carousel/gigapan.carousel.css" media="all" />

	<link rel="stylesheet" type="text/css" href="gigapan.large/gigapan.embedlarge.css">
	
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

<?php
//include("google.analytics.php");
?>
</head>

	<script type="text/javascript">
		$(document).ready(function() {
		    gigapanCarousel.init($('#container'));
		});
	</script>


<div class="header">
	<div class="title"><?php echo $gigapan_newAPI->name; ?> - <a href="http://gigapan.com/gigapans/<?php echo $gigapan_newAPI->id; ?>">view on gigapan.com</a></div>
	<div class="info">taken <?php echo strtok($gigapan_newAPI->taken_at, 'T'); ?>,
							
							<?php 
								// Show the number of images and columns x rows if available
								if (isset($imageDetails['Input images']))  { echo $imageDetails['Input images'] . ', '; }
							?>
							
							<?php echo $gigapan_newAPI->width; ?> x <?php echo $gigapan_newAPI->height; ?>,
							<?php echo round(($gigapan_newAPI->resolution/(1000*1000*1000)), 2); ?> gigapixels,

							<?php
							// Show the FOV details if available (the api->field_of_view_w numbers don't always appear to be correct
							// if a 3P stitcher is used
							if (isset($imageDetails['Field of view']))
							{
								sscanf($imageDetails['Field of view'], "%f %s %s %s %f", $fov_width, $d, $d, $d, $height);
								print '<img src="gigapan.large/fovicon.white.width.png" height="12">';
								echo $fov_width . '&deg';
								print ' x <img src="gigapan.large/fovicon.white.height.png" height="12">';
								echo $height . '&deg';
							}
							?>
	</div>
</div>

<div class="map-full" id="map-full">
</div>

<div class="gigapan-view">
	<div id="flashholder">
		<noscript>
			<div class="user-warning">
				<h1>This content requires JavaScript and Adobe Flash.</h1>
				<p>Please enable JavaScript in your web browser.</p>
			</div>
		</noscript>
	</div>
</div>

<div class="footer">
	<div class="snapshots">
		<div id="container">
			<div id="rs-carousel" class="rs-carousel module">
				<ul class="rs-carousel-runner" id="snapshots">
			</div>
		</div>
	</div>

	<div class="details">
		<?php
			if ( isset($imageDetails['Camera make']) && isset($imageDetails['Camera model']) )
				echo 'Gear: ' . $imageDetails['Camera make'] . ' ' . $imageDetails['Camera model'] . '<br>';
			
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
				echo 'Capture Time: ' .	$captureStart->format('H:i:s') . ' - ' . $captureEnd->format('H:i:s') . ' ' . $elapsedTimeString . '<br>';
			}

			if ( isset($imageDetails['Aperture']) && ($imageDetails['Aperture'] != 'unknown') )
				echo 'Aperture: ' . $imageDetails['Aperture'] . '<br>';
			
			if ( isset($imageDetails['Exposure time']) && ($imageDetails['Exposure time'] != 'unknown') )
			{
				// make the exposure time more readable
				$exposureTimeText;
				if ($imageDetails['Exposure time'] < 1)
					$exposureTimeText = '1/' . round((1/$imageDetails['Exposure time']));
				else
					$exposureTimeText = $imageDetails['Exposure time'];
				
				echo 'Exposure: ' . $exposureTimeText . '<br>';
			}

			if ( isset($imageDetails['ISO']) && ($imageDetails['ISO'] != 'unknown') )
				echo 'ISO: ' . $imageDetails['ISO'] . '<br>';
			
			if ( isset($imageDetails['Focal length (35mm equiv.)']) && ($imageDetails['Focal length (35mm equiv.)'] != 'unknown') )
				echo 'Focal Length (35mm equiv.): ' .	$imageDetails['Focal length (35mm equiv.)'] . '<br>';
		?>
			<div class="map_toggle"><a href="#" id="map_toggle">toggle map / image</a></div>
	</div>

	</div>
</div>


<script type="text/javascript">

// Initialize the gigapan variable used to display the main image
<?php 
// tile server path is composed of the first 3 significant (or padded out to 2) digits of the id and the id itself
// example: "http://tile104.gigapan.org/gigapans0/104141/tiles/"
// example: "http://tile05.gigapan.org/gigapans0/5322/tiles/"
$tile_id = str_pad($gigapan_newAPI->id, 5, "0", STR_PAD_LEFT);
$tile_server_path = 'http://tile' . substr($tile_id, 0, -3) . '.gigapan.org/gigapans0/'.$gigapan_newAPI->id . '/tiles/';
?>
var gigapan = {"gigapan":{"is_game":false,
							"tile_server_path":"<?php echo $tile_server_path; ?>",
							"id":<?php echo $gigapan_newAPI->id; ?>,
							"height":<?php echo $gigapan_newAPI->height; ?>,
							"levels":<?php echo $gigapan_newAPI->levels; ?>,
							"width":<?php echo $gigapan_newAPI->width; ?>}};
var ios_url = "http://www.gigapan.com/mobile/iOS/1.0/?id=<?php echo $gigapan_newAPI->id; ?>";

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
	url: '/gigapans/<?php echo $gigapan_newAPI->id; ?>/snapshots.json'
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
<script type="text/javascript">

<?php 
// Revert to the JSON fov data if the Image Details version isn't available
if ( !isset($fov_width) )
	$fov_width = $gigapan_newAPI->field_of_view_w;

// Disable the map toggle if not all the right data is available
if ( !isset($gigapan_newAPI->latitude) || !isset($gigapan_newAPI->longitude) || !isset($gigapan_newAPI->heading) || !isset($fov_width) )
	echo '$(".map_toggle").toggle();';
else
	echo 'var map = initialize_map(' . $gigapan_newAPI->latitude . ',' . 
										$gigapan_newAPI->longitude . ',' . 
										$gigapan_newAPI->heading . ',' .
										$fov_width . ');';

?>
</script>

<?php
//include("statcounter.php");
?>

</html>