## CREATE SSL CERT WITH LET'S ENCRYPT

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) INSTALL CERT MANAGER
>     kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.0/cert-manager.yaml

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) CREATE CLUSTER ISSUER YAML FILE AND APPLY TO CLUSTER
>     apiVersion: cert-manager.io/v1
>     kind: ClusterIssuer
>     metadata:
>       name: letsencrypt-prod
>       namespace: cert-manager
>     spec:
>       acme:
>         email: gameoveralisa@gmail.com
>         server: https://acme-v02.api.letsencrypt.org/directory
>         privateKeySecretRef:
>           name: letsencrypt-cluster-issuer
>         solvers:
>         - http01:
>             ingress:
>               class: nginx


### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) CREATE CERTIFICATE YAML FILE AND APPLY TO CLUSTER
>     apiVersion: cert-manager.io/v1
>     kind: Certificate
>     metadata:
>       name: letsencrypt-prod
>       namespace: default
>     spec:
>       secretName: secure-lenn0n-xyz-tls
>       duration: 2160h # 90d
>       renewBefore: 360h # 15d
>       subject:
>         organizations:
>           - lenn0n-xyz
>       isCA: false
>       privateKey:
>         algorithm: RSA
>         encoding: PKCS1
>         size: 2048
>       usages:
>         - server auth
>         - client auth
>       dnsNames:
>         - lenn0n.xyz
>       issuerRef:
>         name: letsencrypt-prod
>         kind: ClusterIssuer
>         group: cert-manager.io


### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) UPDATE INGRESS AND ADD TLS OBJECT AND USE SECRETNAME **secure-lenn0n-xyz-tls**
>       tls:
>       - hosts:
>         - lenn0n.xyz
>         secretName: secure-lenn0n-xyz-tls


### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) FOR NGINX + UBUNTU SERVER, FOLLOW CERT-BOT:
>   https://certbot.eff.org/instructions?ws=nginx&os=ubuntuxenial
