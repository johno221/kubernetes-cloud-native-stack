# Kubernetes Cloud-Native Stack

Production-ready cloud-native environment for frontend + backend aplikáciu postavenú na Kubernetes s podporou GitOps, CI/CD, bezpečnosti a monitoringu.

---

## Build, Test & Push Images

### Backend
```bash
cd apps/backend
docker build -t demo-backend:local .
docker run --rm -p 8080:8080 demo-backend:local
```

Endpoints:
- http://localhost:8080/health
- http://localhost:8080/api/hello
- http://localhost:8080/api/info
- http://localhost:8080/metrics

### Frontend
```bash
cd apps/frontend
docker build -t demo-frontend:local .
docker run --rm -p 8081:80 demo-frontend:local
```

App:
- http://localhost:8081

---

## Push to GitHub Container Registry

### Tag images
```bash
docker tag demo-backend:local ghcr.io/johno221/demo-backend:1.0.0
docker tag demo-frontend:local ghcr.io/johno221/demo-frontend:1.0.0
```

### Push
```bash
docker push ghcr.io/johno221/demo-backend:1.0.0
docker push ghcr.io/johno221/demo-frontend:1.0.0
```

---

## Deploy with Helm

```bash
cd helm/demo-app
helm install demo-app . \
  --namespace app \
  --create-namespace
```

Test rendering:
```bash
helm template demo-app helm/demo-app
```

---

## Local Domain Mapping

### Windows (PowerShell as Admin)
```powershell
$ip = "172.25.233.201"
$domain = "demo.local"
$line = "$ip`t$domain"
Add-Content -Path "C:\Windows\System32\drivers\etc\hosts" -Value $line
```

![alt text](image-1.png)

### WSL
```
172.25.233.201   demo.local
```

---

## GitOps (ArgoCD)

### Install
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl get pods -n argocd
```

### Access UI
```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```
URL:
```
https://localhost:8080
```

### Admin Password
```bash
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d; echo
```

![alt text](image.png)
![alt text](image-2.png)

---

## CI/CD

- Vytvoriť GitHub token s **write** oprávneniami
- Uložiť ho ako secret do repozitára

---

![alt text](image-3.png)

## Monitoring (Prometheus)

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
kubectl create namespace monitoring
```

---
