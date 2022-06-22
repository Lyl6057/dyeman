/*
 * @Author: Lyl
 * @Date: 2021-03-10 14:20:44
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-22 07:53:18
 * @Description:
 */
import Vue from "vue";

/** 全局注册*/
Vue.directive("drap", {
  /**
   * 当被绑定元素插入到DOM时 */
  inserted(el, val) {
    el.onmousedown = function(e) {
      // 鼠标按下
      document.onmousemove = function(ev) {
        //通常在document中添加事件，不在body中添加事件；添加onmousemove鼠标事件；绑定在事件的匿名函数，值可以有一个参数，并且它就是事件对象；
        let x = document.getElementsByClassName(val.value.x)[0];
        let y = document.getElementsByClassName(val.value.y)[0];
        var l = -ev.movementX;
        var t = -ev.movementY;
        x.scrollLeft += l;
        y.scrollTop += t;
        document.onmouseup = function() {
          document.onmousemove = null;
        };
      };
    };
  }
});

/** 全局注册 */
Vue.directive("ganttMove", {
  /**
   * 当被绑定元素插入到DOM时 */
  inserted(el) {
    // var tW = document.getElementsByClassName('ganttBox')[0].offsetWidth // 表格宽度
    var gW = document
      .getElementsByClassName("ganttBox")[0]
      .style.width.split("px")[0]; // gantt宽度
    var maxW = gW - el.style.width.split("px")[0]; // div 拖拽最大值
    el.onmousedown = function(e) {
      // 鼠标按下
      var oldLeft = el.style.marginLeft.split("px")[0]; // 记录初始值 margin-left
      var disx = e.pageX - el.offsetLeft;
      el.onmousemove = function(e) {
        // 鼠标移动
        if (e.pageX - disx >= maxW - 400) {
          el.getElementsByClassName("gtLabel")[0].style.display = "none";
          if (el.getElementsByClassName("detailLabel").length > 0) {
            let data = el.getElementsByClassName("detailLabel");
            for (let i = 0; i < data.length; i++) {
              data[i].style.display = "none";
            }
          }
        } else {
          el.getElementsByClassName("gtLabel")[0].style.display = "block";
          if (el.getElementsByClassName("detailLabel").length > 0) {
            let data = el.getElementsByClassName("detailLabel");
            for (let i = 0; i < data.length; i++) {
              data[i].style.display = "block";
            }
          }
        }
        if (e.pageX - disx < 0) {
          // 当小于 最小值 = 0
          el.style.marginLeft = "0px";
        } else if (e.pageX - disx >= maxW) {
          // 当大于 最大值 = maxW
          el.style.marginLeft = maxW + "px";
        } else {
          el.style.marginLeft = e.pageX - disx + "px"; // 正常范围 ==》可拖拽
        }
      };
      el.onmouseout = function() {
        // 鼠标离开dom
        el.onmousemove = document.onmouseup = null;
      };
      el.onmouseup = function() {
        // 鼠标松开
        // var newLetf = el.style.marginLeft.split('px')[0]
        // const moveW = newLetf - oldLeft // div 拖拽移动的距离 px  一天  = 24小时  =  48px
        // // console.log(moveW / 48); // 移动的小时
        // val.value.tableData[val.value.index].realEnd === '' || val.value.tableData[val.value.index].realEnd === undefined
        //   ? (val.value.tableData[val.value.index].realEnd = new Date())
        //   : ''
        // val.value.tableData[val.value.index].planStart = timeConversion((new Date(val.value.tableData[val.value.index].planStart)).valueOf() + (moveW / val.value.form.size * 1000 * 3600 * 24).valueOf())
        // val.value.tableData[val.value.index].planEnd = timeConversion((new Date(val.value.tableData[val.value.index].planEnd)).valueOf() + (moveW / val.value.form.size * 1000 * 3600 * 24).valueOf())
        // val.value.tableData[val.value.index].realStart = timeConversion((new Date(val.value.tableData[val.value.index].realStart)).valueOf() + (moveW / val.value.form.size * 1000 * 3600 * 24).valueOf())
        // val.value.tableData[val.value.index].realEnd = timeConversion((new Date(val.value.tableData[val.value.index].realEnd)).valueOf() + (moveW / val.value.form.size * 1000 * 3600 * 24).valueOf())
        // val.value.tableData[val.value.index].lastStart = timeConversion((new Date(val.value.tableData[val.value.index].lastStart)).valueOf() + (moveW / val.value.form.size * 1000 * 3600 * 24).valueOf())
        // val.value.tableData[val.value.index].lastEnd = timeConversion((new Date(val.value.tableData[val.value.index].lastEnd)).valueOf() + (moveW / val.value.form.size * 1000 * 3600 * 24).valueOf())

        el.onmousemove = document.onmouseup = null;
      };
    };
  }
});

/** 全局注册*/
Vue.directive("resize", {
  /**
   * 当被绑定元素插入到DOM时
   **/
  inserted(el) {
    let div = document.createElement("div");
    let i = document.createElement("i");
    let windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
    el.parentNode.style.display = 'flex'
    el.nextSibling.nextSibling.style.overflow = 'hidden'
    el.style.position = "relative";
    el.style['-webkit-user-select'] = "none";
    el.style['-moz-user-select'] = "none";
    el.style['-ms-user-select'] = "none";
    el.style['user-select'] = "none";
    i.className = "el-icon-d-arrow-left";
    div.className = "control-size-btn";
    div.appendChild(i);
    el.appendChild(div);
    let dom = window.getComputedStyle(el, null); 
    div.onmousedown = function(e) {
      // 鼠标按下
      document.onmousemove = function(ev) {
        //通常在document中添加事件，不在body中添加事件；添加onmousemove鼠标事件；绑定在事件的匿名函数，值可以有一个参数，并且它就是事件对象；
        var l = ev.movementX;
        let width = parseInt(dom.width)
        if ( (width < windowWidth - 200 && l > 0) || (width > 200 && l < 0) ) {
          el.style.width = width  + l  + "px"
        }
        
        document.onmouseup = function() {
          document.onmousemove = null;
        };
      };
    };
  }
});
