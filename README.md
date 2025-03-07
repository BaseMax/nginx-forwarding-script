# Nginx Forwarding Script

A simple Node.js script for generating and managing Nginx forwarding configurations dynamically.

## Features

- Automatically generates Nginx configuration files based on predefined routes.
- Supports multiple ports and route-based forwarding.
- Includes Cross-Origin Resource Sharing (CORS) headers.
- Manages existing configurations by overwriting outdated files.

## Installation

### Prerequisites

- Node.js (Latest LTS recommended)
- Nginx installed and configured on your system

### Clone the Repository

```sh
git clone https://github.com/BaseMax/nginx-forwarding-script.git
cd nginx-forwarding-script
```

### Install Dependencies

```sh
bun install
```

## Usage

### Configuration

Modify `src/configRoutes.ts` to define your forwarding rules. Example:

```ts
export const config: { ports: PortConfig[] } = {
    ports: [
        {
            port: 9004,
            gateway: '127.0.0.1:2004',
            routes: [
                { method: 'POST', path: '/v1/member/register', target: '127.0.0.1:30031' },
                { method: 'POST', path: '/v1/login', target: '127.0.0.1:30031' }
            ]
        }
    ]
};
```

### Run the Script

```sh
bun run update
bun run reload
bun run restart
```

This will generate the Nginx configuration files in the specified path and apply the forwarding rules.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Copyright

&copy; 2025 Max Base.
