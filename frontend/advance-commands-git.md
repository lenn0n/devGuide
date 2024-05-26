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
To move changes in stash, use:
>      git stash
>      git stash pop <-- to apply back the stash changes
### Summary
1. Always try *git pull --rebase* first. If it works, you're done!
2. If you get a merge conflict, you can undo everything with *git rebase --abort*
3. Just pull normally using *git pull* and resolve conflicts using *git stash*.
