// we need this to map the import/export statements to .js

import fs from "fs";
import glob from "glob";

// directory where the files are located
const directoryPath = "./src";

// use glob to find all .ts files in the directory
glob(`${directoryPath}/**/*.ts`, {}, (err, files) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  // loop through each file
  files.forEach((filePath) => {
    // read the file
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      // replace import/export statements without .js with .js
      const updatedData = data.replace(
        /(from\s+['"])([^'"]+)(['"])/g,
        (match, prePath, importPath, postPath) => {
          if (!importPath.startsWith(".") || importPath.endsWith(".js")) {
            return match; // skip if it's not a relative path or it already ends with .js
          }
          return `${prePath}${importPath}.js${postPath}`;
        }
      );

      // write the updated content back to the file
      fs.writeFile(filePath, updatedData, "utf8", (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      });
    });
  });
});
