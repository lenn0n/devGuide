## If you need to pull an image from a private Docker Hub repository, you can use the following.

- CREATE SECRET KEY

>     kubectl create secret docker-registry myregistrykey --docker-server=DOCKER_REGISTRY_SERVER --docker-username=DOCKER_USER --docker-password=DOCKER_PASSWORD --docker-email=DOCKER_EMAIL

Then add the newly created key to your Kubernetes service account.

- RETRIEVE CURRENT SERVICE ACCOUNT

>     kubectl get serviceaccounts default -o yaml > ./sa.yaml

- EDIT sa.yaml AND ADD ImagePullSecret AFTER SECRETS

>     imagePullSecrets:
>     - name: myregistrykey

- UPDATE SERVICE ACCOUNT

>     kubectl replace serviceaccount default -f ./sa.yaml


CREATE SECRET FROM EXISTING DATA
>     kubectl create secret generic _NAME_--from-file=.dockerconfigjson=_PATH_TO_/.docker/config.json --type=kubernetes.io/dockerconfigjson