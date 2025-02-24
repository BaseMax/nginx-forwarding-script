export interface Route {
    method: string;
    path: string;
    target: string;
}

export interface PortConfig {
    port: number;
    gateway: string;
    routes: Route[];
}
