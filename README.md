# kubernetescl-ocud-native-stack
Production-ready cloud native environment for a frontend + backend application on Kubernetes with GitOps, CI/CD, security, and monitoring.


# docker build, test and push to GitHub registry
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

# tag
docker tag demo-backend:local ghcr.io/johno221/demo-backend:1.0.0

docker tag demo-frontend:local ghcr.io/johno221/demo-frontend:1.0.0

# push to registry 

docker push ghcr.io/johno221/demo-backend:1.0.0
docker push ghcr.io/johno221/demo-frontend:1.0.0

token= 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

# login 
echo "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" | docker login ghcr.io -u johno221 --password-stdin


# helm 
cd ~/kubernetes-cloud-native-stack/helm/demo-app

helm install demo-app . \
  --namespace app \
  --create-namespace
