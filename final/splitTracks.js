// const tracklistString = `00:00 artist 1 - Track 1
// 02:40 | artist 2 - Track 2
// 11:19 | artist 3 - Track 3
// 20:45 | artist 4 - Track 4
// 30:02 | artist 5 - Track 5
// 01:30:02 | artist 6 - Track 6`;

// const timeSeparator = "|";
// const artistSeparator = "-";

// console.log(splitTracks(tracklistString, timeSeparator, artistSeparator));

export default function splitTracks(tracklistString, timeSeparator, artistSeparator){
  const regex = new RegExp(
    `^(\\d{1,2}:\\d{2}(?::\\d{2})?)(?:[${timeSeparator}\\s]+)([^${artistSeparator}]+)(?:[${artistSeparator}\\s]+)(.+)$`,
    "gm"
  );
  //regex notes
  //group 1:  (\d{1,2}:\d{2}(?::\d{2})?)
  //  HH:MM:SS or MM:SS
  //group - time:    (?:[${timeSeparator}\s]+)
  //  matches all occurences of timeSeparator or whitespace
  //group 2 - artist:  ([^${artistSeparator}]+)
  //  matches all occurences of characters that are not artistSeparator
  //group: (?:[${artistSeparator}\s]+)
  //  matches all occurences of artistSeparator or whitespace
  //group 3 - track: (.+)
  //  the rest of the line
  let tracklistArray = [];
  let line;
  while ((line = regex.exec(tracklistString)) !== null) {
    const time = line[1];
    const artist = line[2].trim();
    const title = line[3].trim();
    tracklistArray.push({
      time: time,
      artist: artist,
      title: title
    })
  }
  return(tracklistArray)
}
