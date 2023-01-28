![plan](./images/architectural_plan.png)

# Step 1 - INSTALL AND CONFIGURE ANSIBLE ON EC2 INSTANCE
- Update Name tag on your Jenkins EC2 Instance to _Jenkins-Ansible_. We will use this server to run playbooks.

- In your GitHub account create a new repository and name it _ansible-config-mgt_.

- Install Ansible
`sudo apt update`

`sudo apt install ansible`

- Check your Ansible version by running `ansible --version`

![ansible installed](./images/ansible%20installed.jpg)

- Configure Jenkins build job to save your repository content every time you change it – this will solidify your Jenkins configuration skills acquired in Project 9.

- Create a new Freestyle project ansible in Jenkins and point it to your ‘ansible-config-mgt’ repository.

- Configure Webhook in GitHub and set webhook to trigger ansible build.

- Configure a Post-build job to save all (**) files, like you did it in Project 9.

- Test your setup by making some change in README.MD file in master branch and make sure that builds starts automatically and Jenkins saves the files (build artifacts) in following folder

`ls /var/lib/jenkins/jobs/ansible/builds/<build_number>/archive/`

Note: Trigger Jenkins project execution only for /main (master) branch.
![jenkins configured](./images/jenkins%20build%20configured.jpg)

Now your setup will look like this:

![jenkins setup](./images/jenkins_ansible_architectural_plan.png)

- Tip Every time you stop/start your Jenkins-Ansible server – you have to reconfigure GitHub webhook to a new IP address, in order to avoid it, it makes sense to allocate an Elastic IP to your Jenkins-Ansible server (you have done it before to your LB server in Project 10). Note that Elastic IP is free only when it is being allocated to an EC2 Instance, so do not forget to release Elastic IP once you terminate your EC2 Instance.

# Step 2 – Prepare your development environment using Visual Studio Code
- After you have successfully installed VSC, configure it to connect to your newly created GitHub repository.

- Clone down your ansible-config-mgt repo to your Jenkins-Ansible instance

- download remote development pack from the extensions library.

`git clone <ansible-config-mgt repo link>`

![ansible repository cloned](./images/ansible%20repository%20clones.jpg)
# Step 3 - BEGIN ANSIBLE DEVELOPMENT
- In your ansible-config-mgt GitHub repository, create a new branch that will be used for development of a new feature.
Tip: Give your branches descriptive and comprehensive names, for example, if you use Jira or Trello as a project management tool – include ticket number (e.g. PRJ-145) in the name of your branch and add a topic and a brief description what this branch is about – a bugfix, hotfix, feature, release (e.g. feature/prj-145-lvm)

- Checkout the newly created feature branch to your local machine and start building your code and directory structure
- Create a directory and name it playbooks – it will be used to store all your playbook files.
- Create a directory and name it inventory – it will be used to keep your hosts organized.
- Within the playbooks folder, create your first playbook, and name it common.yml
- Within the inventory folder, create an inventory file (.yml) for each environment (Development, Staging Testing and Production) dev, staging, uat, and prod respectively.

![inventory](./images/inventory%20files%20created.jpg)

# Step 4 – Set up an Ansible Inventory
- An Ansible inventory file defines the hosts and groups of hosts upon which commands, modules, and tasks in a playbook operate. Since our intention is to execute Linux commands on remote hosts, and ensure that it is the intended configuration on a particular server that occurs. It is important to have a way to organize our hosts in such an Inventory.

- Save below inventory structure in the inventory/dev file to start configuring your development servers. Ensure to replace the IP addresses according to your own setup.

Note: Ansible uses TCP port 22 by default, which means it needs to ssh into target servers from Jenkins-Ansible host – for this you can implement the concept of ssh-agent. Now you need to import your key into ssh-agent:

- To learn how to setup SSH agent and connect VS Code to your Jenkins-Ansible instance, please see this video:

