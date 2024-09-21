
![#c5f015](https://www.jenkins.io/images/post-images/2023/01/12/jenkins-newsletter/infrastructure.png) 
## JENKINS 101 ( Simplified )
Jenkins is an automation tool that automates the tasks of every developer. It's free to use and you can host it in your own machine. 

###   ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Setup Externally
Go and spin up a virtual machine in any cloud providers you use. Once created, install the jenkins by following the storybook created by the official team of jenkins.

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Setup Locally
You need to have Java installed in your machine. If you dont want to install JDK, you can use their docker container version. See the link below:

###   ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Installation
It depends what architecture you will use. If you want to stick with working in virtual machines, choose Linux. 

> Install in Windows:

    https://www.jenkins.io/doc/book/installing/winndows/

> Install in Linux:

    https://www.jenkins.io/doc/book/installing/linux/

> Install in Docker (Recommended):

    https://www.jenkins.io/doc/book/installing/docker/

> Install in Kubernetes:

    https://www.jenkins.io/doc/book/installing/kubernetes/

Once the Jenkins successfully installed, run it and they will ask a password to unlock. There would be a guide where you can find it.
> Snippet for going inside a container:

    docker exec -it CONTAINER_ID bash

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) NodeJS Plugin
NodeJS is not installed by default. If you want to perform some node operations inside of your controller/container/node, select Custom selections upon initial setup, find NodeJS in build tools selection and install it. 
Finally, update the tool configuration for NodeJS:
> Dashboard > Manage Jenkins > NodeJS Installations > Add NodeJS

Provide the name of the tool to be used, click 'Install automatically', select your desired version and save it. Here's how to use it inside your pipeline:

     stage("Test Application"){
      steps {
        nodejs(nodeJSInstallationName: 'nodejs') { // 'nodejs' value should match the tool name you provided above step.
          sh 'npm run test'
        }
      }
    }


###   ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Pipeline Concepts
The below fundamentals are common to both, scripted and declarative pipeline:

- **Pipeline**: A user-defined block which contains all the stages. It is a key part of declarative pipeline syntax.
- **Node**: A node is a machine that executes an entire workflow. It is a key part of the scripted pipeline syntax.
- **Agent**: instructs Jenkins to allocate an executor for the builds. It is defined for an entire pipeline or a specific stage.


Scripted pipeline
Code is written on the Jenkins UI instance and is enclosed within the node block.

    node {
          scripted pipeline code
    }


Declarative pipeline
Code is written locally in a file and is checked into a SCM and is enclosed within the pipeline block.

    pipeline {
          declarative pipeline code
    }


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

 - Make sure your repository has a 'Jenkinsfile' inside. Otherwise, no pipeline will be executed.


###   ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png)  Example of Declarative Pipeline
The steps behind this pipeline are the following: 
- Test the Application
- Build the Application
- Dockerize Application
- Push To DockerHub
- Build Image
- Push To Github (Clone build to other repo)

You have to install NodeJS plugin if you follow along this pipeline.

    pipeline {
      agent any
    
      stages {
        stage("Test Application 2"){
          steps {
            nodejs(nodeJSInstallationName: 'nodejs') {
              bat 'npm run test'
            }
          }
        }
        stage("Build Application"){
          steps {
            nodejs(nodeJSInstallationName: 'nodejs') {
              bat 'npm install'
              bat 'npm run build'
            }
          }
        }
        stage("Dockerize Application"){
          steps {
            withCredentials ([
              usernamePassword(credentialsId: 'docker-cred',
              usernameVariable: "USERNAME",
              passwordVariable: "PASSWORD"
            )]) {
              bat "docker login --username $USERNAME --password $PASSWORD"
              bat 'docker build . -t lennonjansuy/webapp:dev'
              bat 'docker images'
            } 
          }
        }
        stage("Push To DockerHub"){
          steps {
              bat 'docker push lennonjansuy/webapp:dev'
          }
        }
        stage("Push To Github (Clone build to other repo)"){
          steps {
            withCredentials([gitUsernamePassword(credentialsId: 'gh-cred', gitToolName: 'Default')]) {
              git credentialsId: 'gh-cred', url: 'https://github.com/lenn0n/jenkins-post-build.git'
              bat "echo 'node_modules' > .gitignore"
              bat 'git add .'
              bat "git commit -m 'Commit from Jenkins' || true"
              bat "git push -u origin HEAD:master || true"
            }
          }
        }
        stage("Push Build Folder in Linux Machines and Restart"){
          steps {
            echo 'TBD'
          }
        }
        stage("Kubernetes Deployment Restart"){
          steps {
            echo 'TBD'
          }
        }
    
      }
      post {
        always {
          deleteDir()
        }
      }
    
    }
  
###   ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) About Credentials

Create credentials to access tools that requires authentication.
> Dashboard > Manage Jenkins > Credentials

Click the System > Global Credentials and add new secret entry.

###   ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Start, stop and restart Jenkins
    sudo service jenkins restart
    sudo service jenkins stop
    sudo service jenkins start


###   ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Schedule a build periodically
Jenkins uses Cron expressions to schedule a job. Each line consists of 5 fields separated by TAB or whitespace:

Syntax: (Minute Hour DOM Month DOW)

> MINUTE: Minutes in one hour (0-59)

> HOURS: Hours in one day (0-23)

> DAYMONTH: Day in a month (1-31)

> MONTH: Month in a year (1-12)

> DAYWEEK: Day of the week (0-7) where 0 and 7 are sunday

Example: H/2 * * * * (schedule your build for every 2 minutes)


###   ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png)  About Built-in Nodes
We have to scale the built-in nodes to zero for security purposes. The agent will handle the builds from the controller (Jenkins Master).

### Setting up Agent (Controller)
  
In order to run agent inside of our controller, we have to allow the ports in:
> Manage Jenkins > Security > Agents > Set to FIXED: 50000 > Save
  
Next, goto Manage Jenkins > Nodes > New Node. Provide agent name, select permanent agent and create.

Specify the following:
- Remote root directory : /home/jenkins/agent
- Label : same as the agent name
- Launch method : Launch agent by connecting to controller
- Save it.

One last step is there will be a guide that you need to run in order to provision your agents. Just run it in your local or remote.

### Setting up Agent (using SSH)
You can also use the Launch method: SSH. Just create a key-pair in your machine and put it in the credentials. 
- Login to Virtual Machine
- Generate key-pair: ssh-keygen
- Goto ~/.ssh
- Edit auhorized_keys using VIM and insert the private key (with no .pub ext) at the end of file.

Paste the id_rsa.pub value at the Jenkins SSH credentials. For username, use the current one that created the key.

### Agent Usage
Now you have successfully created an agent, here's how you can use it:

    pipeline {
        agent {
            label 'NAME_OF_YOUR_AGENT'
        }
    }
