resource "aws_ecr_repository" "orchestration_repo" {
  name                 = var.ecr_orchestration_repo_name
  image_tag_mutability = var.image_mutability
}

resource "aws_ecr_repository" "dashboard_repo" {
  name                 = var.ecr_dashboard_repo_name
  image_tag_mutability = var.image_mutability
}

output "orchestration_repo_url" {
  description = "The URL of the orchestration ECR repository"
  value       = aws_ecr_repository.orchestration_repo.repository_url
}

output "dashboard_repo_url" {
  description = "The URL of the dashboard ECR repository"
  value       = aws_ecr_repository.dashboard_repo.repository_url
}