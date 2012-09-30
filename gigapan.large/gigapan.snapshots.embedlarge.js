
var isSnapshotDialogVisible = false;

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


function onSnapshotMouseOver(id) {
	snapshot = getSnapshotById(id);
	flashShowSnapInclusion(snapshot);
}


function onSnapshotMouseOut(id) {
	if (!isSnapshotDialogVisible) {
		return document.getElementById('flash_viewer').hideSnapInclusion(id);
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


function zoomToSnapshot(snapshot) {
	var bb = (snapshot.ymax - snapshot.ymin) * 0.02;
	if (!isSnapshotDialogVisible) {
		return document.getElementById('flash_viewer').setViewBounds(
			'onSnapshotClickSetViewBoundsReturn',
			snapshot.xmin - bb,
			snapshot.ymin - bb,
			snapshot.xmax + bb,
			snapshot.ymax + bb);
	}
}



$j(window).load(function() {
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

