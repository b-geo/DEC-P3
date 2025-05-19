variable aws_region {
  description = "Region repo will be deployed, eg. ap-southeast-2"
  type = string
}

variable "ecr_dashbaord_repo_name" {
  description = "Name of the ECR repository used for dashbaord"
  type        = string
}

variable "ecr_orchestration_repo_name" {
  description = "Name of the ECR repository used for pipeline orchestration"
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