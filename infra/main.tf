terraform {
  backend "s3" {
    bucket         = "tfstate-bgeo"
    key            = "ecs-app-bgeo/terraform.tfstate"
    region         = "ap-southeast-2"
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.17.0"
    }
  }
}

provider "aws" {
  region = "ap-southeast-2"
}