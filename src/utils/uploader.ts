import { uploadImage } from "@/api";

type FnType = (data?: any) => any;

type InterceptManageCbItem = { resolve: FnType; reject?: FnType };

class InterceptManage {
  private cbs: Array<InterceptManageCbItem>;

  constructor() {
    this.cbs = [];
  }

  use(onResolveFn: FnType, onRejectFn?: FnType) {
    this.cbs.push({
      resolve: onResolveFn,
      reject: onRejectFn,
    });
    return this;
  }

  forEach(callback: (data: InterceptManageCbItem) => any) {
    this.cbs.forEach((cbItem) => {
      callback(cbItem);
    });
    return this;
  }
}

class Uploader {
  private inputElement: HTMLInputElement | null = null;
  private resolvePromise: FnType | null = null;
  private rejectPromise: FnType | null = null;
  interceptors = {
    request: new InterceptManage(),
    response: new InterceptManage(),
  };
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
    const china: Array<FnType | null | undefined> = [
      this.handleUploadFile.bind(this),
      null,
    ];
    this.interceptors.request.forEach((item) => {
      china.unshift(item.resolve, item.reject);
    });
    this.interceptors.response.forEach((item) => {
      china.push(item.resolve, item.reject);
    });
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

  destroy() {
    this.inputElement?.remove();
    this.inputElement = null;
    this.resetData();
  }
}

export default Uploader;
