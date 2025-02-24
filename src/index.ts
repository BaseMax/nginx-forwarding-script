import * as fs from 'fs';
import * as path from 'path';

interface Route {
  method: string;
  path: string;
  target: string;
}

interface PortConfig {
  port: number;
  gateway: string;
  routes: Route[];
}

interface Config {
  ports: PortConfig[];
}

const config: Config = {
  ports: [
    {
      port: 9004,
      gateway: '127.0.0.1:2004',
      routes: [
        { method: 'POST', path: '/user/login', target: '127.0.0.1:4561' },
        { method: 'PUT', path: '/user/update', target: '127.0.0.1:4561' },
        { method: 'GET', path: '/transaction/get', target: '127.0.0.1:9761' }
      ]
    }
  ]
};

function generateNginxConfig(portConfig: PortConfig): string {
  let config = `
server {
    listen ${portConfig.port};
    server_name localhost;

    location / {
        proxy_set_header Host $host;
        proxy_pass http://${portConfig.gateway};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
`;

  portConfig.routes.forEach(route => {
    config += `
    location ${route.path} {
        if ($request_method = ${route.method}) {
            proxy_set_header Host $host;
            proxy_pass http://${route.target};
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }
    }`;
  });

  config += `
}
`;

  return config;
}

function writeConfigToFile(port: number, configContent: string) {
  const configPath = path.join('/etc/nginx/sites-enabled', `${port}`);
  
  if (fs.existsSync(configPath)) {
    fs.unlinkSync(configPath);
  }

  fs.writeFileSync(configPath, configContent, 'utf8');
  console.log(`Config for port ${port} written to ${configPath}`);
}

function generateAllConfigs(config: Config) {
  config.ports.forEach(portConfig => {
    const nginxConfig = generateNginxConfig(portConfig);
    writeConfigToFile(portConfig.port, nginxConfig);
  });
}

generateAllConfigs(config);
