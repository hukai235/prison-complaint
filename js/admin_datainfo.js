$(()=>{
  var eno=sessionStorage.getItem("enum");
  var avatar=sessionStorage.getItem("avatar");
  var role_no=sessionStorage.getItem("role_no");
  if(!eno){
      location.href="admin_login.html";
  }else if(role_no!=1 && role_no!=2){
      location.href="admin_login.html";
  }else{
      $("[data-src=image]").attr("src",avatar);
      $(".enum-show").html(eno);
  };
  //动态加载数据类型选项
  $.get("data/data_type_read.php")
    .then(data=>{
        var html=`<option>请选择</option>`
        for(var tmp of data){
            html+=`<option>${tmp.type}</option>`;
        };
        $("#type").html(html);
   });
    function loadDataByPage(pno,pageSize,type){
        $.ajax({
            type:"GET",
            url:"data/admin_datainfo.php",
            data:{pno,pageSize,type},
            success:function(pager){
                //5:获取返回数据 pager.data
                //6:拼接字符串动态创建表格并且添加数据
                var html = "";
                for(var p of pager.data){
                html += `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.type}</td>
                    <td>${p.mxname}</td>
                    <td>
                    <a href="${p.id}_${p.type}_${p.mxname}" class="update_p btn btn-primary"  data-toggle="modal" data-target="#modifyDataModal">修改</a>
                    <a href="${p.id}" class="del_p btn btn-danger">删除</a>
                    </td>
                </tr>
                `;
                };
                $("#tb1").html(html);
                //7:获取总页数  pager.pageCount
                //8:拼接字符串动态创建页码
                var html = "";
                //判断是否显示上上一页
                if(pager.pno-2>0){
                    html += `<li><a href="${pager.pno-2}">${pager.pno-2}</a></li>`;
                }
                //判断是否显示上一页
                if(pager.pno-1>0){
                html += `<li><a href="${pager.pno-1}">${pager.pno-1}</a></li>`;
                }
                html += `<li class="active"><a href="${pager.pno}">${pager.pno}</a></li>`;
                //判断是否显示下一页
                if(pager.pno+1<=pager.pageCount){
                    html += `<li><a href="${pager.pno+1}">${pager.pno+1}</a></li>`;
                }
                //判断是否显示下下一页
                if(pager.pno+2<=pager.pageCount){
                    html += `<li><a href="${pager.pno+2}">${pager.pno+2}</a></li>`;
                }
                $("#pagination").html(html);
            }
        });
    };
    loadDataByPage();
    var pageSize=$("#page-size").val();
    //查询按钮绑定点击事件
    $("#search-btn").click(()=>{
        var type=$("#type").val();
        if(type==""){
            alert("请先选择数据类型再进行查询！");
        }else{
           loadDataByPage(1,$("#page-size").val(),type); 
        };
    });
    //pageSize绑定onchange事件，页码值改变时，刷新当前页面
    $("#page-size").on("change",function(){
        loadDataByPage(1,$("#page-size").val(),$("#type").val()); 
    });
    //为页码绑定点击事件,由于页码是动态生成
    //使用事件代理机制完成绑定
    $("#pagination").on("click","li a",function(e){
        //console.log(2);//事件绑定对象
        //a:阻止事件默认行为 a
        e.preventDefault();
        //b:获取当前页码
        var pno = $(this).attr("href");
        //c:调用函数
        loadDataByPage(pno,$("#page-size").val(),$("#type").val());
    });

    // 绑定删除按钮的单击事件
    $("#tb1").on("click","a.del_p",function(e){
        e.preventDefault();
      //2:获取人员编号
        var id = $(this).attr("href");
        var that = this;
      //3:显示确认框，再次确认用户是否要删除该数据
        var rs = window.confirm("您是否要删除编号为："+id+"的数据信息?");
        if(rs==false){
            return;//函数停止后继执行
        };
      //4:发送AJAX请求 
        $.ajax({
            type:"GET", 
            url:"data/data_del.php",
            data:{id},
            success:function(data){
            //5:获取返回数据结果删除成功
             //6:删除指定行
                if(data.code>0){
                    var tr = $(that).parent().parent();
                    tr.remove();
                    loadDataByPage(1,$("#page-size").val(),$("#type").val());
                };
            }
        });
    });

    // 绑定修改按钮的单击事件
    $("#tb1").on("click","a.update_p",function(e){
        e.preventDefault();
        var href = $(this).attr("href").split('_');
        $("#m-id").val(href[0]);
        $("#m-type").val(href[1]);
        $("#m-mxname").val(href[2]);
        
    });
    $("#modifyDataModal .submit-btn").click((e)=>{
        e.preventDefault();
        var id=$("#m-id").val();
        var mxname=$("#m-mxname").val();
        if(!mxname){
            alert("请填写修改后的数据明细！");
        }else{
            $.post("data/modify_data_info.php",{id,mxname})
                .then(data=>{
                if(data.code>0){
                    alert("修改成功！");
                    loadDataByPage(1,$("#page-size").val(),$("#type").val());
                }
                })
        };
    })

    // 绑定增加按钮的单击事件
    $("#addDataModal .submit-btn").click(()=>{
        var type=$("#a-type").val();
        var mxname=$("#a-mxname").val();
        if(!type){
            alert("请填写数据类型！");
        }else{
            if(!mxname){
                alert("请填写数据明细！");
            }else{
                $.post("data/add_datainfo.php",{type,mxname})
                  .then(data=>{
                      if(data.code>0){
                          alert("数据新增成功！");
                          loadDataByPage(1,$("#page-size").val(),$("#type").val());
                      }
                  })
            }
        }
    })
})