terraform {
  backend "s3" {
    bucket = "zacrac-app"
    region = "us-east-1"
    key = "eks/terraform.tfstate"
  }
}