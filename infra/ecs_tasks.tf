resource "aws_iam_role" "s3_dotenv" {
  name = "s3EnvAccess"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_policy" "s3_env_file_access" {
  name        = "S3EnvFileAccess"
  description = "Allows access to the environment file in S3"
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "s3:GetObject",
          "s3:GetBucketLocation"
        ],
        Resource = [
          "arn:aws:s3:::${var.dotenv_bucket}/.env"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "s3_dotenv_s3_access" {
  role       = aws_iam_role.s3_dotenv.name
  policy_arn = aws_iam_policy.s3_env_file_access.arn
}

# Standard ECS execution role policies
resource "aws_iam_role_policy_attachment" "s3_dotenv_ecs_execution" {
  role       = aws_iam_role.s3_dotenv.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Then in your task definition:
resource "aws_ecs_task_definition" "race_dashboard" {
  family                   = "race_dashboard"
  execution_role_arn       = aws_iam_role.s3_dotenv.arn
  cpu                      = "1024"
  memory                   = "512"
  requires_compatibilities = ["EC2"]
  network_mode             = "bridge" # Default for EC2 launch type

  runtime_platform {
    cpu_architecture        = "X86_64"
    operating_system_family = "LINUX"
  }

  container_definitions = jsonencode([
    {
      name      = "race_dashboard"
      image     = "${aws_ecr_repository.dashboard_repo.repository_url}:${var.image_tag}"
      cpu       = 0
      essential = true
      portMappings = [
        {
          name          = "3000-tcp"
          containerPort = 3000
          hostPort      = 3000
          protocol      = "tcp"
          appProtocol   = "http"
        }
      ]
      environment = []
      environmentFiles = [
        {
          value = "arn:aws:s3:::${var.dotenv_bucket}/.env"
          type  = "s3"
        }
      ]
    }
  ])
}

resource "aws_ecs_task_definition" "pipeline_orchestration" {
  family                   = "pipeline_orchestration"
  execution_role_arn       = aws_iam_role.s3_dotenv.arn
  cpu                      = "2048"
  memory                   = "4096"
  network_mode             = "awsvpc"  # Required for Fargate
  requires_compatibilities = ["FARGATE"]

  runtime_platform {
    cpu_architecture        = "X86_64"
    operating_system_family = "LINUX"
  }

  container_definitions = jsonencode([
    {
      name      = "f1_orchestration"
      image     = "${aws_ecr_repository.orchestration_repo.repository_url}:${var.image_tag}"
      cpu       = 0
      essential = true
      portMappings = [
        {
          name          = "3000-tcp"
          containerPort = 3000
          hostPort      = 3000  # Must match containerPort for Fargate
          protocol      = "tcp"
          appProtocol   = "http"
        },
        {
          name          = "4000-tcp"
          containerPort = 4000
          hostPort      = 4000  # Must match containerPort for Fargate
          protocol      = "tcp"
        }
      ]
      environment = []
      environmentFiles = [
        {
          value = "arn:aws:s3:::${var.dotenv_bucket}/.env"
          type  = "s3"
        }
      ]
    }
  ])
}