# 📡 SonarQube Local Deployment with ngrok Tunnel (CI/CD-Ready)
This project sets up a local SonarQube server with a PostgreSQL database and exposes it securely to the public via ngrok, allowing remote access and integration with GitHub Actions or any CI/CD pipeline.

---

## 🚀 Overview

### This setup provides:
- A persistent local SonarQube environment using Docker.
- PostgreSQL as the backend database.
- A secure ngrok HTTPS tunnel for remote access to SonarQube.
- Full compatibility with GitHub Actions SonarQube scans.

---

# 🚀 Quick Start
## 🧩 Prerequisites
Ensure you have:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Ngrok account](https://ngrok.com/) (free tier available)


## ⚙️ Environment Setup
### 1. Get Ngrok Authtoken
- Sign up at ngrok.com
- Get your authtoken from the dashboard
- Create a `.env` file in the same directory as docker-compose:
    ```bash
    echo "NGROK_AUTHTOKEN= <your_ngrok_authtoken_here>" > .env
    ```
### 2. Start the Services
```bash
docker compose up -d
```
> ⚠️ **Annotations:** Make sure that `vm.max_map_count` value is >= `262144` to run **SonarQube** server.
> ```bash
> sudo sysctl -w vm.max_map_count=262144
> ``` 

### 3. Access the Services
- SonarQube UI: http://localhost:9000
- Ngrok Dashboard: http://localhost:4040

### 4. Get Your Public URL
1. Check ngrok status dashboard: http://localhost:4040/status
2. Copy the Forwarding URL
- `Or`
Check ngrok server logs
```bash
docker compose logs ngrok
```


### 5. Initial SonarQube Setup
1. Open http://localhost:9000 **OR** Your ngrok public URL
2. Login with default credentials: admin / admin
3. Change password when prompted
4. Generate an access token: `Go to your profile → Security → Generate Tokens`
5. Name: github-actions
6. Copy the token immediately (you won't see it again)

### 6. Configure GitHub Secrets
`Go to your repository → Settings → Secrets and variables → Actions`
- Add these secrets:

| Secret Name | Value |
|----------|---------|
| **SONAR_HOST_URL** | Your ngrok URL (e.g., https://abc-123-456.ngrok.io) |
| **SONAR_TOKEN** | SonarQube token you generated |

