import { execute, buildInputFile } from "wasm-imagemagick";

//ImageMagick
async function Magick(file, rendition, index) {
  let commandOptions = [];
  let commandString = ``;
  let hasResize = false;
  let hasReduce = false;
  let outputFileName = "";

  // mogrify -path OUTPUT_PATH -filter Triangle -define filter:support=2 -thumbnail OUTPUT_WIDTH -unsharp 0.25x0.25+8+0.065 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB -strip INPUT_PATH

  if (rendition.resize !== "off" && !!rendition.reduce) {
    hasResize = true;
    hasReduce = true;
    commandString = `convert inputImage.${rendition.fileType} -resize ${rendition.resize} -quality 82 -define png:compression-filter=5 -define png:compression-level=9 -interlace none -colorspace sRGB -strip final_v${index}.${rendition.fileType}`;
  } else if (rendition.resize !== "off" && !rendition.reduce) {
    hasResize = true;
    commandString = `convert inputImage.${rendition.fileType} -resize ${rendition.resize} final_v${index}.${rendition.fileType}`;
  } else if (rendition.resize === "off" && !!rendition.reduce) {
    hasReduce = true;
    commandString = `convert inputImage.${rendition.fileType} -quality 82 -define png:compression-filter=5 -define png:compression-level=9 -interlace none -colorspace sRGB -strip final_v${index}.${rendition.fileType}`;
  } else {
    throw new Error(
      `No changes given for rendition ${index + 1} of ${
        file.name
      }, it will be skipped`
    );
  }

  if (!!hasResize && !!hasReduce) {
    outputFileName = `${rendition.fileName}_${rendition.resize}_shrunk`;
  } else if (!hasResize && !!hasReduce) {
    outputFileName = `${rendition.fileName}_shrunk`;
  } else if (!!hasResize && !hasReduce) {
    outputFileName = `${rendition.fileName}_${rendition.resize}`;
  } else {
    outputFileName = rendition.fileName;
  }

  commandOptions.push(commandString);

  const { outputFiles, exitCode, stderr } = await execute({
    inputFiles: [
      await buildInputFile(
        URL.createObjectURL(file),
        `inputImage.${rendition.fileType}`
      ),
    ],
    commands: commandOptions,
  });

  if (exitCode) {
    alert(`There was an error with the command: ${stderr.join("\n")}`);
  } else {
    return {
      extensionlessFileName: outputFileName,
      fileType: rendition.fileType,
      processedImages: [...outputFiles],
    };
  }
}

export default Magick;
