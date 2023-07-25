import fs from "fs";
import glob from "glob";

// Directory where the files are located
const directoryPath = "./src";

console.log(`Looking for .ts files in: ${directoryPath}`);

// Use glob to find all .ts files in the directory
glob(`${directoryPath}/**/*.ts`, {}, (err, files) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Found ${files.length} files.`);

  // Loop through each file
  files.forEach((filePath) => {
    // Read the file
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      // Use a regular expression to replace import/export statements without .js with .js
      const updatedData = data.replace(
        /(from\s+['"])([^'"]+)(['"])/g,
        (match, prePath, importPath, postPath) => {
          if (!importPath.startsWith(".") || importPath.endsWith(".js")) {
            return match; // skip if it's not a relative path or it already ends with .js
          }
          return `${prePath}${importPath}.js${postPath}`;
        }
      );

      // Write the updated content back to the file
      fs.writeFile(filePath, updatedData, "utf8", (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }

        console.log(`Updated: ${filePath}`);
      });
    });
  });
});