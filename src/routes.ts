import type { Route } from './type';

export function generateRoutesConfig(routes: Route[]): string {
    return routes.map(route => `
        location ${route.path} {
            if ($request_method = ${route.method}) {
                proxy_set_header Host $host;
                proxy_pass http://${route.target};
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
            }
        }`).join('');
}
