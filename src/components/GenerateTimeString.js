export default function GenerateTimeString() {
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

  return generateNewTimeString;
}
