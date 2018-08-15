//功能:分页显示商品列表
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
    //部门名称加载
    function partLoad(selector){
        $.ajax({
            type:"GET",
            url:"data/admin_part_sel.php",
            success:function(data){
                var html=`<option value="">请选择</option>`;
                for(var p of data){
                    html+=`
                    <option value="${p.did}">${p.dname}</option>
                    `;
                }
                $(selector).html(html);
            }
        })
    };
    // 角色类型加载
    function roleLoad(selector,msg){
        $.ajax({
            type:"GET",
            url:"data/admin_roletype_sel.php",
            success:function(data){
                var html=`<option value="">请选择</option>`;
                for(var r of data){
                    html+=`
                    <option value="${r.role_no}">${r.role_name}</option>
                    `;
                }
                $(selector).html(html);
                // console.log($(selector).children(":contains('"+msg+"')"));
                // console.log($(selector).children(""));
                if(msg){
                    $(selector).children("[value="+msg+"]").attr("selected",true);
                };
            }
        })
    }
    $(window).on("load",()=>{
        partLoad("#e-dname");
    });
    function loadEmpByPage(pno,pageSize,eno,did,estate){
        var searchData="";
        if(eno==null && did==null && estate==null){ 
            searchData={pno,pageSize}  
        }else{
            searchData={pno,pageSize,eno,did,estate};
        };
        $.ajax({
            type:"GET",
            url:"data/admin_empinfo.php",
            data:searchData,
            success:function(pager){
                //5:获取返回数据 pager.data
                //6:拼接字符串动态创建表格并且添加数据
                console.log(pager.data);
                var html = "";
                if(pager.data.length==0){
                    html+=`
                    <tr>
                    <td>您查询的人员信息不存在，请核对后查询！</td>
                    </tr>
                    `;
                }else{
                    for(var e of pager.data){
                    var msg=e.estate==1?"启用":"禁用";
                    html += `
                    <tr>
                        <td>
                        <input type="checkbox">
                        </td>
                        <td>${e.enum}</td>
                        <td>${e.ename}</td>
                        <td>${e.dname}</td>
                        <td>${e.eduty}</td>
                        <td>${e.card_ID}</td>
                        <td style="width:150px;">
                            <img src="${e.avatar}" class="img-responsive">
                        </td>
                        <td>${e.role_name}</td>
                        <td>${msg}</td>
                        <td>
                        <a href="${e.enum}_${e.ename}_${e.dname}_${e.eduty}_${e.card_ID}_${e.avatar}_${e.role_no}_${e.role_name}" class="update_p btn btn-primary"  data-toggle="modal" data-target="#modifyEmpModal">修改</a>
                        <a href="${e.enum}" class="del_p btn btn-danger">禁用</a>
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
            }
            // error:function(){
            //     alert("网络出现故障，请检查");
            // }
        });
    }
    var pageSize=$("#page-size").val();
    loadEmpByPage(1,pageSize,$("#eno").val(),$("#e-dname :selected").val(),$("#e-estate :selected").val());
    //查询按钮绑定点击事件
    $("#search-btn").click(()=>{
        loadEmpByPage(1,pageSize,$("#eno").val(),$("#e-dname :selected").val(),$("#e-estate :selected").val());
    });
    //pageSize绑定onchange事件，页码值改变时，刷新当前页面
    $("#page-size").on("change",function(){
        loadEmpByPage(1,$("#page-size").val(),$("#eno").val(),$("#e-dname :selected").val(),$("#e-estate :selected").val());
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
        loadEmpByPage(pno,$("#page-size").val(),$("#eno").val(),$("#e-dname :selected").val(),$("#e-estate :selected").val());
    });

    //功能二:禁用指定人员
    //1:获取部门的删除按钮绑定点击事件
    //  动态生成数据一定事件代理绑定
    $("#tb1").on("click","a.del_p",function(e){
        e.preventDefault();
     //2:获取人员编号
        var eno = $(this).attr("href");
        var that = this;
     //3:显示确认框，再次确认用户是否要删除该数据
        var rs = window.confirm("您是否要禁用警号为："+eno+"的人员信息?");
        if(rs==false){
            return;//函数停止后继执行
        }
     //4:发送AJAX请求 
        $.ajax({
            type:"GET", 
            url:"data/admin_emp_del.php",
            data:{eno:eno},
            success:function(data){
            //5:获取返回数据结果删除成功
             //6:删除指定行
                if(data.code>0){
                    var tr = $(that).parent().parent();
                    tr.remove();
                    loadEmpByPage(1,$("#page-size").val(),$("#eno").val(),$("#e-dname :selected").val(),$("#e-estate :selected").val());
                }
            },
            error:function(){
                alert("网络发生故障，请检查");
            }
        });
    });
    //功能三:完成人员更新操作
    //1:获取更新按钮绑定点击事件,使用事件代理
    $("#tb1").on("click","a.update_p",function(e){
        e.preventDefault();
        //2:获取更新人员编号 
        var href = $(this).attr("href").split('_');
        //3:显示更新模态框
            //显示被修改人员所属部门
        (()=>{
            $.ajax({
                type:"GET",
                url:"data/admin_part_sel.php",
                success:function(data){
                    var html=`<option value="">请选择</option>`;
                    for(var p of data){
                        html+=`
                        <option value="${p.did}">${p.dname}</option>
                        `;
                    }
                    $("#m-dname").html(html);
                    $("#m-dname option:contains("+href[2]+")").attr("selected",true);
                }
            })
        })();
        //显示被修改人员的角色类型
        roleLoad("#m-role-id",href[6]);
        $("#m-enum").val(href[0]);
        $("#m-ename").val(href[1]);
        $("#m-eduty").val(href[3]);
        $("#m-card-ID").val(href[4]);
        $("#modify-photo img").attr("src",href[5]);
        $("#hidden-enum").val(href[0]); 
    });
    //上传图片功能
    $("#modify-photo").on("click","button",(e)=>{
            e.stopPropagation; 
            uploadPhoto("#upload-form");
        });
    //封装图片上传功能
    function uploadPhoto(formSelector){
        $.ajax({
                url:"data/avatar_upload.php",
                type:"POST",
                data:new FormData($(formSelector)[0]),
                processData:false,
                contentType:false,
                success(data){
                    if('图片'.indexOf(data)!=-1){
                        $(".showMsg").html(data);
                    }else{
                        $(".showMsg").html('图片上传成功,点击确认提交');
                        var photoPath=data.slice(3);
                        $(".showPhoto").attr("src",photoPath);   
                    };    
                }
            })
    };
    $("#modify-btn").click(()=>{
        var sendData={
            enum:$("#m-enum").val(),
            did:$("#m-dname").val(),
            eduty:$("#m-eduty").val(),
            avatar:$(".showPhoto").attr("src"),
            role_no:$("#m-role-id option:selected").val()
        };
        $.ajax({
            type:"POST",
            url:"data/modify_emp.php",
            data:sendData,
            success:function(data){
                if(data.code>0){
                    alert("您已经成功修改警号为:"+$("#m-enum").val()+"的人员信息!");
                    location.href="admin_empinfo.html";
                }
            }                            
        })
    });
    
    $("#hidden-a-date").val(new Date().getTime());
    $("#add-emp").click(()=>{
        partLoad("#a-dname"); 
        roleLoad("#a-role-id");     
    });
    //新增表单提交--图片上传功能
    $("#add-photo").on("click","button",(e)=>{
        e.stopPropagation;
        if($("#a-enum").val()==""){
            alert("请先填写警号后再上传照片！");
            return;
        }else{
            $("#hidden-a-enum").val($("#a-enum").val());           
            uploadPhoto("#a-upload-form");
        } 
    });
    //验证警号格式是否正确以及是否存在系统
    $("#a-enum").blur((e)=>{
        var eno=$(e.target).val();
        var $errorMsg=$("#enum-error-msg");
        //不能为空
        if(!eno){
           $errorMsg.html('*警号不能为空'); 
        }else{
            //验证警号是否为数字
            var testNum=/^\d{7}$/;
            if(!testNum.test(eno)){
            $errorMsg.html('*输入的不是7位数字，请重新输入'); 
            }else{
             //验证警号是否存在
                $.ajax({
                    type:"GET",
                    url:"data/check_enum.php",
                    data:{enum:eno},
                    success:function(data){
                        if(data.code==1){
                            $errorMsg.html('*警号已存在');   
                        }else{
                            $errorMsg.html('');
                            $errorMsg.addClass("msg-success"); 
                        }
                    }
                })
            }
        }
    });
    function valiNull(selector1,selector2,msg){
        if($(selector1).val()==""){
            $(selector2).html(msg);
        }else{
            console.log('我被调用了');
            $(selector2).html('');
            $(selector2).addClass("msg-success");
        };
    }
    //验证姓名、部门、职务不能为空
    $("#a-ename").blur((e)=>{
        valiNull(e.target,"#ename-error-msg","*姓名不能为空");
    });
    $("#a-dname").blur((e)=>{
        valiNull(e.target,"#dname-error-msg","*部门不能为空");
    });
    $("#a-eduty").blur((e)=>{
        valiNull(e.target,"#eduty-error-msg","*职务信息不能为空");
    })
    $("#a-role-id").blur((e)=>{
        valiNull(e.target,"#role-error-msg","*角色类型不能为空");
    })
    //验证输入的身份证号是否符合格式
    // $("#a-card-ID").on('blur',(e)=>{
    //     var card_ID=$(e.target).val();
    //     var $errorMsg=$("#cardid-error-msg");
    //     //验证不能为空
    //     if(!card_ID){
    //         $errorMsg.html('*身份证号不能为空');
    //     }else{
    //         //验证警号是否为数字
    //         var testID=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    //         if(!testID.test(card_ID)){
    //             $errorMsg.html('*身份证号格式不正确');
    //         }else{
    //             $("#cardid-error-msg").html('');
    //             $("#cardid-error-msg").addClass("msg-success");
    //         }
    //     }        
    // });
    //为提交按钮绑定单击事件
    $("#add-btn").click(()=>{
       var sendData={
            enum:$("#a-enum").val(),
            ename:$("#a-ename").val(),
            did:$("#a-dname option:selected").val(),
            eduty:$("#a-eduty").val(),
            card_ID:$("#a-card-ID").val(),
            role_no:$("#a-role-id option:selected").val(),
            estate:$("#a-estate input:checked").val(),
            avatar:$(".showPhoto").attr("src"),
            create_time:$("#hidden-a-date").val()
        };
        var count = 0;
        $('.form-group').each(function () {
            console.log($(this).find('p'));
            if ($(this).find('p').hasClass('msg-success')) {
                count++;
            };
        });
        if(count==5){
            $.ajax({
                type:"POST",
                url:"data/add_emp.php",
                data:sendData,
                success:function(data){
                    if(data.code>0){
                        alert("您已经成功添加警号为:"+$("#a-enum").val()+"的人员信息!");
                        location.href="admin_empinfo.html";
                    }
                }                            
            })
        } 
    });
})













