import { useState } from "react";
import JSZip from "jszip";
import FileSaver from "file-saver";

const useZip = () => {
  //Get time string if needed for multiple Zip's
  const intlOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const generateNewTimeString = () => {
    return new Intl.DateTimeFormat("default", intlOptions)
      .format(new Date())
      .replace(/:/g, ".");
  };

  //Setup Zip
  const [zip, setZip] = useState({});
  const [, setZipFolder] = useState({});

  // useEffect(() => {
  //   let newZip = new JSZip();
  //   let newFolder = newZip.folder(generateNewTimeString());
  //
  //   setZip(newZip);
  //   setZipFolder(newFolder);
  //   //eslint-disable-next-line
  // }, []);

  const generateNewZip = () => {
    let newZip = new JSZip();
    let newFolder = newZip.folder(generateNewTimeString());
    setZip(newZip);
    setZipFolder(newFolder);
  };

  const completeZip = () => {
    zip.generateAsync({ type: "blob" }).then(blob => {
      FileSaver.saveAs(blob, "shrunk.zip");
    });
  };

  return [completeZip, generateNewZip, setZipFolder];
};

export default useZip;
