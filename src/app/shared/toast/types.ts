export interface SysToast {
  success(message: string): void;
  danger(message: string): void;
  info(message: string): void;
  warning(message: string): void;
}
