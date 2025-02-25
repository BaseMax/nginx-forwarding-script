import type { Route } from './type';

export function generateRoutesConfig(routes: Route[]): string {
    return routes.map(route => `
    # ${route.method}
    location ${route.path} {
        proxy_pass http://${route.target};
    }`).join('');
}
