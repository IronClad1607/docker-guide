const fs = require("fs");

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function estimateSize(obj) {
  // Estimate size in bytes by stringifying the object
  return Buffer.byteLength(JSON.stringify(obj), "utf8");
}

function generateJunkData(targetSizeBytes = 1_000_000) {
  const data = {};
  let currentSize = 0;
  let keyIndex = 0;

  while (currentSize < targetSizeBytes) {
    const key = `key_${keyIndex}`;
    const valueLength = Math.floor(Math.random() * 81) + 20; // Random length between 20 and 100
    const value = generateRandomString(valueLength);
    data[key] = value;

    // Estimate size: key + value + JSON overhead (quotes, colon, comma)
    currentSize += Buffer.byteLength(`"${key}":"${value}",`, "utf8");
    keyIndex++;
  }

  return data;
}

function main() {
  const targetSizeMB = 1;
  const targetSizeBytes = targetSizeMB * 1_000_000; // 1 MB

  const junkData = generateJunkData(targetSizeBytes);

  // Convert to JSON string with indentation for readability
  const jsonString = JSON.stringify(junkData, null, 2);

  // Write to file
  fs.writeFile("junk_data.json", jsonString, "utf8", (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
      return;
    }

    // Calculate actual size
    const actualSizeBytes = Buffer.byteLength(jsonString, "utf8");
    const actualSizeMB = (actualSizeBytes / 1_000_000).toFixed(2);

    console.log(`Generated junk_data.json with size: ${actualSizeMB} MB`);
  });
}

main();
