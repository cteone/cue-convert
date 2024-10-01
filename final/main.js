import * as fs from "fs";

import generateCueString from "./generateCueSheet.js";

const tracklist = `00:00 - Track 1
02:40 - Track 2
11:19 - Track 3
20:45 - Track 4
30:02 - Track 5`;

const artist = "aritst"; //use null or "Various Artists" for multiple artists
const album = "album";
const path =
	"name.cue";
const date = 2023;
const genre = "genre";

const timeSplit = "-"; //default: space
const artistSplit = "-";

const cueString = generateCueString(
	artist,
	album,
	tracklist,
	path,
	date,
	genre,
	timeSplit,
	artistSplit
);

fs.writeFile(path, cueString, (err) => {
	if (err) throw err;
});
