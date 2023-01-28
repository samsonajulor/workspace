![nginx lb architecture](./images/nginx_lb_architecture.png)

# CONFIGURE NGINX AS A LOAD BALANCER
- You can either uninstall Apache from the existing Load Balancer server, or create a fresh installation of Linux for Nginx.

- Create an EC2 VM based on Ubuntu Server 20.04 LTS and name it Nginx LB (do not forget to open TCP port 80 for HTTP connections, also open TCP port 443 – this port is used for secured HTTPS connections)

- Update /etc/hosts file for local DNS with Web Servers’ names (e.g. Web1 and Web2) and their local IP addresses

- Install and configure Nginx as a load balancer to point traffic to the resolvable DNS names of the webservers

- Update the instance and Install Nginx

`sudo apt update && sudo apt install nginx`

`sudo systemctl enable nginx && sudo systemctl start nginx`

- Configure Nginx LB using Web Servers’ names defined in /etc/hosts

- Open the default nginx configuration file

`sudo vi /etc/nginx/sites-available/load_balancer.conf`

- insert following configuration into http section

```
 upstream web {
    server <ip address> weight=5;
    server <ip address> weight=5;
  }

server {
    listen 80;
    server_name domain.com www.domain.com;
    location / {
     proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
     proxy_pass http://web;
    }
  }
```

- disable default sites
`sudo rm -f /etc/nginx/sites-available/default`

- confirm settings
`sudo nginx -t && sudo nginx -s reload`

- link load balancer config file from sites available to sites enabled
`cd /etc/nginx/sites-enabled`
`sudo ln -s ../sites-available/load_balancer.conf .`

- use `ll` to check the symbolic linking of the config files

<!-- - comment out this line
`#       include /etc/nginx/sites-enabled/*;` -->

- Restart Nginx and make sure the service is up and running

`sudo systemctl restart nginx`
`sudo systemctl status nginx`

![ngnix lb setup](./images/nginx%20lb%20configured.jpg)

### REGISTER A NEW DOMAIN NAME AND CONFIGURE SECURED CONNECTION USING SSL/TLS CERTIFICATES
- Register a new domain name with any registrar of your choice in any domain zone (e.g. .com, .net, .org, .edu, .info, .xyz or any other)

- Assign an Elastic IP to your Nginx LB server and associate your domain name with this Elastic IP

- You might have noticed, that every time you restart or stop/start your EC2 instance – you get a new public IP address. When you want to associate your domain name – it is better to have a static IP address that does not change after reboot. Elastic IP is the solution for this problem.

- search for route 53 on aws console.

- create a new public hosted zone.

- copy the name server from the route 53 to the domain hosting management settings.

- Update A record in your registrar to point to Nginx LB using Elastic/public IP address.

- Update another www record in your registrar to point to Nginx LB using Elastic/public IP address.

- Check that your Web Servers can be reached from your browser using new domain name using HTTP protocol – `http://<your-domain-name.com>`

![domain up and running](./images/domain%20up%20and%20running.jpg)

Configure Nginx to recognize your new domain name
Update your nginx.conf with `server_name www.<your-domain-name.com>` instead of `server_name www.domain.com`

- Install certbot and request for an SSL/TLS certificate

- Make sure snapd service is active and running
`sudo systemctl status snapd`

- Install certbot
`sudo apt install certbot -y`

- Install dependecies
`sudo apt install python3-certbot-nginx -y`

- confirm nginx config and reload
`sudo nginx -t && sudo nginx -s reload`

- Request your certificate (just follow the certbot instructions – you will need to choose which domain you want your certificate to be issued for, domain name will be looked up from nginx.conf file so make sure you have updated it on step 4).

<!-- `sudo ln -s /snap/bin/certbot /usr/bin/certbot` -->
`sudo certbot --nginx -d <domain name> -d www.<domain name>`

- Test secured access to your Web Solution by trying to reach `https://<your-domain-name.com>`

![ssl configured](./images/ssl%20configured.jpg)

- You shall be able to access your website by using HTTPS protocol (that uses TCP port 443) and see a padlock pictogram in your browser’s search string.
Click on the padlock icon and you can see the details of the certificate issued for your website.

- Set up periodical renewal of your SSL/TLS certificate
By default, LetsEncrypt certificate is valid for 90 days, so it is recommended to renew it at least every 60 days or more frequently.

- You can test renewal command in dry-run mode

`sudo certbot renew --dry-run`

![renew command successful](./images/renew%20dry%20run.jpg)
- Best practice is to have a scheduled job that to run renew command periodically. Let us configure a cronjob to run the command twice a day.

- To do so, lets edit the crontab file with the following command:

`crontab -e`

- Add following line:

`* */12 * * *   root /usr/bin/certbot renew > /dev/null 2>&1`

![cron e setup complete](./images/cron%20e%20setup%20complete.jpg)

