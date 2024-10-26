

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

### Copy Kubernetes Configuration from AWS
Update your kubeconfig to allow kubectl to connect to your new EKS cluster:

	aws eks update-kubeconfig --name <your-cluster-name> --region <your-region>

### Creating Kubernetes Dashboard
The simpliest way of managing control plane is to use K8s Dashboard, install it:

 	kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml

### Creating an Admin User for Dashboard Access
Create a YAML file (e.g., admin-user.yaml) with the following content:

	apiVersion: v1
	kind: ServiceAccount
	metadata:
	  name: admin-user
	  namespace: kubernetes-dashboard
	---
	apiVersion: rbac.authorization.k8s.io/v1
	kind: ClusterRoleBinding
	metadata:
	  name: admin-user
	roleRef:
	  apiGroup: rbac.authorization.k8s.io
	  kind: ClusterRole
	  name: cluster-admin
	subjects:
	- kind: ServiceAccount
	  name: admin-user
	  namespace: kubernetes-dashboard


### Apply the Configuration and Generate Token

	kubectl apply -f admin-user.yaml

### Generate a token for the admin user:

	kubectl -n kubernetes-dashboard create token admin-user

 ### Access the K8s Dashboard

 	kubectl proxy

Finally, Open this URL to your browser: http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/ and use the token generated above to proceed.

### Creating Docker Registry Secret

To allow Kubernetes to pull images from Docker Hub, create a secret using the following command:

	kubectl create secret docker-registry dockerhub \
	  --docker-username=XX \
	  --docker-password=XX \
	  --docker-email=XX \
	  --docker-server=https://index.docker.io/v1/


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

Setting Up Ingress

To access your services externally, you need to install an ingress controller. Here's how to install the Nginx Ingress Controller:

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/aws/deploy.yaml



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
