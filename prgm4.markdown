Here’s a **complete, well-structured write-up** that you can **copy word-for-word in your exam** for full marks. It explains the setup, tools, steps, and concepts clearly and concisely.

---

## 🚀 Deploying a Python Flask Web Application on Minikube using Kubernetes, ConfigMap, and Secret

In this experiment, we deploy a simple Python Flask web application in a Kubernetes environment using Minikube. The setup includes Docker for containerization, Kubernetes Deployments and Services for orchestration, and ConfigMap and Secret for injecting environment-specific configuration values.

---

### 🔧 Step 1: Create a Simple Flask Application

We define a basic web application using Flask:

```python
from flask import Flask  
import os  
app = Flask(__name__)  
  
@app.route('/')  
def index():  
    app_env = os.getenv("APP_ENV", "not set")  
    db_password = os.getenv("DB_PASSWORD", "not set")  
    return f"APP_ENV: {app_env} <br> DB_PASSWORD: {db_password}"  
  
if __name__ == '__main__':  
    app.run(host='0.0.0.0', port=5000)
```

---

### 📦 Step 2: Create a Dockerfile

We containerize the Flask application using the following Dockerfile:

```dockerfile
FROM python:3.9-slim  
WORKDIR /app  
COPY app1.py .  
RUN pip install flask  
CMD ["python", "app1.py"]
```

We then build and push the Docker image:

```bash
docker build -t chethanaravi/python-app:latest .
docker push chethanaravi/python-app:latest
```

---

### ☸️ Step 3: Create Kubernetes Manifests

#### 1. **ConfigMap (configmap.yaml)**

```yaml
apiVersion: v1  
kind: ConfigMap  
metadata:  
  name: my-config  
data:  
  APP_ENV: production
```

#### 2. **Secret (secret.yaml)**

```yaml
apiVersion: v1  
kind: Secret  
metadata:  
  name: my-secret  
type: Opaque  
stringData:  
  DB_PASSWORD: mypassword123
```

#### 3. **Deployment (deployment.yaml)**

```yaml
apiVersion: apps/v1  
kind: Deployment  
metadata:  
  name: python-app  
spec:  
  replicas: 1  
  selector:  
    matchLabels:  
      app: python-app  
  template:  
    metadata:  
      labels:  
        app: python-app  
    spec:  
      containers:  
      - name: app-container  
        image: chethanaravi/python-app:latest  
        ports:  
        - containerPort: 5000  
        env:  
        - name: APP_ENV  
          valueFrom:  
            configMapKeyRef:  
              name: my-config  
              key: APP_ENV  
        - name: DB_PASSWORD  
          valueFrom:  
            secretKeyRef:  
              name: my-secret  
              key: DB_PASSWORD
```

#### 4. **Service (service.yaml)**

```yaml
apiVersion: v1  
kind: Service  
metadata:  
  name: python-service  
spec:  
  type: NodePort  
  selector:  
    app: python-app  
  ports:  
    - protocol: TCP  
      port: 80  
      targetPort: 5000  
      nodePort: 30005
```

---

### 🚀 Step 4: Deploy to Minikube Cluster

We apply all the manifests:

```bash
kubectl apply -f configmap.yaml  
kubectl apply -f secret.yaml  
kubectl apply -f deployment.yaml  
kubectl apply -f service.yaml
```

To verify:

```bash
kubectl get pods  
kubectl get svc
```

---

### 🌐 Step 5: Accessing the Application

We forward the service port to access it on the browser:

```bash
kubectl port-forward svc/python-service 8095:80
```

Then, open `http://localhost:8095` to view the output.

---

### 🔁 Step 6: Scaling and Cleanup

To scale the application:

```bash
kubectl scale deployment python-app --replicas=3
```

To delete all resources:

```bash
kubectl delete all --all
```

To delete specific deployments or pods:

```bash
kubectl delete deployment <deployment-name>
kubectl delete pods --all
```

---

### ✅ Conclusion

This experiment demonstrated deploying a containerized Python Flask application using Kubernetes on Minikube. We learned to:

* Containerize apps using Docker
* Manage deployments using Kubernetes YAML files
* Use ConfigMap and Secret for dynamic configuration
* Expose services using NodePort and Port Forwarding
* Scale and manage pods efficiently

This setup illustrates modern DevOps principles like containerization, infrastructure as code, and secure configuration management using Kubernetes.

---

Let me know if you want a **shorter version** or want to **practice an oral explanation** too!
