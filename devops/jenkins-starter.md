
![#c5f015](https://www.jenkins.io/images/post-images/2023/01/12/jenkins-newsletter/infrastructure.png) 
## JENKINS 101 ( Simplified )
Jenkins is an automation tool that automates the tasks of every developer. It's free to use and you can host it in your own machine. 

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

If you want to run node inside the jenkins controller without plugin, add this line in the Dockerfile of jenkins docker container that is given above. You can also do this in Linux, just remove the RUN command and install it.

    RUN apt-get install -y nodejs

Once the Jenkins successfully installed, run it and they will ask a password to unlock. There would be a guide where you can find it.
> Snippet for going inside a container:

    docker exec -it CONTAINER_ID bash


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


###   ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Using of Plugins
Plugins are a way to extend the functionality of Jenkins, an open-source platform for CI/CD and deployment. There are over a thousand different plugins which can be installed on a Jenkins controller and to integrate various build tools, cloud providers, analysis tools, and much more.
> Dashboard > Manage Jenkins > Plugins > Available Plugins

For example, you need to use NodeJS to perform some actions like npm run build, node index.js, go download it from above step.

Once the installation is completed, you have to enable that plugin in your Jenkins config.
> Dashboard > Manage Jenkins > Tools

Find the NodeJS settings by scrolling down the page. Add and save the config.

Usage:

    stage('Build the Application') {
      steps {
        nodejs(nodeJSInstallationName: 'nodejs') {
            sh 'npm install'
            sh 'npm run build'
        }
    
      }
    }

###   ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png)  Working example of Declarative Pipeline
The steps behind this pipeline are: 
- Install the node dependencies
- Build the application
- Assign default email and name for GIT
- Push to Github
- Build Docker Image
- Push to DockerHub


    pipeline {
        agent any

        stages {
            stage('Build the Application') {
             steps {
                nodejs(nodeJSInstallationName: 'nodejs') {
                    sh 'npm install'
                    sh 'npm run build'
                }
         
              }
            }

          stage('Assign global email and name'){
                steps {
                  sh 'git config --global user.email "auto@jenkins.com"'
                  sh 'git config --global user.name "Jenkins"'
                }
           }
           
           stage('Push to Github') {
              steps {
                sh 'touch something_new.txt'
                sh 'git add .'
                sh "git commit -m 'Commit from Jenkins'"
                withCredentials([gitUsernamePassword(credentialsId: 'gh-cred', gitToolName: 'Default')]) {
                    sh "git push -u origin HEAD:master"
                }
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

> NodeJS

    https://plugins.jenkins.io/nodejs/


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


