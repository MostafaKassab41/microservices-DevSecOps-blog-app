# 🛡️ Full DevSecOps Microservices Pipeline – Blog Platform  

[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue?logo=githubactions)](#)
[![GitOps](https://img.shields.io/badge/GitOps-ArgoCD-orange?logo=argo)](#)
[![Security](https://img.shields.io/badge/Security-Semgrep%20%7C%20Trivy%20%7C%20SonarQube-critical?logo=security)](#)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Minikube%20%7C%20Helm-success?logo=kubernetes)](#)
[![Monitoring](https://img.shields.io/badge/Monitoring-Prometheus%20%7C%20Grafana-lightgrey?logo=grafana)](#)

---

## 🧩 Overview

This project demonstrates a full **DevSecOps pipeline** for a **microservices-based Blog Platform**, integrating **CI/CD, GitOps, security scanning, and observability** — built entirely from scratch.

---

## 🚀 Project Overview

This project was designed to simulate a **real-world DevSecOps workflow** from code commit to production deployment.

It integrates:
- Microservices architecture (React + Node.js)
- Docker containerization
- GitHub Actions CI/CD
- Static and dynamic security scanning
- Self-hosted SonarQube and private registry
- GitOps delivery with Argo CD
- Kubernetes orchestration
- Prometheus & Grafana monitoring stack

---

## 🧱 Architecture

![Architecture Diagram](./docs/devsecops-architecture.png)

**Workflow Overview:**
1. Developer pushes code to GitHub.
2. GitHub Actions builds and scans code/images.
3. Images pushed to private registry.
4. Argo CD auto-syncs manifests from GitHub.
5. Helm deploys a new microservices version.
6. Prometheus + Grafana monitor runtime metrics.

---

## 🧰 Tech Stack

| Layer | Tool | Purpose |
|--------|------|----------|
| **Version Control** | GitHub | Source of truth |
| **CI/CD** | GitHub Actions | Automates build, test, scan, and deploy stages |
| **Static Analysis (SAST)** | Semgrep, SonarQube | Code quality & vulnerabilities |
| **Image & Container Security** | Trivy | Container vulnerability scanning |
| **Dynamic Testing (DAST)** | OWASP ZAP | Runtime app testing |
| **Registry** | Docker Registry (registry:2) | Local private image registry (HTTPS + Auth) |
| **Delivery** | Argo CD | GitOps continuous deployment |
| **Orchestration** | Kubernetes (Minikube) + Helm | Deploys microservices |
| **Monitoring** | Prometheus + Grafana | Observability & alerting |

---

## ⚙️ CI/CD Pipeline Overview

| Stage | Description |
|--------|-------------|
| **1️⃣ Build & Test** | Run unit tests and build Docker images |
| **2️⃣ SAST** | Analyze code with Semgrep & SonarQube |
| **3️⃣ Container Scan** | Scan built images with Trivy |
| **4️⃣ Push to Registry** | Upload images to private registry |
| **5️⃣ Update Helm Charts** | Update image tags and push to Git |
| **6️⃣ GitOps Deployment** | ArgoCD syncs Git → deploys to K8s cluster |

---

## 🧩 Microservices Overview

| Service | Description | Port |
|----------|--------------|------|
| **Client** | React frontend for blog users | 3000 |
| **Posts** | Handles post creation | 4000 |
| **Comments** | Handles user comments | 4001 |
| **Query** | Aggregates data for frontend | 4002 |
| **Event Bus** | Async event handling | 4005 |

Each service runs as a Docker container and communicates over an internal network.

---

## 🔒 Security Integration

### 🔹 Semgrep
Performs static code analysis to detect vulnerable patterns.

### 🔹 SonarQube
Analyses code quality, technical debt, and maintainability metrics.  
Deployed locally with persistent PostgreSQL and exposed via `ngrok`.

### 🔹 Trivy
Scans container images for OS and dependency vulnerabilities before push.

### 🔹 OWASP ZAP
Used in the CD pipeline for runtime scanning of exposed APIs and frontend.

---
 
## 📦 Private Docker Registry

A self-hosted, HTTPS-secured Docker registry deployed via Docker Compose.

### Registry Features:
- HTTPS enabled with self-signed certs  
- Authenticated access using htpasswd  
- Persistent image storage  
- Publicly exposed via `ngrok` Tunnel for CI/CD integration  

---

## 📊 Monitoring & Observability

| Component              | Purpose                 |
| ---------------------- | ----------------------- |
| **Prometheus**         | Collects metrics        |
| **Grafana**            | Visualizes dashboards   |
| **Node Exporter**      | Monitors node resources |
| **Kube-State-Metrics** | Tracks cluster objects  |

---

## 🔁 Continuous Delivery with Argo CD

**Argo CD** implements the **GitOps** methodology — it continuously syncs your Kubernetes cluster with the desired state defined in your Git repository.

Whenever the GitHub Actions workflow updates a Helm chart or manifest file (e.g., new image tag), Argo CD automatically detects the change and applies it to the cluster — **no manual kubectl apply** needed.

### 🧠 How It Works
1. **GitHub Actions** builds and pushes new Docker images to the private registry.  
2. The CI pipeline commits an updated `values.yaml` or manifest to Git.  
3. **Argo CD** detects the Git change and syncs it to the Kubernetes cluster.  
4. The app automatically redeploys with the latest version.
