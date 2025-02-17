# Basic DNS Server

This is a simple DNS server built with Node.js. It uses the `dgram` module for UDP communications and the `dns-packet` module to decode and encode DNS messages. The server listens on port `8053` and responds to DNS queries based on a basic in-memory database.

## Features

- Responds to DNS queries over UDP.
- Handles basic DNS record types:
  - `A` records (IPv4 addresses)
  - `CNAME` records (alias names)
- Simple in-memory database for mapping domain names to DNS records.
- Logs incoming queries for debugging purposes.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) installed (version 14 or higher recommended).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Running the Server

Start the DNS server by running:

```bash
node server.js
```

You should see a message like:

```
DNS Server is running on port 8053
```

## How It Works

1. **Listening for Queries:**
   - The server listens for UDP messages on port `8053`.
   
2. **Decoding DNS Requests:**
   - Incoming DNS messages are decoded using `dns-packet`.
   
3. **Querying the Database:**
   - The server checks if the queried domain exists in its in-memory database (`db`).
   
4. **Sending Responses:**
   - If a matching record is found, a DNS response is constructed and sent back to the client.
   - If not, the server logs a message indicating that the domain was not found.

## Testing the Server

You can test the DNS server using tools like `dig`:

```bash
dig @127.0.0.1 -p 8053 google.com
```

You should receive a response with the corresponding DNS record if the domain exists in the `db`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

