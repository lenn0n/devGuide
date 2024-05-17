
--------------------------------
MY CONFIGURED PIPELINES FOR GITHUB ACTIONS:
--------------------------------

## If you are using self-hosted env, install runners in your VM, EC2. Goto Github Repo > Settings > Actions > Runners.
## Once changes was made in private repository (github), the runner will trigger and execute the job.

## WORKFLOW FILE:  /.github/workflows/node.js.yml

  name: Node.js CI
    on:
      push:
        branches: [ "master" ]
      pull_request:
        branches: [ "master" ]
      # Allows you to run this workflow manually from the Actions tab
      workflow_dispatch:
    jobs:
      build:
        # The type of runner that the job will run on
        # runs-on: self-hosted
        runs-on: ubuntu-latest
          permissions:
            id-token: write
        steps:
          # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
          - name: Checkout Repo
            uses: actions/checkout@v4
          # Setup node environment
          - name: Set up Node.js Config
            uses: actions/setup-node@v3
            with:
              node-version: 20.11.1
          # Install all node dependencies based on package.json file
          - name: Install dependencies
            run: |
              npm i
          # Build and Test
          - name: Build app, run some test
            run: |
              npm run build
          # Upload artifacts
          - name: Upload artifacts for next job
            uses: actions/upload-artifact@v4
            with:
              name: previous_state
              path: |
                .
                !./node_modules
      test:
        # runs-on: self-hosted
        runs-on: ubuntu-latest
          permissions:
            id-token: write
        needs: build
        steps:
          # Get previous files
          - name: Download artifacts
            uses: actions/download-artifact@v4
            with:
              name: previous_state
      deploy:
        # The type of runner that the job will run on
        # runs-on: self-hosted
        runs-on: ubuntu-latest
          permissions:
            id-token: write
        needs: test
        steps:
          # Get previous files
          - name: Download artifacts
            uses: actions/download-artifact@v4
            with:
              name: previous_state

          ##############################################################################################

          # USING Default Docker Container Registry
          - name: Set up QEMU
            uses: docker/setup-qemu-action@v3
            
          - name: Set up Docker Buildx
            uses: docker/setup-buildx-action@v3
          
          # Login
          - name: Login to Docker Hub
            uses: docker/login-action@v3
            with:
              username: ${{ secrets.DOCKERHUB_USERNAME }}
              password: ${{ secrets.DOCKERHUB_TOKEN }}
              
          - name: Build and push
            uses: docker/build-push-action@v5
            with:
              push: true
              tags: USERNAME/REPO_URI:IMAGE_TAG 

          ##############################################################################################

          # USING AWS Elastic Contaier Registry (ECR)
          - name: Configure AWS credentials
            uses: aws-actions/configure-aws-credentials@v4
            with:
              aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
              aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
              aws-region: ap-southeast-2
          # Login
          - name: Login to Amazon ECR
            id: login-ecr
            uses: aws-actions/amazon-ecr-login@v2
          # Build image and push to Amazon ECR
          - name: Build, tag, and push docker image to Amazon ECR
            env:
              REGISTRY: ${{ steps.login-ecr.outputs.registry }}
              REPOSITORY: lenn0n-repo
              IMAGE_TAG: latest
            run: |
              docker build -t $REPOSITORY .
              docker tag $REPOSITORY:$REGISTRY/$REPOSITORY:$IMAGE_TAG
              docker push $REGISTRY/$REPOSITORY:$IMAGE_TAG

          ##############################################################################################

          # Restart kubernetes deployment
          # For this method KUBE_CONFIG required.
          # You can find it: cat $HOME/.kube/config | base64 .
          - uses: actions-hub/kubectl@master
            env:
              KUBE_CONFIG: ${{ secrets.KUBE_CONFIG }}
              KUBE_CONTEXT: ${{ secrets.KUBE_CONTEXT }}
            with:
              args: rollout restart deployment/$DEPLOYMENT -n $NAMESPACE
