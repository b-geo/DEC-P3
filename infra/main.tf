terraform {
  backend "s3" {
    bucket         = var.terraform_bucket
    key            = var.terraform_bucket_key
    region         = var.aws_region
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
  region = var.aws_region
}
