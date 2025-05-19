resource "aws_ecr_repository" "repository" {
  name                 = var.ecr_repo_name
  image_tag_mutability = var.image_mutability
}
