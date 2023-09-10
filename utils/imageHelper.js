export default function onFileChange(e, setData) {
  // console.log('🚀 ~ file: imageHelper.js:3 ~ onFileChange ~ selector:', e);
  // document.getElementById(selector).addEventListener(
  //   'change',
  async function optimise(e) {
    // Get the files
    const file = e.target.files[0];

    // console.log('🚀 ~ file: imageHelper.js:8 ~ file:', file);
    // No files selected
    if (!file) return;

    // We'll store the files in this data transfer object
    const dataTransfer = new DataTransfer();

    if (!file.type.startsWith('image')) {
      // Ignore this file, but do add it to our result
      dataTransfer.items.add(file);
      return;
    }
    // console.log('isImage');

    // We compress the file by 50%
    const compressedFile = await compressImage(file, {
      quality: 0.5,
      type: 'image/jpeg',
    });

    console.log(
      '🚀 ~ file: imageHelper.js:29 ~ optimise ~ compressedFile:',
      compressedFile,
    );

    // Save back the compressed file instead of the original file
    dataTransfer.items.add(compressedFile);

    // Set value of the file input to our new files list
    e.target.files = dataTransfer.files;

    return await readURL('selector', e.target, setData);
  }
  return optimise(e);
  //   { capture: true, passive: true },
  // );
}

async function compressImage(file, { quality = 1, type = file.type }) {
  // console.log('🚀 ~ file: imageHelper.js:49 ~ compressImage ~ file:', file);
  // Get as image data
  const imageBitmap = await createImageBitmap(file);

  // console.log(
  //   '🚀 ~ file: imageHelper.js:51 ~ compressImage ~ imageBitmap:',
  //   imageBitmap,
  // );

  // Draw to canvas
  const canvas = document.createElement('canvas');
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imageBitmap, 0, 0);

  // Turn into Blob
  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, type, quality),
  );

  // console.log('🚀 ~ file: imageHelper.js:63 ~ compressImage ~ blob:', blob);

  // Turn Blob into File
  return new File([blob], file.name, {
    type: blob.type,
  });
}

function readURL(selector, input, setData) {
  // console.log(
  //   '🚀 ~ file: imageHelper.js:66 ~ readURL ~ input:',
  //   input.files[0],
  // );
  let imageURL;
  if (input.files[0].name) {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        imageURL = e.target.result;
        // $(`${selector} .img`).attr('src', e.target.result);
        console.log(
          '🚀 ~ file: imageHelper.js:64 ~ returnnewPromise ~ e.target.result:',
          e.target.result,
        );
        resolve(e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
      setData((prev) => ({ ...prev, picture: input.files[0] }));
    });
  }
}
