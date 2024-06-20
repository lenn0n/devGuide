## Getting Started with NGINX in Elastic Cloud Servers

### Prerequisites 
- Create Instance
  - Choose Ubuntu OS
  - Create Key-Pair and store it in a safe place
- Setup VPC or Security Groups
  - Set Inbound Rules
    - Add Rule for All Traffic - 0.0.0.0/0 (must change later)

### Install NGINX, use following command:
    sudo apt update
    sudo apt install nginx

### Check if the NGINX service is running in your machine:
    systemctl status nginx

### Some cloud providers doesn't open the PORT 80 by default. 
In this case, you can allow it by typing:

    sudo ufw allow 'Nginx HTTP'

### Create a configuration file:
    nano /etc/nginx/sites-available/<NAME>.conf


 ### Assume that you have already built an HTML files and ready to deploy:
 Paste the code below in <NAME>.conf file:
 
    server {
      listen 80;
      root /<YOUR_WORKING_DIRECTORY>;
      index index.html index.htm;
      server_name <YOUR_SERVER_NAME> OR <YOUR_PUBLIC_IP>;
      
      location / {
        try_files $uri $uri/ =404;
      }
    }

### Create SymLink from sites-avaible to sites-enabled:
    ln -s /etc/nginx/sites-available/<NAME>.conf /etc/nginx/sites-enabled/

### Restart NGINX Service
    sudo service nginx restart
