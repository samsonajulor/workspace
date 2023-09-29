terraform {
  backend "s3" {
    bucket = "zacrac-app"
    region = "us-east-1"
    key = "jenkins-server/terraform.tfstate"
  }
}