## SELF-SIGNED CERTS USING CERT-MANAGER

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) INSTALL CERT-MANAGER IN CLUSTER USING MANIFEST
>     kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.4/cert-manager.yaml

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) CREATE KEY AND CERT FROM URL
Generate Key:
	 
	openssl genrsa -out ca.key 2048

Generate Certificate:

	openssl req -x509 -new -nodes -key ca.key -sha256 -subj "//CN=URL" - days 1024 -out ca.crt

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png)  CREATE SECRET ca-key-pair TO CLUSTER
>     kubectl create secret tls ca-key-pair --key=ca.key --cert=ca.crt

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) CREATE ISSUER YAML FILE AND APPLY TO CLUSTER
>     apiVersion: cert-manager.io/v1
>     kind: Issuer
>     metadata:
>      name: ca-issuer
>      namespace: default
>     spec:
>      ca:
>       secretName: ca-key-pair

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png)  CREATE CERTIFICATE YAML FILE AND APPLY TO CLUSTER
>     apiVersion: cert-manager.io/v1
>     kind: Certificate
>     metadata:
>      name: lenn0n-xyz
>      namespace: default
>     spec:
>      secretName: lenn0n-xyz-tls
>      issuerRef:
>       name: ca-issuer
>       kind: Issuer
>      commonName: lenn0n.xyz
>      dnsNames:
>       - www.lenn0n.xyz

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) USE secretName: lenn0n-xyz-tls IN INGRESS FILE
>       tls:
>       - hosts:
>         - lenn0n.xyz
>         secretName: lenn0n-xyz-tls
