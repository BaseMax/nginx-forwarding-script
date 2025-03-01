import type { PortConfig } from './type';

export const config: { ports: PortConfig[] } = {
    ports: [
        {
            port: 9004,
            gateway: '127.0.0.1:2004',
            routes: [
                { method: '*', path: '/v1/member/register', target: '127.0.0.1:30031' },
                { method: '*', path: '/v1/login', target: '127.0.0.1:30031' },
                { method: '*', path: '/v1/verifycode', target: '127.0.0.1:30031' },
                { method: '*', path: '/v1/getforgetcode', target: '127.0.0.1:30031' },
            ]
        },
        {
            port: 9005,
            gateway: '127.0.0.1:3005',
            routes: []
        },
        {
            port: 9524,
            gateway: '127.0.0.1:2524',
            routes: []
        }
    ]
};
