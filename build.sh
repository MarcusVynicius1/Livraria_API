ECR_REGISTRY="432008002022.dkr.ecr.us-east-1.amazonaws.com"
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 432008002022.dkr.ecr.us-east-1.amazonaws.com
docker build -t crud aws_aula.
docker tag crud:latest $ECR_REGISTRY/crud:latest
docker push crud:latest $ECR_REGISTRY/crud:latest
