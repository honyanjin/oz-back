import fs from "fs";

function testFS() {
  console.log("fs START");

  fs.writeFileSync("test.txt", "Hello World");
  const data = fs.readFileSync("test.txt", "utf8");
  console.log("test.txt:", data);
  console.log("fs END");
}

export default testFS;