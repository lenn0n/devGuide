## GETTING STARTED WITH DIGITAL OCEAN K8S

- DOWNLOAD K8S CONFIG FILE

- FOR MANUAL MODE, ALWAYS INCLUDE KUBECONFIG
>     kubectl --kubeconfig=/<pathtodirectory>/k8s-1-29-1-do-0-sgp1-1709538228227-kubeconfig.yaml get nodes

- UPDATE **/.kube/config** file with above yaml file values

- INSTALL KUBERNETES DASHBOARD
>     kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml

- CREATE ACCESS TOKEN FROM **API > ACCESS KEYS**

- ACCESS DASHBOARD
>     http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/login

- INSTALL CERT-MANAGER
>     kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.3/cert-manager.yaml