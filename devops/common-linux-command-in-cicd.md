The following commands are commonly used in CI/CD. 

### RESTART SSH SERVICE 
>     sudo systemctl restart sshd

### REBOOT VM
>     sudo reboot

### ADD USER
>     adduser NAME_OF_USER

### SWITCH TO USER
>     su - NAME_OF_USER

### CHANGE PW OF CURRENT USER
>     passwd

### ADD PASSWORD AUTH IN SSH CONFIG
>     vim /etc/ssh/sshd_config
>     PasswordAuthentication yes
>     PubkeyAuthentication yes

### ADD PERMISSION TO USER TO CREATE FOLDER
>     sudo usermod -aG sudo NAME_OF_USER

### ADD PERMISSION TO USER TO EXECUTE COMMANDS INSIDE THE FOLDER
>     sudo chmod -R 777 PATH_OF_FOLDER

### REMOVE 'SUDO' TO USER WHEN EXECUTING COMMANDS
>     sudo visudo -f /etc/sudoers.d/NAME_OF_USER dev ALL=(ALL) NOPASSWD: /usr/sbin/service nginx start,/usr/sbin/service nginx stop,/usr/sbin/service nginx restart

### REMOVE AUTOSTART NGINX
>     sudo update-rc.d -f nginx disable

### ALLOW NGINX HTTP
>     sudo ufw allow 'Nginx HTTP'
