## Getting Started with NGINX in Elastic Cloud Servers

### Prerequisites 
- Create Instance
  - Choose Ubuntu OS
  - Create Key-Pair and store it in a safe place
- Setup VPC or Security Groups
  - Set Inbound Rules
    - Add Rule for All Traffic - 0.0.0.0/0 (must change later)

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Install NGINX, use following command:
    sudo apt update
    sudo apt install nginx

*Check if the NGINX service is running in your machine:*
    
    systemctl status nginx

*Some cloud providers doesn't open the PORT 80 by default. 
In this case, you can allow it by typing:*

    sudo ufw allow 'Nginx HTTP'

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png)  Create a configuration file:
    nano /etc/nginx/sites-available/<NAME>.conf

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png)  Assume that you have already built an HTML files and ready to deploy:
 Paste the code below in <NAME>.conf file:
 
    # If you are using non-root user, uncomment and provide user below:
    # user ubuntu;
    
    server {
      listen 80;
      root /<YOUR_WORKING_DIRECTORY>;
      index index.html index.htm;
      server_name <YOUR_SERVER_NAME> OR <YOUR_PUBLIC_IP>;
      
      location / {
        try_files $uri $uri/ =404;
      }
    }

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png)  Create SymLink from *sites-available* to *sites-enabled*:
    ln -s /etc/nginx/sites-available/<NAME>.conf /etc/nginx/sites-enabled/

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png)  Restart NGINX Service
    sudo service nginx restart

## Adding SSL Certs using CERT-BOT

### ![#1589F0](https://placehold.co/15x15/1589F0/1589F0.png) Install SnapD:
    sudo apt update
    sudo apt install snapd
    
### ![#1589F0](https://placehold.co/15x15/1589F0/1589F0.png) Get CertBot:
    sudo snap install --classic certbot

### ![#1589F0](https://placehold.co/15x15/1589F0/1589F0.png) Register CertBot command:
    sudo ln -s /snap/bin/certbot /usr/bin/certbot

### ![#1589F0](https://placehold.co/15x15/1589F0/1589F0.png) Before proceding, make sure you have already created a domain. Run this command to allow CERT-BOT to automatically update your .conf files:
    sudo certbot --nginx

### ![#1589F0](https://placehold.co/15x15/1589F0/1589F0.png) For auto-renew, use the command below:
    sudo certbot renew --dry-run
