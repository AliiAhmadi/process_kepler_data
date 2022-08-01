const { parse } = require("csv-parse");
const fs = require("fs");
//
let HabitablePlanets = [];
let HabitablePlanetsNames = [];

// for evry planet check that is it habitable or not ? :)
function IsHabitablePlanet(PlanetObj) {
  return (
    PlanetObj["koi_disposition"] === "CONFIRMED" &&
    PlanetObj["koi_insol"] > 0.36 &&
    PlanetObj["koi_insol"] < 1.11 &&
    PlanetObj["koi_prad"] < 1.6
  );
}

// Start reading and pipe the stream with parse function for convert csv files to Objects
fs.createReadStream("./kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  ) // set on function for any chunck of data receive
  .on("data", (data) => {
    if (IsHabitablePlanet(data)) {
      HabitablePlanets.push(data);
    }
  }) // set on function for end reading process
  .on("end", () => {
    HabitablePlanets.forEach((PlanetObj) => {
      HabitablePlanetsNames.push(PlanetObj["kepler_name"]);
    });
    console.log(HabitablePlanets.length);
    // console.log(HabitablePlanets);
    console.log(HabitablePlanetsNames);
    // write final result to  Result.txt file !
    fs.writeFile(
      "./Result.txt",
      JSON.stringify(HabitablePlanets),
      "utf-8",
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Done !");
        }
      }
    );
  });
//koi_insol
