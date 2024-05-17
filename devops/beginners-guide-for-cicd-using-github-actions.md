## IMPLEMENTING CI/CD USING GITHUB ACTIONS 

- Create any instance in cloud service provider (alibaba, aws, azure)
- Configure VM, install packages like node, npm, nginx
- Setup VPC and enable 0.0.0.0:80
- Create folder for Runners (eg: /var/www/frontend) inside your virtual machine
- Create git repo and go to **'Settings' > 'Actions' > 'Runners'**, follow the given instruction.
- Setup github action workflows, **/.github/workflows/node.js.yml**
>     name: Node.js CI
>     
>     # Controls when the workflow will run
>     on:
>       # Triggers the workflow on push or pull request events but only for the "main" branch
>       push:
>         branches: [ "master" ]
>       pull_request:
>         branches: [ "master" ]
>     
>       # Allows you to run this workflow manually from the Actions tab
>       workflow_dispatch:
>     
>     # A workflow run is made up of one or more jobs that can run sequentially or in parallel
>     jobs:
>       # This workflow contains a single job called "build"
>       build:
>         # The type of runner that the job will run on
>         runs-on: self-hosted
>     
>         # Steps represent a sequence of tasks that will be executed as part of the job
>         steps:
>           # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
>           - uses: actions/checkout@v3
>     
>           - name: Set up Node.js
>             uses: actions/setup-node@v3
>             with:
>               node-version: 12.22.9
>               cache: 'npm'
>     
>           - name: npm install, build and test
>             run: |
>               npm i
>               pm2 stop 0
>               pm2 start 0
>               pm2 save

- Allow user (non-root) to use PORT 1024 below
>     sudo apt-get install libcap2-bin
>     sudo setcap cap_net_bind_service=+ep /usr/local/bin/node 

- Install PM2 inside your VM
>     sudo npm install pm2@latest -g
*Push Updated / Changes to Repository before running PM2 instance.*

- Run for the first time
>     pm2 start npm --name "mywebapp" -- run start
>     pm2 save
