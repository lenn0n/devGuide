

# ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Getting Started with Amazon EKS

This guide will walk you through the process of setting up a Kubernetes cluster using Amazon EKS (Elastic Kubernetes Service) step by step.

## Prerequisites
Before you begin, ensure you have the following:

- An AWS account.
- Basic knowledge of Kubernetes and AWS services.

## Installation

### Download and Install Required Tools
- **EKSCTL**: Command line tool for creating EKS clusters.
- **KUBECTL**: Command line tool for interacting with Kubernetes clusters.
- **AWS CLI**: Command line tool for managing AWS services.

You can install these tools using package managers like Homebrew on macOS or Chocolatey on Windows, or download them directly from their respective websites.

### Create a Cluster and IAM Role in EKS
You can create a cluster and the necessary IAM role directly from the AWS Management Console or using `eksctl`. Here’s how to do it with `eksctl`:

```bash
eksctl create cluster --name <your-cluster-name> --region <your-region> --nodes 3 --node-type t2.micro
```

### Set Up Nodegroup or Fargate
Choose whether to use Nodegroups or Fargate for running your applications. Nodegroups use EC2 instances, while Fargate provides a serverless experience.

## Configuring AWS CLI

### Configure AWS CLI
Open your terminal and run the following command to configure the AWS CLI:

```bash
aws configure
```

### Create Access Key
1. Go to the AWS Management Console.
2. Navigate to **Security Credentials**.
3. Create an **Access Key** for programmatic access.


# ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Getting Started with Amazon ECS:


Prequisite: Setup Amazon ECR
 - Install AWS CLI
 - Create Access Key in IAM Console (Not Recommended)
 - Configure CLI using Access Key - aws configure
 - Login to CLI
   - aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin 193055716947.dkr.ecr.ap-southeast-2.amazonaws.com
   - the URL for your default private registry is https://aws_account_id.dkr.ecr.us-west-2.amazonaws.com.
1. Create Cluster
2. Create Task Definition
3. Create Service/Task




# ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Getting Started with Amazon EC2:


1. Create an Instance
 - Set Security Group 
	HTTP - All
	SSH - 0.0.0.0/22
2. Login SSH
 - ssh -i KEY.PEM USER@HOST
3. Update packages inside of VM and install required dependencies


# ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) How to Restart Deployments in Amazon ECS


To restart deployments in Amazon Elastic Container Service (ECS), you can use the following command:

	aws ecs update-service --cluster :clusterName --service :serviceName --force-new-deployment

To restart deployments in Amazon Elastic Compute Cloud (EC2) (Docker inside Machine) and Elastic Kubernetes Service (EKS), type:

	kubectl rollout restart DEPLOYMENT

# ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) CICD RealWorld Example:


1. Talk about phasing:

Phase 1: Setup Network Environment
 - it should be private
 - it should be isolated
 - it should be secured

* K8s cluster - deploy app, scan it
* VMs - Sonar, Nexus, Jenkins, Monitoring tools

Phase 2: Setup repository
 - Git Repo [Private]
 - Push source code, visible to all

Phase 3: Working with CI/CD pipelines
 - following best practices
 - security measures
 - configure mail notification - if the pipeline is success, we can receive a notification

Phase 4: Setup monitoring tools
 - Monitor App - System load, CPU, Ram, Website level, traffic

2. Setup Cloud
 - Setup VPC
 - Setup Security Group - add IPs
 465 port - gmail smtp
 6443 port - kubernetes deployment
 - Setup EC2/VM instance
 - chmod +x shellscriptname.sh 

3. Setup Kubernetes
