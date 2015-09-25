##makefont字体压缩工具，可以自定义生成所需文案的小巧字体文件

###使用方法

全局安装
``` bash
$ npm install -g makefont
```

新建任意文件夹,进入该文件夹,同时建立一个lib文件夹，将字体源文件放这个里,再建立一个src文件夹，这里面放需要抽取的字体文件来源，可以是任意文件，例如`*.html,*.php,*.txt`

``` bash
$ mkdir fontDemo
$ cd fontDemo
$ mkdir lib
$ mkdir src
```

重要事情说三遍：字体文件放在lib目录下面，需要的抽取的字体内容文件放在src目录
重要事情说三遍：字体文件放在lib目录下面，需要的抽取的字体内容文件放在src目录
重要事情说三遍：字体文件放在lib目录下面，需要的抽取的字体内容文件放在src目录


开始飞
``` bash
$ cd fontDemo
$ makefont KaiGenGothicCN-Light.ttf
```