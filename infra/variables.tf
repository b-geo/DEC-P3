variable aws_region {
  description = "Region repo will be deployed, eg. ap-southeast-2"
  type = string
}

variable "ecr_repo_name" {
  description = "Name of the ECR repository"
  type        = string
}

variable "image_mutability" {
  description = "Whether image tags can be overwritten: MUTABLE, IMMUTABLE"
  type        = string
  default     = "MUTABLE"
}

variable "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  type        = string
}
variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "ec2_max_size" {
  description = "Maximum number of instances in the ASG"
  type        = number
  default     = 3
}

variable "ec2_min_size" {
  description = "Minimum number of instances in the ASG"
  type        = number
  default     = 1
}

variable "dotenv_bucket" {
  description = "Name of the S3 bucket containing .env file"
  type        = string
}

variable "terraform_bucket" {
  description = "Name of the S3 bucket containing terraform.tfstate"
  type        = string
}

variable "terraform_bucket_key" {
  description = "Path within the bucket of terraform.tfstate"
  type        = string
}