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
<title><?php echo $gigapan_newAPI->name; ?></title>
	
<link rel="stylesheet" type="text/css" href="gigapan.embedlarge.css">

<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript"> var $j = jQuery.noConflict();</script>
<script type="text/javascript" src="swfobject.js"></script>
<script type="text/javascript" src="gigapan.embedlarge.js"></script>
<script type="text/javascript" src="gigapan.snapshots.embedlarge.js"></script>
<?php
//include("google.analytics.php");
?>
</head>

<div class="header">
	<div class="title"><?php echo $gigapan_newAPI->name; ?> - <a href="http://gigapan.com/gigapans/<?php echo $gigapan_newAPI->id; ?>">view on gigapan.org</a></div>
	<div class="info">taken <?php echo strtok($gigapan_newAPI->taken_at, 'T'); ?>,
							
							<?php 
								// Show the number of images and columns x rows if available
								if (isset($imageDetails['Input images']))  { echo $imageDetails['Input images'] . ', '; }
							?>
							
							<?php echo $gigapan_newAPI->width; ?> x <?php echo $gigapan_newAPI->height; ?>,
							<?php printf( "%.2f", ($gigapan_newAPI->resolution/(1000*1000*1000)) ); ?> gigapixels,

							<?php
							// Show the FOV details if available (the api->field_of_view_w numbers don't always appear to be correct
							// if a 3P stitcher is used
							if (isset($imageDetails['Field of view']))
							{
								sscanf($imageDetails['Field of view'], "%f %s %s %s %f", $width, $d, $d, $d, $height);
								print '<img src="fovicon.white.width.png" height="12">';
								echo $width . '&deg';
								print ' x <img src="fovicon.white.height.png" height="12">';
								echo $height . '&deg';
							}
							?>
	</div>
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
	<div class="snapshots">snapshots
		<ol id="snapshots">
		</ol>
	</div>
	<div class="details">
		<?php
			echo 'Gear: ' . 						$imageDetails['Camera make'] . ' ' . $imageDetails['Camera model'] . '<br>';
			echo 'Capture Time: ' .					$imageDetails['Capture time'] . '<br>';
			echo 'Aperture: ' . 					$imageDetails['Aperture'] . '<br>';
			echo 'Exposure: ' . 					$imageDetails['Exposure time'] . '<br>';
			echo 'ISO: ' .							$imageDetails['ISO'] . '<br>';
			echo 'Focal Length (35mm equiv.): ' .	$imageDetails['Focal length (35mm equiv.)'] . '<br>';
		?>
	</div>
</div>


<script type="text/javascript">

// Initialize the gigapan variable used to display the main image
<?php 
// tile server path is composed of the first 3 significant digits of the id and the id itself
// example:  "http://tile104.gigapan.org/gigapans0/104141/tiles/"
$tile_server_path = 'http://tile'.substr($gigapan_newAPI->id, 0, -3).'.gigapan.org/gigapans0/'.$gigapan_newAPI->id.'/tiles/';
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
?>

var snapshots = {
	current_page: 1,
	per_page: 40,
	total_entries: <?php echo count($snapshots); ?>,
	total_pages: 1,
	items: <?php echo $snapshots_items; ?>,
	url: '/gigapans/<?php echo $gigapan_newAPI->id; ?>/snapshots.json'
};

// Build the list of snapshots along the bottom
Filmstrip.setup();

</script>

</html>