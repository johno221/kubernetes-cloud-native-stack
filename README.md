# kubernetescl-ocud-native-stack
Production-ready cloud native environment for a frontend + backend application on Kubernetes with GitOps, CI/CD, security, and monitoring.


# docker 
cd apps/backed
docker build -t demo-backend:local .
docker run --rm -p 8080:8080 demo-backend:local
http://localhost:8080/health
http://localhost:8080/api/hello
http://localhost:8080/api/info
http://localhost:8080/metrics

cd apps/frontend
docker build -t demo-frontend:local .
docker run --rm -p 8081:80 demo-frontend:local
http://localhost:8081