# Overview
Terraform enables you to safely and predictably create, change, and improve infrastructure. It is an open-source tool that codifies APIs into declarative configuration files that can be shared among team members, treated as code, edited, reviewed, and versioned.

In this lab, I created a Terraform configuration with a module to automate the deployment of Google Cloud infrastructure. Specifically, I deployed one auto mode network with a firewall rule and two VM instances, as shown in this diagram:

![Terraform configuration diagram](./images/terraform%20configuration%20diagram.png)

## Objectives
In this lab, I learnt how to perform the following tasks:

- Create a configuration for an auto mode network

- Create a configuration for a firewall rule

- Create a module for VM instances

- Create and deploy a configuration

- Verify the deployment of a configuration

### 1. Set up Terraform and Cloud Shell
- Configure your Cloud Shell environment to use Terraform.

###### Install Terraform
- Terraform is now integrated into Cloud Shell. Verify which version is installed.

- In the Cloud Console, click Activate Cloud Shell ![cloud shell icon](./images/cloud%20shell%20icon.png).

- If prompted, click Continue.

- To confirm that Terraform is installed, run the following command:

`terraform --version`

```
Note: Don't worry if you get a warning that the version of Terraform is out of date, because the lab instructions will work with Terraform v0.12.2 and later. The available downloads for the latest version of Terraform are on the Terraform website. Terraform is distributed as a binary package for all supported platforms and architectures, and Cloud Shell uses Linux 64-bit.
```

- To create a directory for your Terraform configuration, run the following command:

`mkdir tfinfra`

- In Cloud Shell, click Open editor ![edit shell icon](./images/edit%20shell%20icon.png).

- Note: If you see the message "Unable to load code editor because third-party cookies are disabled", click Open in New Window. The code editor will open in a new tab. Return to the original tab, click Open Terminal and then switch back to the code editor tab. You will periodically need to switch back to the Cloud Shell terminal in this lab.

- In the left pane of the code editor, expand the tfinfra folder.

### Initialize Terraform
Terraform uses a plugin-based architecture to support the numerous infrastructure and service providers available. Each "provider" is its own encapsulated binary distributed separately from Terraform itself. Initialize Terraform by setting Google as the provider.

- To create a new file inside tfinfra folder, right-click on tfinfra folder and then click New File.

- Name the new file provider.tf, and then open it.

- Copy the code into provider.tf:

---
provider "google" {}
---

- To save provider.tf, click File > Save.

- To initialize Terraform, run the following command:

`cd tfinfra`
`terraform init`

- Terraform has been successfully initialized!
You are now ready to work with Terraform in Cloud Shell.

### 2. Create mynetwork and its resources
- Create the auto mode network mynetwork along with its firewall rule and two VM instances (mynet_us_vm and mynet_eu_vm).

### Configure mynetwork
- Create a new configuration, and define mynetwork.

- To create a new file inside tfinfra, right-click on tfinfra folder and then click New File.

- Name the new file mynetwork.tf, and then open it.

- Copy the following base code into mynetwork.tf:

```
# Create the mynetwork network
resource [RESOURCE_TYPE] "mynetwork" {
name = [RESOURCE_NAME]
# RESOURCE properties go here
}
```

This base template is a great starting point for any Google Cloud resource. The name field allows you to name the resource, and the type field allows you to specify the Google Cloud resource that you want to create. You can also define properties, but these are optional for some resources.

- In mynetwork.tf, replace [RESOURCE_TYPE] with "google_compute_network" (with the quotes).

