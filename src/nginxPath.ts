import path from 'path';
import { existsSync, unlinkSync, writeFileSync } from 'fs';

export function writeConfigToFile(port: number, configContent: string) {
    const configPath = path.join('/etc/nginx/sites-enabled', `${port}`);

    if (existsSync(configPath)) {
        unlinkSync(configPath);
    }

    writeFileSync(configPath, configContent, 'utf8');
    console.log(`Config for port ${port} written to ${configPath}`);
}
