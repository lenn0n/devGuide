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

### Restart NGINX Service
    sudo service nginx restart
