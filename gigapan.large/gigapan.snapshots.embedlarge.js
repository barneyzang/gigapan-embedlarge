
var isSnapshotDialogVisible = false;
var isMobileDevice; 


function getSnapshotById(id) {
	for (var i = 0; i < snapshots.items.length; i++) {
		if (snapshots.items[i].snapshot.id == id) {
			snapshot = snapshots.items[i].snapshot;
			return snapshot;
		}
	}
}


function flashShowSnapInclusion(snapshot) {
	if (!isSnapshotDialogVisible) {
	return document.getElementById('flash_viewer').showSnapInclusion(
		snapshot.id,
		snapshot.xmin,
		snapshot.ymin,
		snapshot.xmax,
		snapshot.ymax,
		snapshot.name,
		snapshot.description);
	}
}


this.showSnapInclusion = function(id, xmin, ymin, xmax, ymax) {
	SDViewer.viewer.showSnapInclusion(id, xmin, ymin, xmax, ymax);
}


this.hideSnapInclusion = function(id) {
	SDViewer.viewer.hideSnapInclusion(id);
}


function onSnapshotMouseOver(id) {
	snapshot = getSnapshotById(id);
	if(isMobileDevice){
		return this.showSnapInclusion(
			snapshot.id,
			snapshot.xmin,
			snapshot.ymin,
			snapshot.xmax,
			snapshot.ymax,
			snapshot.name,
			snapshot.description);
	}else{
		flashShowSnapInclusion(snapshot);
	}
}


function onSnapshotMouseOut(id) {
	if(isMobileDevice){
		return this.hideSnapInclusion(id);
	}else{
		if (!isSnapshotDialogVisible) {
			return document.getElementById('flash_viewer').hideSnapInclusion(id);
		}
	}
	return null;
}


function onSnapshotClick(id) {
	for (var i = 0; i < snapshots.items.length; i++) {
		if (id == snapshots.items[i].snapshot.id) {
			snapshot = snapshots.items[i].snapshot;
			break;
		}
	}
	id = snapshot.id

	//borderSnapshot(id);
	zoomToSnapshot(snapshot);
}


function setViewBounds (callbackFn, xmin, ymin, xmax, ymax) {
	var bounds = org.gigapan.seadragon.SeadragonUtils.convertGigapanRectToSeadragonRect(xmin, ymin, xmax, ymax, SDViewer.gigapan.width);
	SDViewer.viewer.setViewBounds(callbackFn, xmin, ymin, xmax, ymax);
	if (typeof window[callbackFn] != "undefined") {
		return window[callbackFn]();
	}
}


function zoomToSnapshot(snapshot) {
	var bb = (snapshot.ymax - snapshot.ymin) * 0.02;
	if(isMobileDevice){
		currentSnapshotId = snapshot["id"];
		hideSnapInclusion(snapshot['id']);
		return setViewBounds('hideSnapInclusion', snapshot['xmin'] - bb, snapshot['ymin'] - bb, snapshot['xmax'] + bb, snapshot['ymax'] + bb);
	}else{
		currentSnapshotId = snapshot["id"];
		return document.getElementById('flash_viewer').setViewBounds(
			'onSnapshotClickSetViewBoundsReturn',
			snapshot.xmin - bb,
			snapshot.ymin - bb,
			snapshot.xmax + bb,
			snapshot.ymax + bb);
	}
}



$j(window).load(function() {
	// initialize the global
	isMobileDevice = ( (navigator.userAgent.indexOf('iPhone') != -1) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') != -1)  || (navigator.userAgent.indexOf('Android') != -1) ) ? true : false ;

	// snapshot thumbnail mouse events
	$j(document).delegate('a.photo', "mouseover", function(e) {
		onSnapshotMouseOver($j(this).attr('id').split('_')[0]);
	});
	$j(document).delegate('a.photo', "mouseout", function(e) {
		onSnapshotMouseOut($j(this).attr('id').split('_')[0]);
	});

	// snapshot container mouse events (both thumbnail and title)
	$j(document).delegate('a.photo', "click", function(e) {
		e.preventDefault();
		onSnapshotClick($j(this).attr('id').split('_')[0]);
	});
	
	$j(document).delegate('a.snapshot_title', "mouseover", function(e) {
		onSnapshotMouseOver($j(this).attr('id').split('_')[0]);
	});

	$j(document).delegate('a.snapshot_title', "click", function(e) {
		e.preventDefault();
		onSnapshotClick($j(this).attr('id').split('_')[0]);
	});
});

