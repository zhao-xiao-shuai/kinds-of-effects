# 关键点

## 1.图标和文字应该都要能够点击

### 方法:图标和文字应该在超链接内部

## 2.图标的class名前面一定会有icon-
```html
<i class="icon-question-circle-fill iconfont"></i>
```

## 3.图标的大小直接给到i标签

```html
<span class="icon">
	<i class="icon-question-circle-fill iconfont"></i>
</span>
```

### font-size的CSS属性不能加到.icon下面,必须加到i标签下面

## 4.开关的激活状态

```js
let toggle=document.querySelector(".toggle");
let navigation=document.querySelector(".navigation");
//开关的点击事件:点击之后开关和导航栏都变为激活状态
toggle.onclick=function(){
    // this指的是toggle
    this.classList.toggle("active");
    navigation.classList.toggle("active");
}
```

### 未激活:

![image-20211012011453609](C:\Users\ZhaoShuai\AppData\Roaming\Typora\typora-user-images\image-20211012011453609.png)

### 激活:

![image-20211012011433931](C:\Users\ZhaoShuai\AppData\Roaming\Typora\typora-user-images\image-20211012011433931.png)

## 5.图标尽量用span标签包裹起来

文字直接用span标签即可

```html
<a href="#">
    <span class="icon">
        <i class="icon-home iconfont"></i>
	</span>
	<span class="title">Home</span>
</a>
```



