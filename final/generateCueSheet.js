import splitTracks from "./splitTracks.js";
import splitTracksOneArtist from "./splitTracksOneArtist.js";

export default function generateCueString(
	artist,
	album,
	tracklist,
	path,
	date = null,
	genre = null,
	timeSplit = /\s/, //default: space
	artistSplit = "-"
) {
	let splitTracksArray;
	if (artist == null || artist == "Various Artists") {
		splitTracksArray = splitTracks(tracklist, timeSplit, artistSplit);
	} else {
		splitTracksArray = splitTracksOneArtist(tracklist, artist, timeSplit);
	}
	const header = `${genre ? "REM GENRE " + genre : ""}
${date ? "REM DATE " + date : ""}
PERFORMER "${artist}"
TITLE "${album}"
FILE "${path}" ${getFileType(path)}`;
	let cueString = header + "\n";
	splitTracksArray.forEach((track, i) => {
		const newLine = `  TRACK ${i + 1 < 10 ? "0" + (i + 1).toString() : i + 1} AUDIO
		TITLE "${track.title}"
		PERFORMER "${track.artist}"
		INDEX 01 ${formatTime(track.time)}:00`;
		cueString += newLine + "\n";
	});
	return cueString;
}

function formatTime(time) {
	if (time.indexOf(":") != 2) {
		time = "0" + time;
	}

	if ((time.match(/:/g) || []).length != 1) {
		const hours = time.substring(0, 2);
		let minutes = time.substring(3, 5);
		minutes = Number(hours) * 60 + Number(minutes);
		time = minutes + time.substring(5);
	}
	return time;
}

function replaceFileType(path) {
	let splitFilepathArray = path.split(".");
	splitFilepathArray = splitFilepathArray.slice(
		0,
		splitFilepathArray.length - 1
	);
	const filepath = `${splitFilepathArray.join(".")}.cue`;
	return filepath;
}

function getFileType(path) {
	let splitFilepathArray = path.split(".");
	return splitFilepathArray[splitFilepathArray.length - 1].toUpperCase();
}