### GIT ADVANCE TRICKS

Instead of using: git add . git commit -m "message", you can directly use:
>      git commit -am "message"
> 
Creating an alias would be helpful in some cases. 
>      git config --global alias.ac "commit -am"
>      git ac "message"
If you have a typo in your previous commit, you can use: 
>      git commit --amend -m "new message"
If you wish to go back to your previous commit, then you can use: 
>      git revert COMMIT_ID.
To view previous commits, use: 
>      git log --oneline
To see logs in a better view, use: 
>      git log --graph --oneline --decorate
