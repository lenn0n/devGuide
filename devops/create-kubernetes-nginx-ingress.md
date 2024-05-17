## CREATING K8S INGRESS:

- Install NGINX Ingress Controller
>     kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.0/deploy/static/provider/cloud/deploy.yaml

- Create YAML file and apply to cluster
>     apiVersion: networking.k8s.io/v1
>     kind: Ingress
>     metadata:
>       name: frontend-ingress
>       namespace: default
>     spec:
>       ingressClassName: nginx
>       rules:
>       - host: lennontest.com
>         http:
>           paths:
>           - backend:
>               service:
>                 name: frontend-service
>                 port:
>                   number: 30000
>             path: /
>             pathType: Prefix
