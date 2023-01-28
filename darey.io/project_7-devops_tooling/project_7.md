# Step 1 – Prepare NFS Server
- Spin up 4 new EC2 instance with RHEL Linux 8 Operating System.
- Spin up 1 new EC2 instance with Ubuntu Operating System.

- The names are: NFS, Webserver One, Web server two, Web server three, db server

- Based on your LVM experience from Project 6, Configure LVM on the Server.

- Instead of formatting the disks as ext4 you will have to format them as xfs

- Ensure there are 3 Logical Volumes. lv-opt lv-apps, and lv-logs

- Create mount points on /mnt directory for the logical volumes as follow:
- Mount lv-apps on /mnt/apps – To be used by webservers
- Mount lv-logs on /mnt/logs – To be used by webserver logs
- Mount lv-opt on /mnt/opt – To be used by Jenkins server in Project 8

- Create 3 volumes in the same AZ as your NFS Server EC2, each of 10 GiB, make sure that their availability zones are the same.

### install volumes
- Attach all three volumes one by one to your NFS Server EC2 instance.

- Open up the Linux terminal to begin configuration.

- Use `lsblk` command to inspect what block devices are attached to the server. Notice names of your newly created devices. All devices in Linux reside in /dev/ directory. Inspect it with `ls /dev/` and make sure you see all 3 newly created block devices there – their names will likely be xvdf, xvdh, xvdg.

- Use `df -h` command to see all mounts and free space on your server

- Use gdisk utility to create a single partition on each of the 3 disks

`sudo gdisk /dev/xvdf`
`sudo gdisk /dev/xvdg`
`sudo gdisk /dev/xvdh`

- the type will be 8e00, p to confirm what has been created, and w to write

- Use `lsblk` utility to view the newly configured partition on each of the 3 disks.

- Install lvm2 package using
`sudo yum install lvm2`. 

- Run `sudo lvmdiskscan` command to check for available partitions.
`sudo pvcreate /dev/xvdf1 /dev/xvdg1 /dev/xvdh1`

- Verify that your Physical volume has been created successfully by running 
`sudo pvs`

- Use vgcreate utility to add all 3 PVs to a volume group (VG). Name the VG webdata-vg
`sudo vgcreate webdata-vg /dev/xvdh1 /dev/xvdg1 /dev/xvdf1`

- Verify that your VG has been created successfully by running `sudo vgs`

- Use lvcreate utility to create 3 logical volumes. i) apps-lv (Use half of the PV size), and ii) logs-lv Use the remaining space of the PV size.

`sudo lvcreate -n apps-lv -L 9G webdata-vg`
`sudo lvcreate -n logs-lv -L 9G webdata-vg`
`sudo lvcreate -n opt-lv -L 9G webdata-vg`

- Verify that your Logical Volume has been created successfully by running `sudo lvs`

- Verify the entire setup

- Use xfs to format the logical volumes with ext4 filesystem

`sudo mkfs -t xfs /dev/webdata-vg/apps-lv`
`sudo mkfs -t xfs /dev/webdata-vg/logs-lv`
`sudo mkfs -t xfs /dev/webdata-vg/opt-lv`

- Create a mount point directory /var/www/html directory to store website files

`sudo mkdir -p /mnt/apps`
`sudo mkdir -p /mnt/logs`
`sudo mkdir -p /mnt/opt`

- Mount logical volumes

`sudo mount /dev/webdata-vg/apps-lv /mnt/apps`
`sudo mount /dev/webdata-vg/logs-lv /mnt/logs`
`sudo mount /dev/webdata-vg/opt-lv /mnt/opt`

<!-- - Update /etc/fstab file so that the mount configuration will persist after restart of the server.

The UUID of the device will be used to update the /etc/fstab file;

`sudo blkid`

`sudo vi /etc/fstab`

```
UUID=0f9e1120-382c-43aa-bef0-40d9b076c4e8 /var/www/html ext4 defaults 0 0
UUID=b2f728a6-ef26-426c-ad5a-23597abb190e /var/log      ext4 defaults 0 0
``` -->

- Test the configuration and reload the daemon

`sudo mount -a`
`sudo systemctl daemon-reload`
![nfs mounted successfully](./images/nfs%20mounted%20successfully%20on%20web.jpg)

