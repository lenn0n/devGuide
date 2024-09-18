
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

###   ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png)  Create your Pipeline project in Jenkins
In Jenkins, select New Item under Dashboard > at the top left.

 - Enter your new Pipeline project name, such as simple-node-js-react-npm-app, in Enter an item name.

 - Scroll down if necessary and select Pipeline, then select OK at the end of the page.

 - (Optional) Enter a Pipeline Description.

 - Select Pipeline on the left pane.

 - Select Definition and then choose the Pipeline script from SCM option. This option instructs Jenkins to obtain your Pipeline from the source control management (SCM), which is your forked Git repository.

 - Choose Git from the options in SCM.

 - Enter the URL of your repository in Repositories/Repository URL. This URL can be found when selecting the green Code button in the main page of your GitHub repo.

 - Select Save at the end of the page. You’re now ready to create a Jenkinsfile to check into your locally cloned Git repository.

###   ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png)  Sample Groovy Script

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

###   ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Jenkins Useful Plugins
These are the plugins I found useful if you are developing web applications like I do. 

> Kubernetes CLI Plugin

    https://plugins.jenkins.io/kubernetes-cli/



