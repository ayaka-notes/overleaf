### Stop maintain of overleaf pro

> 中文总结：如果你想用我开发的overleaf pro，你需要2c 4g以上的服务器，甚至更高配置的服务器才能运行。而且经常会出现bug或者服务器崩溃。2c 4g甚至只够几个人同时编辑，如果你需要更多，还需要更高昂的服务器配置。最低服务器的价格可能在720元，而且你还需要不断维护bug，无论你是用户还是开发者。此外，有些所谓的进阶功能比如git、github同步，还有引文搜索，都无法使用。此外，overleaf的API变化频繁，花时间去猜测他们修改了什么代码，查找API，没有任何意义而且浪费时间。哪怕我能维护一年两年，未来可能也不会一直跟进。
>
> 同样的价格，甚至足以拿下overleaf学生版（600多一年），所以通过逆向API开发所谓的overleaf pro，并没有意义。**此项目宣布终止维护**。
>
> 最初我开发所谓的overleaf pro的初衷，只是想要实现一个个人的latex工具，并没有所谓想要代替overleaf的server pro，提供给大机构使用，所以如果是某些大学，确实有能够一直维护他的团队或者开发人员，或许可以考虑一下，但是对于我这种个人开发者，或许并不合适。
>
> 感谢大家过往的支持。期待overleaf未来可以给大家更好的编辑体验。

After some days of strugling with git-bridge, today I make a decision, that is to **stop the development of overleaf pro**. The reasons are as following.

I tried to deploy my self-implied overleaf Pro to a aliyun light server with 2 core CPU and 2 GB memory. Though this application can be launched successfully. However, when I try to use this server with one of my thesis, it got crashed(and quite frequently), even when I am just editing one project at the same time. This light server is also servers as my static blog, but I thinks the nginx and static website are not to blame, you can ignore their impact.

After that, I run the command `docker stats`  to check the docker status, The result shows that:

- sharelatex main container consumes at least 1GB mem
- each project compile consumes at least 200MB mem
- when compiling, CPU usage some time comes to 100%+
- and don’t forget the rest DBs, like mongo, redis.

The reality shows that, a server(2c 2g) is obviously **not enough** to run overleaf pro(even overleaf CE), the least machine configuration is 2c 4g. If you check the price of server in aliyun, you will find that:

- a server 2c 2g is 30 CNY/month, 360 CNY/ year
- a server 2c 4g is 60 CNY/month, 720 CNY/ year(least configuration)

For most people interested in overleaf, I think they are students in university, **my initial motivition for overleaf pro is just a easy personal tool to replace overleaf common in official website**, instead of a totally same version of overleaf commercial product, server pro, or overleaf common.

However, seeing the price for overleaf, the cost for students of overleaf is 9\$/month, 89\$/year. That means if you want the self-deployed overleaf, you need pay even more, not only money ,but also time to maintain your overleaf instance.

Obviously, this deal is not cost-effective. You need to pay **more money for server**, and **more time to develop code**, maintain docker image, and **debug some issues related to TexLive**(fonts, etc), just to make your data in your hand. And in the meantime, **you can’t use github sync, and Dropbox sync, git sync**…

Some people may say, your docker image can be used in large school, to give user better experience. But, don’t forget what I have said above, my initial motivition is not to server for large companies and school, for those insitutions, if needed, please contact overleaf to purchase commercial licenses

Considering that some of the feature of my docker image is related to the interest of overleaf’s server pro, all related image has been deleted now, and the code is never made public.

In the end, thanks for your support in the past time, hopefully, overleaf will bring you better experience in the future.





