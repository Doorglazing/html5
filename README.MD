#git的日常
...
git config --global
git clone
git add
git commit -m 'msg'
...
##添加一个HTML文件


**git add .**
添加所有东西

git status  //监听工作区关系

git checkout --.\   //花式撤销

git reflog //查看所有提交版本
git reset --hard HEAD~1  // 回退版本
git reset --hard ad3dde0 //任意版本跳跃
git rebase -i HEAD~3 //多个版本进行合并