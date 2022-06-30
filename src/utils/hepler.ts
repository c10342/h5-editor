export const getImageDimensions = (file: File | string) => {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image();
    img.src = typeof file === "string" ? file : URL.createObjectURL(file);
    // the following handler will fire after the successful loading of the image
    img.onload = () => {
      const { naturalWidth: width, naturalHeight: height } = img;
      resolve({ width, height });
    };
    // and this handler will fire if there was an error with the image (like if it's not really an image or a corrupted one)
    img.onerror = () => {
      reject(new Error("There was some problem with the image."));
    };
  });
};

export const getParentElement = (element: HTMLElement, className: string) => {
  while (element) {
    if (element.classList && element.classList.contains(className)) {
      return element;
    } else {
      element = element.parentNode as HTMLElement;
    }
  }
  return null;
};

export const downLoadFile = (src: string, fileName: string) => {
  const a = document.createElement("a");
  a.href = src;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
