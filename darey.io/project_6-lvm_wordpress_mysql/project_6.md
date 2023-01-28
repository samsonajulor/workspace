#  how to configure Linux storage subsystem and deploy a full-scale Web Solution using WordPress CMS and MySQL RDBMS!
## Step 1 — Prepare a Web Server
- Launch a RedHat version 8 EC2 instance that will serve as "Web Server". 
- Create 3 volumes in the same AZ as your Web Server EC2, each of 10 GiB, make sure that their availability zones are the same.

- Attach all three volumes one by one to your Web Server EC2 instance.

- Open up the Linux terminal to begin configuration.

- Use `lsblk` command to inspect what block devices are attached to the server. Notice names of your newly created devices. All devices in Linux reside in /dev/ directory. Inspect it with `ls /dev/` and make sure you see all 3 newly created block devices there – their names will likely be xvdf, xvdh, xvdg.

- Use `df -h` command to see all mounts and free space on your server

- Use gdisk utility to create a single partition on each of the 3 disks

`sudo gdisk /dev/xvdf`
`sudo gdisk /dev/xvdg`
`sudo gdisk /dev/xvdh`

- the type will be 8e00, p to confirm what has been created, and w to write

Use `lsblk` utility to view the newly configured partition on each of the 3 disks.

![partitions created](./images/partitions%20created.jpg)

- Install lvm2 package using
`sudo yum install lvm2`. 

- Run `sudo lvmdiskscan` command to check for available partitions.

Note: Previously, in Ubuntu we used apt command to install packages, in RedHat/CentOS a different package manager is used, so we shall use yum command instead.

- Use pvcreate utility to mark each of 3 disks as physical volumes (PVs) to be used by LVM
NOTE: Physical volumes can only be created on a partition.
`sudo pvcreate /dev/xvdf1 /dev/xvdg1 /dev/xvdh1`

- Verify that your Physical volume has been created successfully by running 
`sudo pvs`

![physical volumes created](./images/physical%20volumes%20created.jpg)

- Use vgcreate utility to add all 3 PVs to a volume group (VG). Name the VG webdata-vg
`sudo vgcreate webdata-vg /dev/xvdh1 /dev/xvdg1 /dev/xvdf1`

- Verify that your VG has been created successfully by running `sudo vgs`

![volume groups created](./images/volume%20groups%20created.jpg)

- Use lvcreate utility to create 2 logical volumes. i) apps-lv (Use half of the PV size), and ii) logs-lv Use the remaining space of the PV size.

NOTE: apps-lv will be used to store data for the Website while, logs-lv will be used to store data for logs.

`sudo lvcreate -n apps-lv -L 14G webdata-vg`
`sudo lvcreate -n logs-lv -L 14G webdata-vg`

- Verify that your Logical Volume has been created successfully by running `sudo lvs`

![logical volumes created](./images/logical%20volumes%20created.jpg)

- Verify the entire setup

`sudo vgdisplay -v #view complete setup - VG, PV, and LV`
`sudo lsblk`

![partions completed](./images/disk%20partitioning%20setup%20completed.jpg)

- Use mkfs.ext4 to format the logical volumes with ext4 filesystem

`sudo mkfs -t ext4 /dev/webdata-vg/apps-lv`
`sudo mkfs -t ext4 /dev/webdata-vg/logs-lv`

![formatted the logical volumes](./images/formatted%20the%20logical%20volumes.jpg)

PS: logical volumes can be extended.

- Create a mount point directory /var/www/html directory to store website files

`sudo mkdir -p /var/www/html`

- Create /home/recovery/logs to store backup of log data

`sudo mkdir -p /home/recovery/logs`

- Mount /var/www/html on apps-lv logical volume

`sudo mount /dev/webdata-vg/apps-lv /var/www/html/`

- Use rsync utility to backup all the files in the log directory /var/log into /home/recovery/logs (This is required before mounting the file system)

`sudo rsync -av /var/log/. /home/recovery/logs/`

![backup completed](./images/mount%20and%20backup%20files.jpg)

- Mount /var/log on logs-lv logical volume. (Note that all the existing data on /var/log will be deleted. That is why step 15 above is very
important)

`sudo mount /dev/webdata-vg/logs-lv /var/log`

Restore log files back into /var/log directory

