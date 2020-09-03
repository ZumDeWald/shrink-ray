import { useState } from "react";
import JSZip from "jszip";
import FileSaver from "file-saver";

const useZip = () => {
  //Setup Zip
  const [zip, setZip] = useState({});
  const [, setZipFolder] = useState({});

  const generateNewZip = identifier => {
    let newZip = new JSZip();
    let newFolder = newZip.folder(identifier);
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
