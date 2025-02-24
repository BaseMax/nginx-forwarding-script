import type { PortConfig } from './type';

export const config: { ports: PortConfig[] } = {
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