### install nfs server
`sudo yum -y update`
`sudo yum install nfs-utils -y`
`sudo systemctl start nfs-server.service`
`sudo systemctl enable nfs-server.service`
`sudo systemctl status nfs-server.service`

![nfs-server running](./images/nfs%20server%20running.jpg)

- PS: Export the mounts for webservers’ subnet cidr to connect as clients. For simplicity, you will install your all three Web Servers inside the same subnet, but in production set up you would probably want to separate each tier inside its own subnet for higher level of security.
- To check your subnet cidr – open your EC2 details in AWS web console and locate ‘Networking’ tab and open a Subnet link:


- Make sure we set up permission that will allow our Web servers to read, write and execute files on NFS:

`sudo chown -R nobody: /mnt/apps`
`sudo chown -R nobody: /mnt/logs`
`sudo chown -R nobody: /mnt/opt`

`sudo chmod -R 777 /mnt/apps`
`sudo chmod -R 777 /mnt/logs`
`sudo chmod -R 777 /mnt/opt`

`sudo systemctl restart nfs-server.service`
`sudo systemctl status nfs-server.service`

- Configure access to NFS for clients within the same subnet (example of Subnet CIDR – 172.31.32.0/20 ):

`sudo vi /etc/exports`

```
/mnt/apps <Subnet-CIDR of webserver one>(rw,sync,no_all_squash,no_root_squash)
/mnt/logs <Subnet-CIDR of webserver one>(rw,sync,no_all_squash,no_root_squash)
/mnt/opt <Subnet-CIDR of webserver one>(rw,sync,no_all_squash,no_root_squash)
```

`sudo exportfs -arv`

- Check which port is used by NFS and open it using Security Groups (add new Inbound Rule)
`rpcinfo -p | grep nfs`

![nfs completed](./images/nfs%20service%20completed.jpg)

Important note: In order for NFS server to be accessible from your client, you must also open following ports: TCP 111, UDP 111, UDP 2049
![nfs open ports](./images/open%20ports%20in%20nfs%20server.jpg)

# STEP 2 — CONFIGURE THE DATABASE SERVER (Ubuntu)
`sudo apt update`
By now you should know how to install and configure a MySQL DBMS to work with remote Web Server

Install MySQL server
`sudo apt install mysql-server -y`
- Create a database and name it tooling
<!-- `sudo mysql_secure_installation` -->
<!-- ` sudo mysql -u root -p` -->
` sudo mysql`
`CREATE DATABASE tooling;`
- Create a database user and name it webaccess
`CREATE USER 'webaccess'@'%' IDENTIFIED BY 'password';`
- Grant permission to webaccess user on tooling database to do anything only from the webservers subnet cidr
`GRANT ALL PRIVILEGES ON tooling.* TO 'webaccess'@'%';`
`FLUSH PRIVILEGES;`
`SHOW DATABASES;`
`USE tooling;`
`SELECT user, host FROM mysql.user`
`exit`

- edit the bind address
`sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf`
`bind-address = 0.0.0.0`

`sudo systemctl restart mysql`

# Step 3 — Prepare the Web Servers
- We need to make sure that our Web Servers can serve the same content from shared storage solutions, in our case – NFS Server and MySQL database.
- You already know that one DB can be accessed for reads and writes by multiple clients. For storing shared files that our Web Servers will use – we will utilize NFS and mount previously created Logical Volume lv-apps to the folder where Apache stores files to be served to the users (/var/www).

- This approach will make our Web Servers stateless, which means we will be able to add new ones or remove them whenever we need, and the integrity of the data (in the database and on NFS) will be preserved.

- During the next steps we will do following:

**1. Configure NFS client (this step must be done on all three servers)**
**2. Deploy a Tooling application to our Web Servers into a shared NFS folder**
**3. Configure the Web Servers to work with a single MySQL database**
**4. Launch a new EC2 instance with RHEL 8 Operating System**

### Install NFS client

`sudo yum install nfs-utils nfs4-acl-tools -y`
- Mount /var/www/ and target the NFS server’s export for apps
`sudo mkdir /var/www`
`sudo mount -t nfs -o rw,nosuid <NFS-Server-Private-IP-Address>:/mnt/apps /var/www`
- Verify that NFS was mounted successfully by running 
`df -h`

![nfs on web](./images/nfs%20mounted%20successfully%20on%20web.jpg)

