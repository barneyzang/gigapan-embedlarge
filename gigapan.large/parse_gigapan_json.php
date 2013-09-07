<?php
// =========================================================================
//	Returns an array of parsed json data for a given gigapan id
//  Is smart about looking in --Image Details--
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
		if (isset($description[1]))
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

	// In the description, assume the first line (up until the first "\n") is the sub_description which can be used
	// apart from the Image Details
	$temp = explode("\n", $gigapan_newAPI->description);
	$imageDetails['sub_description'] = $temp[0];

	// parse the 'Input images' field for more granular access
	if (isset($imageDetails['Input images']))
		sscanf($imageDetails['Input images'], "%s (%s columns by %s rows)", $imageDetails['num_images'], $imageDetails['num_columns'], $imageDetails['num_rows']);

	// parse the 'Field of view' field for more granular access
	if (isset($imageDetails['Field of view']))
		sscanf($imageDetails['Field of view'], "%f %s %s %s %f", $imageDetails['fov_width'], $d, $d, $d, $imageDetails['fov_height']);

	return array_merge(get_object_vars($gigapan_newAPI), $imageDetails);
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