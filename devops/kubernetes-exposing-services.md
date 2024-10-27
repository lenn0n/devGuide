# 📂 Accessing Service Externally in K8s
To create an external endpoint for a service in a Kubernetes control plane (such as a managed Kubernetes service), 
you can use various methods depending on your setup. 
Here are a few approaches that allow you to expose your service externally:

## 💡 Using an External Load Balancer 
When you define a service of type LoadBalancer, Kubernetes requests an external load balancer from the cloud provider 
(like AWS, GCP, or Azure) and configures it to route traffic to your Kubernetes service.

    apiVersion: v1
    kind: Service
    metadata:
      name: <service-name>
    spec:
      type: LoadBalancer
      selector:
        app: <deployment-name>
      ports:
        - protocol: TCP
          port: <external-port>
          targetPort: <internal-port>

Use LoadBalancer if you need a quick and direct way to expose a single service with a public IP. 
It's ideal for cases with minimal configuration, such as exposing a standalone application, database, or API endpoint.

## 💡 Using Kubenetes Ingress
Ingress works with an Ingress controller (such as NGINX, Traefik, or HAProxy) deployed within the cluster. 
The controller manages external traffic and routes it based on Ingress rules defined in Ingress resources.

### ➕ Install an Ingress Controller
Ensure you have an Ingress controller running in your cluster, such as NGINX or Traefik.

    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml

### ➕ Create an Ingress Resource
Define an Ingress resource that routes traffic to your service.

    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
      name: <ingress-name>
      annotations:
        kubernetes.io/ingress.class: "nginx"  # or "nginx" for NGINX Ingress controller
    spec:
      rules:
        - host: <host-if-any> # if using local machine, you can define a host in your ETC (windows) 127.0.0.1 <your-host.com>
          http:
            paths:
              - path: /
                pathType: Prefix
                backend:
                  service:
                    name: <service-name>
                    port:
                      number: <service-port>


Ingress is useful for applications with multiple services (like microservices or complex web apps) 
or where you want to expose multiple endpoints under one domain. 
It’s ideal for managing traffic for multiple services with more flexibility and control.


# 📂 Using Minikube
The above tutorial will not work magically in Minikube. Instead, we have to run some commands to make it work.

To make LoadBalancer and Ingress work, you need to:

1. Make sure you have Minikube installed and a Docker running in your machine
2. Run the minikube container:
   
        minikube start
  
3. Run the K8s Dashboard (optional):

        minikube dashboard
   
4. Tunnel the container:

        minikube tunnel
