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

  function loadRoleByPage(pno,pageSize){
        $.ajax({
            type:"GET",
            url:"data/admin_roleinfo.php",
            data:{pno,pageSize},
            success:function(pager){
                //5:获取返回数据 pager.data
                //6:拼接字符串动态创建表格并且添加数据
                var html = "";
                for(var p of pager.data){
                html += `
                <tr>
                    <td>${p.role_no}</td>
                    <td>${p.role_name}</td>
                    <td>
                    <a href="${p.role_no}_${p.role_name}" class="update_p btn btn-primary"  data-toggle="modal" data-target="#modifyRoleModal">修改</a>
                    <a href="${p.role_no}" class="del_p btn btn-danger">删除</a>
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
  loadRoleByPage();
  //pageSize绑定onchange事件，页码值改变时，刷新当前页面
  $("#page-size").on("change",function(){
      loadRoleByPage(1,$("#page-size").val()); 
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
      loadRoleByPage(pno,$("#page-size").val());
  });

  // 为删除按钮绑定单击事件
  $("#tb1").on("click","a.del_p",function(e){
        e.preventDefault();
      //2:获取人员编号
        var role_no = $(this).attr("href");
        var that = this;
      //3:显示确认框，再次确认用户是否要删除该数据
        var rs = window.confirm("您是否要删除编号为："+role_no+"的角色信息?");
        if(rs==false){
            return;//函数停止后继执行
        };
      //4:发送AJAX请求 
        $.ajax({
            type:"GET", 
            url:"data/role_del.php",
            data:{role_no},
            success:function(data){
            //5:获取返回数据结果删除成功
             //6:删除指定行
                if(data.code>0){
                    var tr = $(that).parent().parent();
                    tr.remove();
                    loadRoleByPage(1,$("#page-size").val());
                };
            }
        });
  });

  // 为修改按钮绑定单击事件
  $("#tb1").on("click","a.update_p",function(e){
        e.preventDefault();
        var href = $(this).attr("href").split('_');
        $("#m-role-no").val(href[0]);
        $("#m-role-name").val(href[1]);
  });
  $("#modifyRoleModal").on("click",'.submit-btn',(e)=>{
        e.preventDefault();
        console.log($(e.target));
        var role_no=$("#m-role-no").val();
        var role_name=$("#m-role-name").val();
        if(!role_name){
            alert("请填写修改后的角色名称！");
        }else{
            $.post("data/modify_role.php",{role_no,role_name})
              .then(data=>{
                if(data.code>0){
                    alert("修改成功！");
                    loadRoleByPage(1,$("#page-size").val());
                }
              })
        };
  });

  $("#addRoleModal").on("click",'.submit-btn',(e)=>{
        e.preventDefault();
        var role_name=$("#a-role-name").val();
        var create_time=new Date().getTime();
        if(!role_name){
            alert("请先填写角色名称！");
        }else{
            $.post("data/add_role.php",{role_name,create_time})
              .then(data=>{
                if(data.code>0){
                    alert("新增成功！");
                    loadRoleByPage(1,$("#page-size").val());
                }
              })
        };
  });
})