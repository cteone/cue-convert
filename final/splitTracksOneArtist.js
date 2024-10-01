// const tracklistString = `00:00 - Track 1
// 02:40 - Track 2
// 11:19 - Track 3
// 20:45 - Track 4
// 30:02 - Track 5
// 01:30:02 - Track 6`;

// const timeSeparator = "-";
// const artistSeparator = "-";

// console.log(splitTracksOneArtist(tracklistString, "favorite artist", timeSeparator));

export default function splitTracksOneArtist(tracklistString, artist, timeSeparator){
  const regex = new RegExp(
    `^(\\d{1,2}:\\d{2}(?::\\d{2})?)(?:[${timeSeparator}\\s]+)(.+)$`,
    "gm"
  );
  //regex notes
  //group 1:  (\d{1,2}:\d{2}(?::\d{2})?)
  //  HH:MM:SS or MM:SS
  //group - time:    (?:[${timeSeparator}\s]+)
  //  matches all occurences of timeSeparator or whitespace
  //group 3 - track: (.+)
  //  the rest of the line
  let tracklistArray = [];
  let line;
  while ((line = regex.exec(tracklistString)) !== null) {
    const time = line[1];
    const title = line[2].trim();
  
    tracklistArray.push({
      time: time,
      artist: artist,
      title: title
    })
  }
  return(tracklistArray)
}