- Make sure that the changes will persist on Web Server after reboot:
`sudo vi /etc/fstab`
add following line

`<NFS-Server-Private-IP-Address>:/mnt/apps /var/www nfs defaults 0 0`

### Install Remi’s repository, Apache and PHP

`sudo yum install httpd -y`

- Verify that Apache files and directories are available on the Web Server in /var/www and also on the NFS server in /mnt/apps. - If you see the same files – it means NFS is mounted correctly. You can try to create a new file touch test.txt from one server and check if the same file is accessible from other Web Servers.
![file check one](./images/test%20file%20created%20on%20web%20server.jpg)
![file check two](./images/test%20file%20visible%20on%20nfs%20server.jpg)

![file check three](./images/apache%20files%20in%20nfs%20apps.jpg)
![file check four](./images/apache%20files%20in%20web%20www.jpg)

- Locate the log folder for Apache on the Web Server and mount it to NFS server’s export for logs. Repeat step №4 to make sure the mount point will persist after reboot.
`sudo mount -t nfs -o rw,nosuid <NFS-Server-Private-IP-Address>:/mnt/logs /var/log/httpd`

`sudo vi /etc/fstab`
- add following line

`<NFSi-Server-Private-IP-Address>:/mnt/logs /var/log/httpd nfs defaults 0 0`

- Fork the tooling source code from Darey.io Github Account to your Github account. 

`sudo yum install git`
`git init`
`git clone https://github.com/samsonajulor/tooling.git`

- Deploy the tooling website’s code to the Webserver. Ensure that the html folder from the repository is deployed to /var/www/html

`cd tooling`
`sudo cp -R html/. /var/www/html`

- Note 1: Do not forget to open TCP port 80 on the Web Server.

- Note 2: If you encounter 403 Error – check permissions to your /var/www/html folder and also disable SELinux
`sudo setenforce 0`

- To make this change permanent – open following config file 
`sudo vi /etc/sysconfig/selinux`

- set 
`SELINUX=disabled`

- restart httpd
`sudo systemctl restart httpd`

![website visible](./images/web%20one%20available%20to%20web.jpg)

- Update the website’s configuration to connect to the database (in /var/www/html/functions.php file). 

`sudo vi /var/www/html/functions.php`

- update the db private ip address, username and password in that order. 

- Apply tooling-db.sql script to your database using this command 

`sudo yum install mysql -y`
`mysql -h <databse-private-ip> -u <db-username> -p tooling < tooling-db.sql`

<!-- Create in MySQL a new admin user with username: myuser and password: password:

Create a database user and name it webaccess
- get the subnet cidr of from the network tab of the server instance
`CREATE USER 'myuser'@'<Subnet-CIDR of webserver one>' IDENTIFIED BY 'password';`
Grant permission to myuser user on tooling database to do anything only from the webservers subnet cidr
`GRANT ALL PRIVILEGES ON tooling.* TO 'myuser'@'%';`
`FLUSH PRIVILEGES;`
`SHOW DATABASES;`
`USE tooling;`
`SELECT user, host FROM mysql.user`
`exit`

``` 
INSERT INTO ‘users’ (‘id’, ‘username’, ‘password’, ’email’, ‘user_type’, ‘status’) VALUES
-> (1, ‘myuser’, ‘5f4dcc3b5aa765d61d8327deb882cf99’, ‘user@mail.com’, ‘admin’, ‘1’);
```-->

![tooling db on db server](./images/tooling%20db%20accessible%20from%20db.jpg)

- remove the test page
`mv /etc/httpd/conf.d/welcome.conf /etc/httpd/conf.d/welcome.backup`
`sudo systemctl restart httpd`

Open the website in your browser http://<Web-Server-Public-IP-Address-or-Public-DNS-Name>/index.php and make sure you can login into the website with myuser user.

- install php dependencies
`sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm`

`sudo yum install yum-utils http://rpms.remirepo.net/enterprise/remi-release-8.rpm`

`sudo yum module reset php`

`sudo yum module enable php:remi-7.4`

`sudo yum install php php-opcache php-gd php-curl php-mysqlnd`

`sudo systemctl start php-fpm`

`sudo systemctl enable php-fpm`

`sudo setsebool -P httpd_execmem 1`

`sudo systemctl restart httpd`

![final page](./images/final%20page.jpg)