--------------------------------
### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) CICD RealWorld Example:
--------------------------------

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


--------------------------------
### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) GETTING STARTED WITH AWS ECS:
--------------------------------

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



--------------------------------
### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) GETTING STARTED WITH AWS EC2:
--------------------------------

1. Create an Instance
 - Set Security Group 
	HTTP - All
	SSH - 0.0.0.0/22
2. Login SSH
 - ssh -i KEY.PEM USER@HOST
3. Update packages inside of VM and install required dependencies



--------------------------------
### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) GETTING STARTED WITH AWS EKS:
--------------------------------

- Install EKSCTL CLI tool for managing cluster

CREATE: eksctl create cluster 
DELETE: eksctl delete cluster --name=<name> [--region=<region>]

Creating custom cluster: 
eksctl create cluster -f cluster.yaml

apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
  name: basic-cluster
  region: ap-southeast-2

nodeGroups:
  - name: ng-1
    instanceType: m5.large
    desiredCapacity: 10
  - name: ng-2
    instanceType: m5.xlarge
    desiredCapacity: 2


HOW TO RESTART DEPLOYMENTS IN ECS?
>		aws ecs update-service --cluster :clusterName --service :serviceName --force-new-deployment

HOW TO RESTART DEPLOYMENTS IN EC2 AND EKS?
use current context and type: 
>		kubectl rollout restart DEPLOYMENT
or use kubernetes-dashboard
