const ProcessFileName = (fileName, fileType) => {
  //Separate filename and extension
  const checkFileType = typeToCheck => {
    //switch statement to preserve original file type for output file
    switch (typeToCheck) {
      case "image/png":
        return "png";
      case "image/jpg":
        return "jpg";
      case "image/jpeg":
        return "jpeg";
      default:
        return "jpg";
    }
  };

  const extensionRegExp = /\.(jpe?g|png)/i;
  const removeExtension = fileName => {
    return fileName.replace(extensionRegExp, "");
  };

  let name = removeExtension(fileName);
  let type = checkFileType(fileType);

  return { name, type };
};

export default ProcessFileName;
