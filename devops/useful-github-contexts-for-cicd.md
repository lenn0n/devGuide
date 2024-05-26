### Checking which branch triggers the pipeline:
>      github.ref
Example:
>      
        prod-check:
        if: ${{ github.ref == 'refs/heads/main' }}
        runs-on: ubuntu-latest
        steps:
          - run: echo "Deploying to production server on branch $GITHUB_REF"
