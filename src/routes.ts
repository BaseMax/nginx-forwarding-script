import type { Route } from './type';

export function generateRoutesConfig(routes: Route[]): string {
    return routes.map(route => `
    location = ${route.path} {
        if ($request_method = ${route.method}) {
            proxy_pass http://${route.target};
        }
    }`).join('');
}
