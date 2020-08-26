# Shrink Ray

This app aims to be a one stop shop for resizing and compressing images to be web-ready.

## -- Under the hood --

### Image Magick

Image processing is done using [WASM-ImageMagick](https://www.npmjs.com/package/wasm-imagemagick) which is a Web Assembly version of [ImageMagick](https://imagemagick.org/index.php) -- a powerful image manipulation tool.

Currently this tool uses the `-resize`, `-quality`, and `-strip` options.

### Adobe React Spectrum

Shrink-Ray's UI is built with [Adobe React Spectrum](https://react-spectrum.adobe.com/react-spectrum/index.html), a React implementation of Adobe's Spectrum Design System.

### JSZip

Shrink-Ray uses [JSZip](https://stuk.github.io/jszip/) to build a zip folder for the images to be placed in for download.

### Drop Zone

This [Smashing Magazine Article](https://www.smashingmagazine.com/2020/02/html-drag-drop-api-react/) by [Chidi Orji](https://www.smashingmagazine.com/author/chidi-orji/) was a huge help in creating the Drop Zone implemented in Shrink-Ray

## -- Contributing --

This project is fully open to useful contributions. If you would like to contribute, please read the short mission statement and follow the contributing guidelines as best you can.

### The short mission statement

Shrink-Ray was designed to be a _client-side only_ tool that has _no interest_ in placing cookies, tracking users, or moving the image files to a server for processing. When the tool loads in the browser it should have everything it needs to operate.

### Steps to contribute

Please review the active issues on the main repo to see what might need done. There may be a bug fix or enhancement calling out to you!

- Fork the main project repo
- Make your own branch off of the `dev` branch
- Try to keep commits small and commit messages meaningful as you work
- Do not make large, wide-scoped changes all at once. _If you want to work on multiple features / bugs please make a branch / PR for each one individually_
- Put in a PR from your Fork to the `dev` branch of the main project repo
- In the PR write specific but brief details about what was done (e.g. "Added loading screen while images are processed; Loading screen now triggers when `processing === 'processing'`", etc..)

### New Ideas

Have an idea for a new feature? Found a bug that you can't shake? Review the existing issues carefully and see if someone else got there first. If so, feel free to add your comment to the issue. If not, please add an issue with as much detail about the new feature / bug as you can.

- New Features -- How would / should it work? Are you willing/able to add this feature?
- Bugs -- What are you doing with the tool when it happens? How many files, what type, what operating system / device, etc...

## -- Feature List --

### Tool Functionality

- [x] Up to 5 images can be added to the tool at a time
- [x] Up to 5 'renditions' of each image can be made
- [x] User can rename the file and every rendition takes this new name
- [x] User can choose to resize and reduce file size of each rendition
- [x] User can set the resize width
- [ ] Drop Zone changes to something indicating processing
- [x] Finished files are zipped together for download
- [x] User can reset the app without reloading the page

### Other Stuff

- [ ] About page - how the tools works
- [ ] About page - security of app (no cookies, no tracking, etc.)
- [ ] Link on page to contribute to this repo
