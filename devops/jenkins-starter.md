
![#c5f015](https://www.jenkins.io/images/post-images/2023/01/12/jenkins-newsletter/infrastructure.png) 
## JENKINS 101 ( Simplified )
Jenkins is an automation tool that automates the task of every developer. It's free to use and you can host it in your own machine. 

###   ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Setup Externally
Go and spin up a virtual machine in any cloud providers you use. Once created, install the jenkins by following the storybook created by the official team of jenkins.

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Setup Locally
Download and install Docker and JDK.

###   ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Installation
It depends what architecture you will use. If you want to stick with VMs, choose Linux. Otherwise..

> Install in Linux:

    https://www.jenkins.io/doc/book/installing/linux/

> Install in Docker:

    https://www.jenkins.io/doc/book/installing/docker/

> Install in Kubernetes:

    https://www.jenkins.io/doc/book/installing/kubernetes/

If you want to run node inside the jenkins controller, add this line in the Dockerfile of jenkins docker container that is given above. You can also do this in Linux, just remove the RUN command and install it.

    RUN apt-get install -y nodejs

Once the Jenkins successfully installed, run it and they will ask a password to unlock. There would be a guide where you can find it.
> Snippet for going inside a container:

    docker exec -it CONTAINER_ID bash


Sample Groovy Script

    pipeline {
        agent any

        stages {
            stage("Compile and Test") {
                steps {
                    git 'https://github.com/....git'
                    bat "command_here"
                }
            }

            stage("Create Docker Image") {
                steps {
                    sh 'docker build'
                }
            }

            stage("Deploy to Dockerhub") {
              steps {
                script {
                    withCredentials ([
                        usernamePassword(credentialsId: docker-cred-name,
                        usernameVariable: "USERNAME",
                        passwordVariable: 'PASSWORD"
                    )]) {
                        sh 'docker login --username $USERNAME -- password PASSWORD'
                    } 
                }
              } 
            }
              
            
        }

    }

