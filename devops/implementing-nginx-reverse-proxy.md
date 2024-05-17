
## NGINX REVERSE PROXY

>     nano /etc/nginx/sites-available/lenn0n.io.conf
- Paste code below: 
>     server {
>       root /var/www/_work/ci-cd/ci-cd/src/frontend/build;
>       index index.html index.htm;
>       server_name 8.220.128.99;

>       location / {
>         try_files $uri $uri/ /index.html;
>       }

>       location /api {
>         proxy_pass http://localhost:5000/api;
>         proxy_http_version 1.1;
>         proxy_set_header Upgrade $http_upgrade;
>         proxy_set_header Connection 'upgrade';
>         proxy_set_header Host $host;
>         proxy_cache_bypass $http_upgrade;
>       }
>     }

- LINK TO SITES ENABLED
>     ln -s /etc/nginx/sites-available/lenn0n.io.conf /etc/nginx/sites-enabled/

- RESTART NGINX SERVICE
>     sudo systemctl restart nginx