---
Note: The google_compute_network resource is a VPC network. Available resources are in the [Google Cloud provider documentation](https://www.terraform.io/docs/providers/google/index.html). Learn more about this specific resource in the [Terraform documentation](https://www.terraform.io/docs/providers/google/r/compute_network).
---

- In mynetwork.tf, replace [RESOURCE_NAME] with "mynetwork" (with the quotes).

- Add the following property to mynetwork.tf:

`auto_create_subnetworks = "true"`

By definition, an auto mode network automatically creates a subnetwork in each region. Therefore, you are setting auto_create_subnetworks to true.

- Verify that mynetwork.tf file look like this:

```
# Create the mynetwork network
resource "google_compute_network" "mynetwork" {
name = "mynetwork"
# RESOURCE properties go here
auto_create_subnetworks = "true"
}
```

- To save mynetwork.tf, click File > Save.

## Configure the firewall rule
Define a firewall rule to allow HTTP, SSH, RDP, and ICMP traffic on mynetwork.

- Add the following base code to mynetwork.tf:

```
# Add a firewall rule to allow HTTP, SSH, RDP and ICMP traffic on mynetwork
resource [RESOURCE_TYPE] "mynetwork-allow-http-ssh-rdp-icmp" {
name = [RESOURCE_NAME]
# RESOURCE properties go here
}
```

- In mynetwork.tf, replace [RESOURCE_TYPE] with "google_compute_firewall" (with the quotes).

---
Note: The google_compute_firewall resource is a firewall rule. Learn more about this specific resource in the Terraform documentation.
---

- In mynetwork.tf, replace [RESOURCE_NAME] with "mynetwork-allow-http-ssh-rdp-icmp" (with the quotes).

- Add the following property to mynetwork.tf:

`network = google_compute_network.mynetwork.self_link`

---
Note: Because this firewall rule depends on its network, you are using the google_compute_network.mynetwork.self_link reference to instruct Terraform to resolve these resources in a dependent order. In this case, the network is created before the firewall rule.
---

- Add the following properties to mynetwork.tf:

```
allow {
    protocol = "tcp"
    ports    = ["22", "80", "3389"]
    }
allow {
    protocol = "icmp"
    }
source_ranges = ["0.0.0.0/0"]
```

The list of allow rules specifies which protocols and ports are permitted.

- Verify that your mynetwork.tf file look like this:

```
# Create the mynetwork network
resource "google_compute_network" "mynetwork" {
name = "mynetwork"
# RESOURCE properties go here
auto_create_subnetworks = "true"
}
# Add a firewall rule to allow HTTP, SSH, RDP and ICMP traffic on mynetwork
resource "google_compute_firewall" "mynetwork-allow-http-ssh-rdp-icmp" {
name = "mynetwork-allow-http-ssh-rdp-icmp"
# RESOURCE properties go here
network = google_compute_network.mynetwork.self_link
allow {
    protocol = "tcp"
    ports    = ["22", "80", "3389"]
    }
allow {
    protocol = "icmp"
    }
source_ranges = ["0.0.0.0/0"]
}
```

-To save mynetwork.tf, click File > Save.

### Configure the VM instance
Define the VM instances by creating a VM instance module. A module is a reusable configuration inside a folder. You will use this module for both VM instances of this lab.

- To create a new folder inside tfinfra, select the tfinfra folder, and then click File > New Folder.
- Name the new folder instance.
- To create a new file inside instance, right-click on instance folder and then click New File.
- Name the new file main.tf, and then open it.
You should have the following folder structure in Cloud Shell:

![Folder structure](./images/folder%20structure.png)

- Copy the following base code into main.tf:

```
resource [RESOURCE_TYPE] "vm_instance" {
  name = [RESOURCE_NAME]
  # RESOURCE properties go here
}
```

- In main.tf, replace [RESOURCE_TYPE] with "google_compute_instance" (with the quotes).

---
Note: The google_compute_instance resource is a Compute Engine instance. Learn more about this specific resource in the [Terraform documentation](https://www.terraform.io/docs/providers/google/r/compute_instance).
---

- In main.tf, replace [RESOURCE_NAME] with "${var.instance_name}" (with the quotes).
Because you will be using this module for both VM instances, you are defining the instance name as an input variable. This allows you to control the name of the variable from mynetwork.tf. Learn more about input variables in the Terraform: [Define Input Variables Guide](https://learn.hashicorp.com/terraform/getting-started/variables).

- Add the following properties to main.tf:

```
  zone         = "${var.instance_zone}"
  machine_type = "${var.instance_type}"
```

These properties define the zone and machine type of the instance as input variables.

- Add the following properties to main.tf:

```
  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
      }
  }
```

This property defines the boot disk to use the Debian 11 OS image. Because both VM instances will use the same image, you can hard-code this property in the module.

- Add the following properties to main.tf:

```
  network_interface {
    network = "${var.instance_network}"
    access_config {
      # Allocate a one-to-one NAT IP to the instance
    }
  }
```

This property defines the network interface by providing the network name as an input variable and the access configuration. Leaving the access configuration empty results in an ephemeral external IP address (required in this lab). To create instances with only an internal IP address, remove the access_config section. For more information, see the Terraform documentation.

- Verify that main.tf looks like this, including brackets {}

```
resource "google_compute_instance" "vm_instance" {
  name         = "${var.instance_name}"
  zone         = "${var.instance_zone}"
  machine_type = "${var.instance_type}"
  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
      }
  }
  network_interface {
    network = "${var.instance_network}"
    access_config {
      # Allocate a one-to-one NAT IP to the instance
    }
  }
}
```
- To save main.tf, click File > Save.

- To create a new file inside instance, right-click on instance folder and then click New File.

- Name the new file variables.tf, and then open it.

- Define the 4 input variables in variables.tf.

```
variable "instance_name" {}
variable "instance_zone" {}
variable "instance_type" {
  default = "e2-micro"
  }
variable "instance_network" {}
```

By giving instance_type a default value, you make the variable optional. The instance_name, instance_zone, and instance_network are required, and you will define them in mynetwork.tf.

- To save variables.tf, click File > Save.
- Add the following VM instances to mynetwork.tf:
```
# Create the mynet-us-vm instance
module "mynet-us-vm" {
  source           = "./instance"
  instance_name    = "mynet-us-vm"
  instance_zone    = "Zone"
  instance_network = google_compute_network.mynetwork.self_link
}
# Create the mynet-eu-vm" instance
module "mynet-eu-vm" {
  source           = "./instance"
  instance_name    = "mynet-eu-vm"
  instance_zone    = "europe-west1-d"
  instance_network = google_compute_network.mynetwork.self_link
}
```

These resources are leveraging the module in the instance folder and provide the name, zone, and network as inputs. Because these instances depend on a VPC network, you are using the google_compute_network.mynetwork.self_link reference to instruct Terraform to resolve these resources in a dependent order. In this case, the network is created before the instance.

---
Note: The benefit of writing a Terraform module is that it can be reused across many configurations. Instead of writing your own module, you can also leverage existing modules from the [Terraform Module registry](https://registry.terraform.io/browse?provider=google&verified=true).

- To save mynetwork.tf, click File > Save.

- Verify that mynetwork.tf looks like this, including brackets {}

```
# Create the mynetwork network
resource "google_compute_network" "mynetwork" {
name = "mynetwork"
# RESOURCE properties go here
auto_create_subnetworks = "true"
}
# Add a firewall rule to allow HTTP, SSH, RDP and ICMP traffic on mynetwork
resource "google_compute_firewall" "mynetwork-allow-http-ssh-rdp-icmp" {
name = "mynetwork-allow-http-ssh-rdp-icmp"
# RESOURCE properties go here
network = google_compute_network.mynetwork.self_link
allow {
    protocol = "tcp"
    ports    = ["22", "80", "3389"]
    }
allow {
    protocol = "icmp"
    }
source_ranges = ["0.0.0.0/0"]
}
# Create the mynet-us-vm instance
module "mynet-us-vm" {
  source           = "./instance"
  instance_name    = "mynet-us-vm"
  instance_zone    = "Zone"
  instance_network = google_compute_network.mynetwork.self_link
}
# Create the mynet-eu-vm" instance
module "mynet-eu-vm" {
  source           = "./instance"
  instance_name    = "mynet-eu-vm"
  instance_zone    = "europe-west1-d""
  instance_network = google_compute_network.mynetwork.self_link
}
```

### Create mynetwork and its resources
It's time to apply the mynetwork configuration.

- To rewrite the Terraform configuration files to a canonical format and style, run the following command:

`terraform fmt`


Note: If you get an error, revisit the previous steps to ensure that your configuration matches the lab instructions. If you cannot troubleshoot the issue of your configuration, download and then look at these finished configurations:

[mynetwork.tf](https://storage.googleapis.com/cloud-training/archinfra/terraform/mynetwork.tf)
[main.tf](https://storage.googleapis.com/cloud-training/archinfra/terraform/instance/main.tf)
[provider.tf](https://storage.googleapis.com/cloud-training/archinfra/terraform/provider.tf)


- To initialize Terraform, run the following command:

`terraform init`

The output should look like this:

---
Initializing modules...
- mynet-eu-vm in instance
- mynet-us-vm in instance
...
* provider.google: version = "~> 3.37"
Terraform has been successfully initialized!
---

---
Note: If you get an error, revisit the previous steps to ensure that you have the correct folder/file structure. If you cannot troubleshoot the issue of your configuration, refer to the finished configurations linked above. When you have corrected the issue, re-run the previous command.
---

- To create an execution plan, run the following command:

`terraform plan`
Copied!

The output should look like this:

```
...
Plan: 4 to add, 0 to change, 0 to destroy.
...
```

Terraform determined that the following 4 resources need to be added:

| Name |	Description |
|---|---------|
| mynetwork |	VPC network |
  mynetwork-allow-http-ssh-rdp-icmp |	Firewall rule to allow HTTP, SSH, RDP and ICMP |
| mynet-us-vm |	VM instance in Zone |
| mynet-eu-vm |	VM instance in "europe-west1-d" |

- To apply the desired changes, run the following command:

`terraform apply`

- To confirm the planned actions, type:

`yes`

The output should look like this:

```
...
Apply complete! Resources: 4 added, 0 changed, 0 destroyed.
```

---
Note: If you get an error during the execution, revisit the previous steps to ensure that you have the correct folder/file structure. If you cannot troubleshoot the issue of your configuration, refer to the finished configurations linked above. When you have corrected the issue, re-run the previous command.
---

### 3. Verify your deployment
In the Cloud Console, verify that the resources were created.

- Verify your network in the Cloud Console
In the Cloud Console, on the Navigation menu, click VPC network > VPC networks.

- View the mynetwork VPC network with a subnetwork in every region.

- On the Navigation menu, click VPC network > Firewall.

- Sort the firewall rules by Network.

- View the mynetwork-allow-http-ssh-rdp-icmp firewall rule for mynetwork.

### Verify your VM instances in the Cloud Console
- On the Navigation menu, click Compute Engine > VM instances.

- View the `mynet-us-vm` and `mynet-eu-vm` instances.

- Note the internal IP address for mynet-eu-vm.

- For mynet-us-vm, click SSH to launch a terminal and connect.

- To test connectivity to mynet-eu-vm's internal IP address, run the following command in the SSH terminal (replacing mynet-eu-vm's internal IP address with the value noted earlier):

`ping -c 3 <Enter mynet-eu-vm's internal IP here>`

---
Note: This should work because both VM instances are on the same network, and the firewall rule allows ICMP traffic!
---

### 4. Review
In this lab, I created a Terraform configuration with a module to automate the deployment of Google Cloud infrastructure. As my configuration changes, Terraform can create incremental execution plans, which allows me to build my overall configuration step by step.

The instance module allowed me to re-use the same resource configuration for multiple resources while providing properties as input variables. I can leverage the configuration and module that I created as a starting point for future deployments.

![link to documentation](https://googlepluralsight.qwiklabs.com/focuses/24786730?parent=lti_session)