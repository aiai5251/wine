## 东方酒业

#安装windows服务器

// Microsoft Remote Desktop
// 共享命令
https://support.apple.com/zh-cn/HT201710
```
# Apple Remote Desktop：通过命令行 (kickstart) 远程配置
# 激活 Remote Desktop“共享”功能、启用“admin”用户的访问权限、授予“admin”用户完整权限、重新启动 ARD 代理和附加菜单：

sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -activate -configure -access -on -users admin -privs -all -restart -agent -menu

```