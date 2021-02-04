export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const filename = file.name
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve({ filename: filename, b64img: reader.result });
      reader.onerror = error => reject(error);
    });
}