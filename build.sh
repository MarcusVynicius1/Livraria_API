ECR_REGISTRY="432008002022.dkr.ecr.us-east-1.amazonaws.com"
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 432008002022.dkr.ecr.us-east-1.amazonaws.com
docker build -t aws_aula .
docker tag aws_aula:latest $ECR_REGISTRY/aws_aula:latest
docker push $ECR_REGISTRY/aws_aula:latest
