function onFileChange(selector) {
  $(document).on('change', `${selector} input:file`, async function (e) {
    // Get the files
    const file = e.target.files[0];
    // No files selected
    if (!file) return;

    // We'll store the files in this data transfer object
    const dataTransfer = new DataTransfer();

    if (!file.type.startsWith('image')) {
      // Ignore this file, but do add it to our result
      dataTransfer.items.add(file);
      return;
    }

    // We compress the file by 50%
    const compressedFile = await compressImage(file, {
      quality: 0,
      type: 'image/jpeg',
    });

    // Save back the compressed file instead of the original file
    dataTransfer.items.add(compressedFile);

    // Set value of the file input to our new files list
    e.target.files = dataTransfer.files;

    await readURL(selector, e.target);
  });
}

async function compressImage(file, { quality = 1, type = file.type }) {
  // Get as image data
  const imageBitmap = await createImageBitmap(file);

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

  // Turn Blob into File
  return new File([blob], file.name, {
    type: blob.type,
  });
}

function readURL(selector, input) {
  if (input.files[0].name) {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        $(`${selector} .img`).attr('src', e.target.result);
        resolve();
      };

      reader.readAsDataURL(input.files[0]);
    });
  }
}
