<?php
// =========================================================================
//	Returns an array of parsed json data for a given gigapan id
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
function parse_gigapan_json($id) {

	// Get the data using the new API
	$contents = file_get_contents('http://www.gigapan.com/gigapans/'.$id.'.json');
	if ($contents == false) {
		// All bets are off if the id is invalid
		trigger_error("invalid gigapan id = " . $id, E_USER_ERROR);
	}

	$contents = utf8_encode($contents);
	$contents = json_decode($contents);
	$gigapan_newAPI = $contents->gigapan;

	// Retrieve a few fields from the stitcher notes if it exists and is not empty
	$unparsed_ImageDetails = array();
	$imageDetails = array();
	if (isset($gigapan_newAPI->stitcher_notes) && !empty($gigapan_newAPI->stitcher_notes))
	{
		$unparsed_ImageDetails = explode("\n", $gigapan_newAPI->stitcher_notes);
	}
	else
	{
		// otherwise, try to parse the description for pasted in information
		// note we assume that anything after "--Image Details--" is made up of 
		// the same key-value pairs that are in the Gigapan stiching notes
		$description = explode("--Image Details--", $gigapan_newAPI->description);
		if (isset($description[1]))
			$unparsed_ImageDetails = explode("\n", $description[1]);
	}

	// Build the imageDetails key-value array
	foreach ($unparsed_ImageDetails as $imageDetailArrayItem)
	{
		// Only look at lines with a ":" in them
		if (strpos($imageDetailArrayItem, ': '))
		{
			$tempImageDetail = explode(": ", $imageDetailArrayItem);
			$imageDetails[trim($tempImageDetail[0])] = $tempImageDetail[1];
		}
	}

	// merge the root elements of the json ($gigapan_newAPI) with the parsed elements from the stitcher notes or description fields
	$imageDetails = array_merge(get_object_vars($gigapan_newAPI), $imageDetails);

	// In the description, assume the first line (up until the first "\n") is the sub_description which can be used apart from the Image Details
	$temp = explode("\n", $gigapan_newAPI->description);
	$imageDetails['sub_description'] = $temp[0];

	// parse the 'Input images' field for more granular access
	if (isset($imageDetails['Input images']))
		sscanf($imageDetails['Input images'], "%s (%s columns by %s rows)", $imageDetails['num_images'], $imageDetails['num_columns'], $imageDetails['num_rows']);

	// field_of_view_w doesn't always appear to be correct when a 3P stitcher is used, so first look at 'Field of view' extracted from the ImageDetails
	if (isset($imageDetails['Field of view']))
		// parse the 'Field of view' field for more granular access
		sscanf($imageDetails['Field of view'], "%f %s %s %s %f", $imageDetails['fov_width'], $d, $d, $d, $imageDetails['fov_height']);
	else if (isset($imageDetails['field_of_view_w']))
	{
		$imageDetails['fov_width'] = $imageDetails['field_of_view_w'];
		$imageDetails['fov_height'] = $imageDetails['field_of_view_h'];
	}

	return $imageDetails;
}


// =========================================================================
// Sample usage:
// print '<h5>last modified ' . date('Y.m.d', get_page_mod_time()) . '</h5>' . PHP_EOL;
// =========================================================================
function get_page_mod_time() { 
	date_default_timezone_set('America/Los_Angeles');

    $incls = get_included_files(); 
    $incls = array_filter($incls, "is_file"); 
    $mod_times = array_map('filemtime', $incls); 
    $mod_time = max($mod_times); 

    return $mod_time; 
} 

?>
