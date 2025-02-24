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
