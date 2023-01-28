# Overview
In this lab, I used Cloud Marketplace to quickly and easily deploy a LAMP stack on a Compute Engine instance. 

The Bitnami LAMP Stack provides a complete web development environment for Linux that can be launched in one click.

## Steps
- In the GCP Console, on the Navigation menu ![Navigation menu icon](./images/menu%20icon.png), click Marketplace.

- In the search bar, type LAMP.

- In the search results, click LAMP Packaged by Bitnami.

- On the LAMP page, click Launch.

If this is your first time using Compute Engine, the Compute Engine API must be initialized before you can continue.

- For Zone, select the deployment zone that Qwiklabs assigned to you.

- Leave the remaining settings as their defaults.

- If you are prompted to accept the GCP Marketplace Terms of Service, do so.

- Click Deploy.

- If a Welcome to Deployment Manager message appears, click Close to dismiss it.

The status of the deployment appears in the console window: lampstack-1 is being deployed. When the deployment of the infrastructure is complete, the status changes to lampstack-1 has been deployed.

After the software is installed, a summary of the details for the instance, including the site address, is displayed.

## Verify your deployment
- When the deployment is complete, click the **Site address** link in the right pane. (If the website is not responding, wait 30 seconds and try again.) If you see a redirection notice, click on that link to view your new site.

- Alternatively, you can click **Visit the site** in the **Get started with LAMP Packaged by Bitnami** section of the page. A new browser tab displays a congratulations message. This page confirms that, as part of the LAMP stack, the Apache HTTP Server is running.

- Close the congratulations browser tab.

- On the GCP Console, under **Get started with LAMP Packaged by Bitnami**, click SSH.

In a new window, a secure login shell session on your virtual machine appears.

- In the just-created SSH window, to change the current working directory to `/opt/bitnami`, execute the following command:

`cd /opt/bitnami`

- To copy the _phpinfo.php_ script from the installation directory to a publicly accessible location under the web server document root, execute the following command:

`sudo sh -c 'echo "<?php phpinfo(); ?>" > apache2/htdocs/phpinfo.php'`

- The _phpinfo.php_ script displays your PHP configuration. It is often used to verify a new PHP installation.

- To close the SSH window, execute the following command:

`exit`

- Open a new browser tab.

- Type the following URL, and replace **SITE_ADDRESS** with the URL in the Site address field in the right pane of the **lampstack** page.

`http://SITE_ADDRESS/phpinfo.php`

A summary of the PHP configuration of your server is displayed.

Note: If you can't see the web page in the browser on your corporate laptop: If possible, exit any corporate VPN/network and try again. Enter the IP address on another device, such as a tablet or even a phone.

- Close the **phpinfo** tab.

[link to documentation](https://googlepluralsight.qwiklabs.com/focuses/24758213?parent=lti_session)