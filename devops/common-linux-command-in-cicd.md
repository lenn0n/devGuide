The following commands are commonly used in CI/CD. 

###  ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png)  RESTART SSH SERVICE 
>     sudo systemctl restart sshd

###  ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) REBOOT VM
>     sudo reboot

###  ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) ADD USER
>     adduser NAME_OF_USER

###  ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) SWITCH TO USER
>     su - NAME_OF_USER

###  ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) CHANGE PW OF CURRENT USER
>     passwd

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png)  ADD PASSWORD AUTH IN SSH CONFIG
>     vim /etc/ssh/sshd_config
>     PasswordAuthentication yes
>     PubkeyAuthentication yes

###  ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) ADD PERMISSION TO USER TO CREATE FOLDER
>     sudo usermod -aG sudo NAME_OF_USER

###  ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) ADD PERMISSION TO USER TO EXECUTE COMMANDS INSIDE THE FOLDER
>     sudo chmod -R 777 PATH_OF_FOLDER

###  ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) REMOVE 'SUDO' TO USER WHEN EXECUTING COMMANDS
>     sudo visudo -f /etc/sudoers.d/NAME_OF_USER dev ALL=(ALL) NOPASSWD: /usr/sbin/service nginx start,/usr/sbin/service nginx stop,/usr/sbin/service nginx restart

###  ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) REMOVE AUTOSTART NGINX
>     sudo update-rc.d -f nginx disable

###  ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) ALLOW NGINX HTTP
>     sudo ufw allow 'Nginx HTTP'
