If you need to pull an image from a private Docker Hub repository, you can use the following.

##   ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Create Secret Key

>     kubectl create secret docker-registry myregistrykey --docker-server=DOCKER_REGISTRY_SERVER --docker-username=DOCKER_USER --docker-password=DOCKER_PASSWORD --docker-email=DOCKER_EMAIL

Then add the newly created key to your Kubernetes service account.

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png)  Retrieve Current Service Accounts

>     kubectl get serviceaccounts default -o yaml > ./sa.yaml

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png)  Edit sa.yaml and add ImagePullSecret after secrets

>     imagePullSecrets:
>     - name: myregistrykey

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png)  Update Service Account

>     kubectl replace serviceaccount default -f ./sa.yaml


## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) To create secret from existing control plane, use:
>     kubectl create secret generic _NAME_--from-file=.dockerconfigjson=_PATH_TO_/.docker/config.json --type=kubernetes.io/dockerconfigjson
