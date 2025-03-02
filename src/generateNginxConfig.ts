import { writeConfigToFile } from './nginxPath';
import { generateRoutesConfig } from './routes';

export function generateNginxConfig(portConfig: { port: number, gateway: string, routes: any[] }): string {
    let config = `
server {
    listen ${portConfig.port};
    server_name localhost;

    location / {
        proxy_pass http://${portConfig.gateway};
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Proxy-Server "${portConfig.gateway}";

        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
        add_header 'Access-Control-Allow-Headers' 'Origin, X-Requested-With, Content-Type, Accept, Authorization' always;
        proxy_hide_header Access-Control-Allow-Origin;
        proxy_hide_header Access-Control-Allow-Methods;
        proxy_hide_header Access-Control-Allow-Headers;
        if ($request_method = OPTIONS) {
            return 204;
        }
        proxy_intercept_errors on;
        error_page 202 203 204 205 206 300 301 302 303 304 305 306 307 308 400 401 402 403 404 405 406 407 408 409 410 411 412 413 414 415 416 417 418 421 422 423 424 425 426 428 429 431 451 500 501 502 503 504 505 506 507 508 510 511 =200 @change_code;
    }
    
    location @change_code {
        return 200;
    }
`;

    config += generateRoutesConfig(portConfig.routes);

    config += `
}
`;

    return config;
}

export function generateAllConfigs(config: { ports: any[] }) {
    config.ports.forEach(portConfig => {
        const nginxConfig = generateNginxConfig(portConfig);
        writeConfigToFile(portConfig.port, nginxConfig);
    });
}
