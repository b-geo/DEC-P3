resource "aws_ecr_repository" "orchestration_repo" {
  name                 = var.ecr_orchestration_repo_name
  image_tag_mutability = var.image_mutability
}

resource "aws_ecr_lifecycle_policy" "orchestration_lifecycle" {
  repository = aws_ecr_repository.orchestration_repo.name
  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep last 3 images"
      action = {
        type = "expire"
      }
      selection = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = 3
      }
    }]
  })
}

resource "aws_ecr_repository" "dashboard_repo" {
  name                 = var.ecr_dashboard_repo_name
  image_tag_mutability = var.image_mutability
}

resource "aws_ecr_lifecycle_policy" "dashboard_lifecycle" {
  repository = aws_ecr_repository.dashboard_repo.name
  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep last 3 images"
      action = {
        type = "expire"
      }
      selection = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = 3
      }
    }]
  })
}

output "orchestration_repo_url" {
  description = "The URL of the orchestration ECR repository"
  value       = aws_ecr_repository.orchestration_repo.repository_url
}

output "dashboard_repo_url" {
  description = "The URL of the dashboard ECR repository"
  value       = aws_ecr_repository.dashboard_repo.repository_url
}