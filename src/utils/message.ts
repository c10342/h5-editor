import { ElMessage } from "element-plus";

export function showSuccessMessage(message: string) {
  return ElMessage.success({
    message,
  });
}

export function showWarningMessage(message: string) {
  return ElMessage.warning({
    message,
  });
}

export function showErrorMessage(message: string) {
  return ElMessage.error({
    message,
  });
}