[ssh agent for windows](https://youtu.be/OplGrY74qog)
[ssh agent for linux](https://youtu.be/OplGrY74qog)

`eval ssh-agent -s`
`ssh-add  <path-to-private-key>`

- Confirm the key has been added with the command below, you should see the name of your key

`ssh-add -l`

- Now, ssh into your Jenkins-Ansible server using ssh-agent

`ssh -A ubuntu@public-ip`

Also notice, that your Load Balancer user is `ubuntu` and user for RHEL-based servers is `ec2-user`.

- Update your inventory/dev.yml file with this snippet of code:

```
[nfs]
<NFS-Server-Private-IP-Address> ansible_ssh_user='ec2-user'

[webservers]
<Web-Server1-Private-IP-Address> ansible_ssh_user='ec2-user'
<Web-Server2-Private-IP-Address> ansible_ssh_user='ec2-user'

[db]
<Database-Private-IP-Address> ansible_ssh_user='ec2-user' 

[lb]
<Load-Balancer-Private-IP-Address> ansible_ssh_user='ubuntu'
```

# Step 5 – Create a Common Playbook
It is time to start giving Ansible the instructions on what you need to be performed on all servers listed in inventory/dev.

In common.yml playbook you will write configuration for repeatable, re-usable, and multi-machine tasks that is common to systems within the infrastructure.

- Update your playbooks/common.yml file with following code:

```
---
- name: update web, nfs and db servers
  hosts: webservers, nfs, db
  remote_user: ec2-user
  become: yes
  become_user: root
  tasks:
    - name: ensure wireshark is at the latest version
      yum:
        name: wireshark
        state: latest

- name: update LB server
  hosts: lb
  remote_user: ubuntu
  become: yes
  become_user: root
  tasks:
    - name: Update apt repo
      apt: 
        update_cache: yes

    - name: ensure wireshark is at the latest version
      apt:
        name: wireshark
        state: latest
```
- Examine the code above and try to make sense out of it. This playbook is divided into two parts, each of them is intended to perform the same task: install wireshark utility (or make sure it is updated to the latest version) on your RHEL 8 and Ubuntu servers. It uses root user to perform this task and respective package manager: yum for RHEL 8 and apt for Ubuntu.

- Feel free to update this playbook with following tasks:

- Create a directory and a file inside it
**Change timezone on all servers**
**Run some shell script**

- For a better understanding of Ansible playbooks – [watch this video from RedHat](https://youtu.be/ZAdJ7CdN7DY) and [read this article](https://www.redhat.com/en/topics/automation/what-is-an-ansible-playbook). 

# Step 6 – Update GIT with the latest code
Now all of your directories and files live on your machine and you need to push changes made locally to GitHub.

In many organisations there is a development rule that do not allow to deploy any code before it has been reviewed by an extra pair of eyes – it is also called "Four eyes principle".

#### Commit your code into GitHub:

use git commands to add, commit and push your branch to GitHub.
`git status`

`git add <selected files>`

`git commit -m "commit message"`

- Create a Pull request (PR)

**Wear a hat of another developer for a second, and act as a reviewer.**

**If the reviewer is happy with your new feature development, merge the code to the master branch.**

- Head back on your terminal, checkout from the feature branch into the master, and pull down the latest changes.

Once your code changes appear in master branch – Jenkins will do its job and save all the files (build artifacts) to `/var/lib/jenkins/jobs/ansible/builds/<build_number>/archive/` directory on Jenkins-Ansible server.

![files in jenkins](./images/files%20in%20jenkins.jpg)

![remote connection](./images/ansible%20connected.jpg)

# Step 7 – Run first Ansible test
Now, it is time to execute ansible-playbook command and verify if your playbook actually works:

<!-- `cd ansible-config-mgt` -->

<!-- `ansible-playbook -i inventory/dev.yml playbooks/common.yml` -->

`ansible-playbook -i /var/lib/jenkins/jobs/ansible/builds/<build_number>/archive/inventory/dev.yml /var/lib/jenkins/jobs/ansible management/builds/<build_number>/archive/playbooks/common.yml`

![playbook connected](./images/playbook.jpg)

- You can go to each of the servers and check if wireshark has been installed by running which wireshark or wireshark --version

Your updated with Ansible architecture now looks like this:

![ansible architecture](./images/updated_ansible_architecture.png)

# Optional step – Repeat once again
- Update your ansible playbook with some new Ansible tasks and go through the full `checkout -> change codes -> commit -> PR -> merge -> build -> ansible-playbook` cycle again to see how easily you can manage a servers fleet of any size with just one command!