`sudo rsync -av /home/recovery/logs/. /var/log`

- Update /etc/fstab file so that the mount configuration will persist after restart of the server.

The UUID of the device will be used to update the /etc/fstab file;

`sudo blkid`

`sudo vi /etc/fstab`

- Update /etc/fstab using your own UUID and remember to remove the leading and ending quotes.

```
UUID=0f9e1120-382c-43aa-bef0-40d9b076c4e8 /var/www/html ext4 defaults 0 0
UUID=b2f728a6-ef26-426c-ad5a-23597abb190e /var/log      ext4 defaults 0 0
```

- Test the configuration and reload the daemon

`sudo mount -a`
`sudo systemctl daemon-reload`

- Verify your setup by running df -h, output must look like this:

![web server created](./images/webserver%20complete.jpg)


## Step 2 — Prepare the Database Server
- Launch a second RedHat version 8 EC2 instance that will have a role – ‘DB Server’
- Repeat the same steps as for the Web Server, but instead of apps-lv create db-lv and mount it to /db directory instead of /var/www/html/.

- - Use `lsblk` command to inspect what block devices are attached to the server. Notice names of your newly created devices. All devices in Linux reside in /dev/ directory. Inspect it with `ls /dev/` and make sure you see all 3 newly created block devices there – their names will likely be xvdf, xvdh, xvdg.

- Use `df -h` command to see all mounts and free space on your server

- Use gdisk utility to create a single partition on each of the 3 disks

`sudo gdisk /dev/xvdf`
`sudo gdisk /dev/xvdg`
`sudo gdisk /dev/xvdh`

- the type will be 8e00, p to confirm what has been created, and w to write

Use `lsblk` utility to view the newly configured partition on each of the 3 disks.

- Install lvm2 package using 
`sudo yum install lvm2`. 

- Run `sudo lvmdiskscan` command to check for available partitions.

![available partitions](./images/available%20partitions.jpg)

Note: Previously, in Ubuntu we used apt command to install packages, in RedHat/CentOS a different package manager is used, so we shall use yum command instead.

- Use pvcreate utility to mark each of 3 disks as physical volumes (PVs) to be used by LVM
`sudo pvcreate /dev/xvdf1 /dev/xvdg1 /dev/xvdh1`

- Verify that your Physical volume has been created successfully by running `sudo pvs`

- Use vgcreate utility to add all 3 PVs to a volume group (VG). Name the VG webdata-vg
`sudo vgcreate database-vg /dev/xvdh1 /dev/xvdg1 /dev/xvdf1`

- Verify that your VG has been created successfully by running `sudo vgs`

- Use lvcreate utility to create 1 logical volume. i) db-lv

NOTE: db-lv will be used to store data for the Website while, logs-lv will be used to store data for logs.

`sudo lvcreate -n db-lv -L 20G database-vg`

- Verify that your Logical Volume has been created successfully by running `sudo lvs`

- Verify the entire setup

`sudo vgdisplay -v #view complete setup - VG, PV, and LV`
`sudo lsblk`

- Use mkfs.ext4 to format the logical volumes with ext4 filesystem

`sudo mkfs -t ext4 /dev/database-vg/db-lv`

- Create /db directory to store website files

`sudo mkdir -p /db`

- Mount /db on db-lv logical volume

`sudo mount /dev/database-vg/db-lv /db`

- Update /etc/fstab file so that the mount configuration will persist after restart of the server.

The UUID of the device will be used to update the /etc/fstab file;

`sudo blkid`

`sudo vi /etc/fstab`

- Update /etc/fstab using your own UUID and remember to remove the leading and ending quotes.

```
UUID=0fd42d7f-9a7a-4be5-849e-b8434fad5019 /db ext4 defaults 0 0
```

- Test the configuration and reload the daemon

`sudo mount -a`
`sudo systemctl daemon-reload`

## Step 3 — Install WordPress on your Web Server EC2
- Update the repository

`sudo yum -y update`

- Install wget, Apache and it’s dependencies

`sudo yum -y install wget httpd php php-mysqlnd php-fpm php-json`


[apache completed](./images/apache%20completed.jpg)

- Start Apache

`sudo systemctl enable httpd`
`sudo systemctl start httpd`

To install PHP and it’s dependencies

`sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm`
`sudo yum install yum-utils http://rpms.remirepo.net/enterprise/remi-release-8.rpm`
`sudo yum module list php`
`sudo yum module reset php`
`sudo yum module enable php:remi-7.4`
`sudo yum install php php-opcache php-gd php-curl php-mysqlnd`
`sudo systemctl start php-fpm`
`sudo systemctl enable php-fpm`
`sudo setsebool -P httpd_execmem 1`

- Restart Apache

`sudo systemctl restart httpd`

- go to public ip address to verify the installation.
![apache web](./images/apache%20web.jpg)

- Download wordpress and copy wordpress to var/www/html

`mkdir wordpress`
`cd   wordpress`
`sudo wget http://wordpress.org/latest.tar.gz`
`sudo tar xzvf latest.tar.gz`
`sudo rm -rf latest.tar.gz`
`sudo cp -R wordpress/wp-config-sample.php wordpress/wp-config.php`
copy only the content of wordpress
`sudo cp -R wordpress/. /var/www/html/`

- Configure SELinux Policies

`sudo chown -R apache:apache /var/www/html`
`sudo chcon -t httpd_sys_rw_content_t /var/www/html -R`
`sudo setsebool -P httpd_can_network_connect=1`

[wordpress installed](./images/wordpress%20installation%20complete.jpg)

## Step 4 — Install MySQL on your DB Server EC2
`sudo yum update`
`sudo yum install mysql-server -y`

- Verify that the service is up and running by using
`sudo systemctl start mysqld`
`sudo systemctl enable mysqld`
`sudo systemctl status mysqld`

[sql server running](./images/sql%20installed%20in%20db.jpg)

# Step 5 — Configure DB to work with WordPress

`sudo mysql_secure_installation`

` sudo mysql -u root -p`

`CREATE DATABASE wordpress;`
`CREATE USER 'wordpress'@'%' IDENTIFIED WITH mysql_native_password BY 'wordpress';`
`GRANT ALL PRIVILEGES ON *.* TO 'wordpress'@'%' WITH GRANT OPTION;`
`FLUSH PRIVILEGES;`
`SHOW DATABASES;`
`exit`

check the db for user
`select  user, host from mysql.user;`

[setup complete](./images/db%20sql%20setup%20completed.jpg)

- set the bind address
`sudo vi /etc/my.cnf`

add the following
```
[mysqld]
bind-address=0.0.0.0
```

`sudo systemctl restart mysqld`
`sudo systemctl enable mysqld`
`sudo systemctl status mysqld`

## Step 6 — Configure WordPress to connect to remote database.
Hint: Do not forget to open MySQL port 3306 on DB Server EC2. For extra security, you shall allow access to the DB server ONLY from your Web Server’s IP address, so in the Inbound Rule configuration specify source as /32

- edit the wordpress configuration file from the html folder 

`cd /var/www/html`
`sudo vi wp-config.php`

PS: edit the dbuser, dbname, dbpassword, and private ip address

- Restart Apache

`sudo systemctl restart httpd`

- disable the default apache page
`mv /etc/httpd/conf.d/welcome.conf /etc/httpd/conf.d/welcome.conf_backup`

- Install MySQL client and test that you can connect from your Web Server to your DB server by using mysql-client
`sudo yum install mysql`
`sudo mysql -h 172.31.19.216 -u wordpress -p`
`show databases;`

![show databases](./images/showdatabases%20from%20server.jpg)

- Change permissions and configuration so Apache could use WordPress:

`sudo chown -R apache:apache /var/www/html`
`sudo chcon -t httpd_sys_rw_content_t /var/www/html -R`
`sudo setsebool -P httpd_can_network_connect 1`
`sudo setsebool -P httpd_can_network_connect_db 1`

- Enable TCP port 80 in Inbound Rules configuration for your Web Server EC2 (enable from everywhere 0.0.0.0/0 or from your workstation’s IP)

- disable default apache page
`sudo mv /etc/httpd/conf.d/welcome.conf /etc/httpd/conf.d/welcome.conf_backup`
`systemctl restart httpd`

- Try to access from your browser the link to your WordPress 
`http://<Web-Server-Public-IP-Address>/wordpress/`

Fill out your DB credentials:

![wordpress site](./images/wordpress%20site.jpg)


