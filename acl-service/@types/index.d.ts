export interface TRouteConfig {
  [path: string]: {
    [method: string]: TRole[];
  }
}