## JENKINS TUTORIAL
Jenkins is an automation tool that automates the task of the developers. It's free to use and you can host it in your machine. 

###   ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Setup a machine instance in any cloud providers
Go and spin up a virtual machine in any cloud providers you use. Once created, install the jenkins by following the storybook created by the official team of jenkins.

###   ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Installation

> Install in Linux:

    https://www.jenkins.io/doc/book/installing/linux/

> Install in Docker:

    https://www.jenkins.io/doc/book/installing/docker/

If you want to run node inside the jenkins controller, add this line in the Dockerfile of jenkins docker container. You can also do this in Linux, just remove the RUN command.

    RUN apt-get install -y nodejs


