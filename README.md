## makefont字体压缩工具，可以根据自定义文案文件抽取字体生成简版的字体文件

### 使用方法

全局安装
``` bash
$ npm install -g makefont
```

使用 API
``` bash
Usage: makefont <fontname>

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -f, --font <font>      字体源文件
    -t, --target <target>  字体生成目录，默认当前目录
    -s, --source <dirs>    需要被抽取的文字来源文件或目录, 多个目录以逗号隔开，支持正则匹配
```
其中，-f, -s 参数为必须项，分别表示字体源文件和需要抽取的文案文件或目录，多想目录或者文件以逗号的形式隔开

``` bash
$ mkdir fontDemo
$ cd fontDemo
$ mkdir lib  //lib 文件夹下面存放字体源文件
$ mkdir src  //src 下面可以放任何文件，文件的所有内容会以字符串的形式被读取
$ makefont -f ./lib/KaiGenGothicCN-Light.ttf -s ./src/
```