## KUBECTL COMMANDS

A **Dockerfile** is needed to build an image. 

### Building command:
>     docker build -t NAME_OF_IMAGE PATH_OF_DOCKERFILE

### Running a container:
>      docker run -dp 127.0.0.1:EXTERNAL_PORT:INTERNAL_PORT NAME_OF_CONTAINER
>      docker run --name NAME_OF_CONTAINER -d -p EXTERNAL_PORT:INTERNAL_PORT IMAGE:TAG

The -i option means that it will be interactive mode (you can enter commands to it)

The -t option gives you a terminal (so that you can use it as if you used ssh to enter the container).

The -d option (daemon mode) keeps the container running in the background.

### Enter Pod's shell:
>     kubectl exec --stdin --tty shell-demo -- /bin/bash
>     kubectl exec -it CONTAINER bin or bash

### POD in a specific container
>     kubectl cp <file-spec-src> <file-spec-dest> -c <specific-container>

### Copy /tmp/foo local file to /tmp/bar in a remote pod in namespace
>     kubectl cp /tmp/foo <some-namespace>/<some-pod>:/tmp/bar

### Copy /tmp/foo from a remote pod to /tmp/bar locally
>     kubectl cp <some-namespace>/<some-pod>:/tmp/foo /tmp/bar

*Example Copy Files*
>     kubectl cp api-php-7f48bb7997-7286l:checkout/public_html/exports/logs/api-php.csv api-php.csv

### EXTRACTING DATA FROM KUBECTL TO YAML
>     kubectl get serviceaccounts default -o yaml > ./sa.yam

### CREATE SECRET FROM EXISTING DATA
>     kubectl create secret generic _NAME_--from-file=.dockerconfigjson=_PATH_TO_/.docker/config.json --type=kubernetes.io/dockerconfigjson

If you need to pull an image from a private **Docker Hub** repository, you can use the following.

- CREATE SECRET KEY FROM DOCKERHUB

>     kubectl create secret docker-registry dockerhub --docker-server=DOCKER_REGISTRY_SERVER --docker-username=DOCKER_USER --docker-password=DOCKER_PASSWORD --docker-email=DOCKER_EMAIL

- RETRIEVE CURRENT SERVICE ACCOUNT
>     kubectl get serviceaccounts default -o yaml > ./sa.yaml

- EDIT sa.yaml AND ADD **ImagePullSecrets** AFTER SECRETS
>     imagePullSecrets:
>     - name: dockerhub

- UPDATE SERVICE ACCOUNT
>     kubectl replace serviceaccount default -f ./sa.yaml

### CREATE DATA FROM FILE
>     kubectl create secret generic server-a --from-file=FILE_LOCATION

### ROLLING OUT DEPLOYMENTS

>		 #!/bin/bash
> 
>		 # Define the namespace
>		 NAMESPACE="your-namespace"
> 
>		 # Get a list of deployments in the specified namespace
>		 DEPLOYMENTS=$(kubectl get deployments -n $NAMESPACE -o=jsonpath='{.items[*].metadata.name}')
> 
>		 # Iterate through the deployments and trigger a rollout restart
>		 for DEPLOYMENT in $DEPLOYMENTS; do
>		     echo "Rolling out restart for deployment: $DEPLOYMENT"
>		     kubectl rollout restart deployment $DEPLOYMENT -n $NAMESPACE
>		 
>		     # Wait for the rollout to complete
>		     while ! kubectl rollout status deployment $DEPLOYMENT -n $NAMESPACE | grep "successfully rolled out"; do
>		         echo "Waiting for rollout of $DEPLOYMENT to complete..."
>		         sleep 5
>		     done
> 		
>		     echo "Rollout for $DEPLOYMENT completed"
>		 done

### Extracting YAML Files:

>     for n in $(kubectl get -o=name pvc,configmap,serviceaccount,secret,ingress,service,deployment,statefulset,hpa,job,cronjob)
>     do
>         mkdir -p $(dirname $n)
>         kubectl get $n -o > $n.yaml
>     done
