import type { Route } from './type';

export function generateRoutesConfig(routes: Route[]): string {
    return routes.map(route => `
    # ${route.method}
    location ${route.path} {
        proxy_pass http://${route.target};
        proxy_set_header X-Proxy-Server "${route.target}";
    }`).join('');
}
