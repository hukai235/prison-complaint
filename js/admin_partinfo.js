//1:创建函数发送AJAX请求获取当前页的内容，并且创建分页条
//2:参数pno 当前页码 1 2 3 4
$(function(){
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
    function loadPartByPage(pno,pageSize,kw){
        $.ajax({
            type:"GET",
            url:"data/admin_partinfo.php",
            data:{pno:pno,pageSize:pageSize,kw:kw},
            success:function(pager){
                //5:获取返回数据 pager.data
                //6:拼接字符串动态创建表格并且添加数据
                var html = "";
                if(pager.data.length==0){
                    html+=`
                    <tr>
                    <td>您查询的部门信息不存在，请核对后查询！</td>
                    </tr>
                    `;
                }else{
                    for(var p of pager.data){
                    var msg= p.isShow==1?"是":"否";
                    var partType="";
                    if(p.role_id==3){
                        partType='办公室类';
                    }else if(p.role_id==4){
                        partType='科室类';
                    }else if(p.role_id==5){
                        partType='监区类';
                    }else{
                        partType='其他类';
                    };
                    html += `
                    <tr>
                        <td>
                        <input type="checkbox">
                        </td>
                        <td>${p.did}</td>
                        <td>${p.dname}</td>
                        <td>${partType}</td>
                        <td>${msg}</td>
                        <td>
                        <a href="${p.did}_${p.dname}_${p.isShow}_${p.dstate}_${p.role_id}" class="update_p btn btn-primary"  data-toggle="modal" data-target="#modifyPartModal">修改</a>
                        <a href="${p.did}" class="del_p btn btn-danger">删除</a>
                        </td>
                    </tr>
                    `;
                    }
                } 
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
            },
            error:function(){
                alert("网络出现故障，请检查");
            }
        });
    }
    var pageSize=$("#page-size").val();
    loadPartByPage(1,pageSize,null);
    //pageSize绑定onchange事件，页码值改变时，刷新当前页面
    $("#page-size").on("change",function(){
        loadPartByPage(1,$("#page-size").val(),null);
    })
    
    //根据部门名称搜索显示当前部门信息
    $("#part-kw").on("keydown",function(e){
        // console.log(e.keyCode);
        if(e.keyCode==13){
            var kw=$("#part-kw").val();
            loadPartByPage(1,$("#page-size").val(),kw);
        }
         
    })

    //为页码绑定点击事件,由于页码是动态生成
    //使用事件代理机制完成绑定
    $("#pagination").on("click","li a",function(e){
    //console.log(2);//事件绑定对象
        //a:阻止事件默认行为 a
        e.preventDefault();
        //b:获取当前页码
        var pno = $(this).attr("href");
        //c:调用函数
        loadPartByPage(pno,$("#page-size").val(),null);
    });

    //功能二:删除指定部门
    //1:获取部门的删除按钮绑定点击事件
    //  动态生成数据一定事件代理绑定
    $("#tb1").on("click","a.del_p",function(e){
        e.preventDefault();
    //2:获取部门编号
        var did = $(this).attr("href");
        var that = this;
        console.log($(that).parent().prev().prev());
        var dname=$(that).parent().prev().prev().html();
    //3:显示确认框，再次确认用户是否要删除该数据
        var rs = window.confirm("您是否要删除"+dname+"的部门信息数据?");
        if(rs==false){
            return;//函数停止后继执行
        }
    //4:发送AJAX请求
        $.ajax({
            type:"POST", 
            url:"data/admin_part_del.php",
            data:{did:did},
            success:function(data){
            //5:获取返回数据结果删除成功
             //6:删除指定行
                if(data.code>0){
                    var tr = $(that).parent().parent();
                    tr.remove();
                    loadPartByPage(1,$("#page-size").val(),null);
                }
            },
            error:function(){
                alert("网络发生故障，请检查");
            }
        });
    });
    //功能三:完成部门更新操作
    //1:获取更新按钮绑定点击事件,使用事件代理
    $("#tb1").on("click","a.update_p",function(e){
        e.preventDefault();
        //2:获取更新部门编号 
        var href = $(this).attr("href").split('_');
        //3:显示更新模态框
        $("#m-depart-id").val(href[0]);
        $("#m-depart-name").val(href[1]);
        if(href[2]==0){
            $("#noshow-browser").checked=true;
        }
        if(href[3]==0){
            $("#depart-disabled").checked=true;
        }
        $("#m-role-id option[value='"+href[4]+"']").attr("selected","selected");
    });

    //封装提交按钮处理事件函数
    function clickSubmit(dnameSelector,formSelector,url){
        //拿到部门名称信息
        var dname=$(dnameSelector).val(); 
        $.ajax({
            type:"POST",
            url:url,
            data:$(formSelector).serialize(),
            success:function(data){
                if(data.code>0){
                  alert("您已经成功提交了"+dname+"的部门信息！");
                  location.href="admin_partinfo.html"; 
                }
            }
        });
    }
    //5:为更新div中"确认提交"按钮绑定点击事件
    $("#modifyPartModal form button").click(()=>{
        if($("#m-depart-name").val()==""){
            alert("部门名称不能为空！");
        };
        if($("#m-role-id option:selected").val()==""){
            alert("请先选择部门所属分类！");
        };
        clickSubmit("#m-depart-name","#modifyPartModal form","data/modify_part.php");
    })
    //为增加部门div中的"确认提交"按钮绑定点击事件
    $("#addPartModal form button").click(()=>{
        if($("#a-depart-name").val()==""){
            alert("部门名称不能为空！");
        };
        if($("#a-role-id option:selected").val()==""){
            alert("请先选择部门所属分类！");
        };
        clickSubmit("#a-depart-name","#addPartModal form","data/add_part.php");
    })
})













