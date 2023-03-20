export interface ShortcutsObject {
  key: string;
  actionName: string;
  throttle?: number;
  action: Function;
}
