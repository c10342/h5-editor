import { uploadImage } from "@/api";

type fn = (data?: any) => any;

type BeforeUploadFn = (file: File) => Promise<File> | File;

class UploadImage {
  private inputElement: HTMLInputElement | null = null;
  private resolvePromise: fn | null = null;
  private rejectPromise: fn | null = null;
  private beforeUploadFn: BeforeUploadFn | null | undefined = null;
  constructor() {
    this.initDom();
  }

  private initDom() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.style.display = "none";
    document.body.appendChild(input);
    input.addEventListener("change", (event: Event) => {
      this.onChange(event);
    });
    this.inputElement = input;
  }

  private onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.uploadFile(target.files[0]);
    }
  }

  private handleUploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return uploadImage(formData);
  }

  private uploadFile(file: File) {
    const china = [this.beforeUploadFn, this.handleUploadFile.bind(this)];
    let p: any = Promise.resolve(file);
    while (china.length) {
      p = p.then(china.shift());
    }
    p.then((res: any) => {
      this.handleResolve(res);
    })
      .catch((error: any) => {
        this.handleReject(error);
      })
      .finally(() => {
        this.resetData();
        this.clear();
      });
  }

  private handleResolve(data: any) {
    this.resolvePromise && this.resolvePromise(data);
  }

  private handleReject(error: any) {
    this.rejectPromise && this.rejectPromise(error);
  }

  private resetData() {
    this.resolvePromise = null;
    this.rejectPromise = null;
    this.beforeUploadFn = null;
  }

  clear() {
    if (this.inputElement) {
      this.inputElement.value = "";
    }
  }

  start() {
    this.clear();
    this.inputElement?.click();
    const promise = new Promise((resolve, reject) => {
      this.resolvePromise = resolve;
      this.rejectPromise = reject;
    });
    return promise;
  }

  beforeUpload(beforeUploadFn: BeforeUploadFn) {
    this.beforeUploadFn = beforeUploadFn;
    return this;
  }

  destroy() {
    this.inputElement?.remove();
    this.inputElement = null;
    this.resetData();
  }
}

export default UploadImage;
