## SELF-SIGNED CERTS USING CERT-MANAGER

- INSTALL CERT-MANAGER IN CLUSTER USING MANIFEST
>     kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.4/cert-manager.yaml

- CREATE KEY AND CERT FROM URL
	* KEY: 
  >     openssl genrsa -out ca.key 2048
	* CRT: 
  >     openssl req -x509 -new -nodes -key ca.key -sha256 -subj "//CN=URL" - days 1024 -out ca.crt

- CREATE SECRET ca-key-pair TO CLUSTER
>     kubectl create secret tls ca-key-pair --key=ca.key --cert=ca.crt

- CREATE ISSUER YAML FILE AND APPLY TO CLUSTER
>     apiVersion: cert-manager.io/v1
>     kind: Issuer
>     metadata:
>      name: ca-issuer
>      namespace: default
>     spec:
>      ca:
>       secretName: ca-key-pair

- CREATE CERTIFICATE YAML FILE AND APPLY TO CLUSTER
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

- USE secretName: lenn0n-xyz-tls IN INGRESS FILE
>       tls:
>       - hosts:
>         - lenn0n.xyz
>         secretName: lenn0n-xyz-tls