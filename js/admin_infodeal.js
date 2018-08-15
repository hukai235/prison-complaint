$(()=>{
    //加载基础页面
    var eno=sessionStorage.getItem("enum");
    var avatar=sessionStorage.getItem("avatar");
    var role_no=sessionStorage.getItem("role_no");
    if(!eno){
        location.href="admin_login.html";
    }else{
        $("[data-src=image]").attr("src",avatar);
        $(".enum-show").html(eno);
    };
    if(role_no!=1 && role_no!=2){
        $("#sidebar-menu").children().last().siblings().css("display","none");
    }else{
        $("#sidebar-menu").children().last().siblings().css("display","block");
    };
    // 根据辖区内未处理的投诉评价跳出弹出框
    (()=>{
        $.get("data/alert_comps.php",{enum:eno,role_no:role_no})
            .then((data)=>{
                var count=0,compInfo="",evalInfo="",enfoInfo="";
                if(data.comps==0){count++};
                if(data.evals==0){count++};
                if(data.enfos==0){count++};
                if(count!=3){
                    if(data.comps!=0){compInfo="新增"+data.comps+"条投诉警察信息未处理！"};
                    if(data.evals!=0){evalInfo="新增"+data.evals+"条评价警察信息未处理！"};
                    if(data.enfos!=0){enfoInfo="新增"+data.enfos+"条执法评价信息未处理！"};
                    var html=`
                    <p>${compInfo}</p>
                    <p>${evalInfo}</p>
                    <p>${enfoInfo}</p>                     
                    `;
                    $("#alertMsg").html(html);
                    refreshPage(1);
                    $("#loadAlertMsg").modal('show');
                }else{refreshPage(1)};                 
            })
        ;
    })()
        //时间戳转换成显示年-月-日格式的函数
    function getCurrentTime(date){
        function pad0(val){return val<10?(val="0"+val):val;}
        var y=date.getFullYear();
        //获取月份的值，如果月份小于10，用0补齐至两位
        var M=pad0(date.getMonth()+1);
        var d=pad0(date.getDate());
        var currentTime=y+"-"+M+"-"+d;
        return currentTime;
    };
    //根据进入的不同角色显示可供选择的不同部门名称
    $.get('data/admin_part_sel.php',{enum:eno,role_no:role_no})
    .then(data=>{
        var html="";
        for(var p of data){
            html+=`<option value="${p.did}">${p.dname}</option>`;
        };
        $("#dname").append(html);
    });
    // var comp_evalmsg=null;
    function loadMsgByPage(eno,pno,pageSize,comp_type,start_date,end_date,sear_enum,did,isdeal,role_no){
        var searchData={eno,pno,pageSize,comp_type,start_date,end_date,sear_enum,did,isdeal,role_no};
        $.ajax({
            type:"GET",
            url:"data/admin_msg_sel.php",
            data:searchData,
            success:function(pager){
                //5:获取返回数据 pager.data
                //6:拼接字符串动态创建表格并且添加数据
                // console.log(pager);            
                if(pager.data.length==0 ||pager.data==null){                    
                var html1="";
                    html1+=`
                    <tr>
                    <td colspan="5">根据您的查询条件，暂时未查询到符合的投诉/评价信息，请核对后查询！</td>
                    </tr>
                    `;
                    $("#tb1").html(html1);
                }else{
                    if(comp_type==3){
                        var html2="";                       
                        for(var m of pager.data){
                            var eval_name=m.eval_name.slice(0,1)+"**";
                            var card_ID=m.eval_ID.slice(0,4)+"****"+m.eval_ID.slice(-5,-1);
                            var eval_date=getCurrentTime(new Date(parseInt(m.eval_date)));                        
                            html2 += `
                            <tr>
                                <td>执法评价</td>
                                <td>${m.poli_num}</td>
                                <td>${m.ename}</td>
                                <td>${m.dname}</td>
                                <td>${eval_name}</td>
                                <td>${card_ID}</td>
                                <td>${m.mxname}</td>
                                <td>${eval_date}</td>
                                <td>
                                <p style="display:none">${m.emid}_${m.eval_name}_${m.eval_ID}_${m.enfo_type}_${m.poli_num}_${m.enfo_date}_${m.enfo_addr}_${m.enfo_msg}_${m.issign}_${m.isdeal}_${m.result}_${m.dname}_${m.ename}_${m.mxname}</p>
                                <a href="javascript:;" class="showMsg_p btn btn-primary"  data-toggle="modal" data-target="#loadMsgModal">查看详情</a>`;
                            if(m.poli_num==eno){
                                if(m.isdeal==0){
                                    html2+=`</td></tr>`;
                                }else{
                                    html2+=`<a href="javascript:;" class="deal_p btn btn-danger" data-toggle="modal" data-target="#loadMsgModal">查看处理结果</a></td></tr>`;
                                };
                            }else{
                                html2+=`<a href="javascript:;" class="deal_p btn btn-danger" data-toggle="modal" data-target="#loadMsgModal">${m.isdeal==1?"查看处理结果":"处理"}</a>
                                </td></tr>`;
                            }
                        };
                        $("#tb1").html(html2);
                        
                    }else if(comp_type==2){                    
                        var msg_id=pager.data[0].msg_id;
                        $.get("data/data_info_msg.php",{msg_id})
                            .then(data=>{ 
                            var html3="";                   
                            for(var m of pager.data){
                                var comp_name=m.comp_name.slice(0,1)+"**";
                                var card_ID=m.comp_ID.slice(0,4)+"****"+m.comp_ID.slice(-5,-1);
                                var comp_date=getCurrentTime(new Date(parseInt(m.comp_date)));
                                var isgrate=m.isgrate;
                                var isgrates=isgrate.split("_");
                                var htmlHidden=`
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th>评价项目</th>
                                            <th>结果</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                    `;
                                for(var i=0;i<data.length;i++){
                                    htmlHidden+=`
                                    <tr>
                                        <td>${data[i]}</td> 
                                        <td>${isgrates[i]==1?"好评":"差评"}</td>
                                    </tr>
                                    `
                                };
                                html3 += `
                                <tr>
                                    <td>评价警察</td>
                                    <td>${m.poli_num}</td>
                                    <td>${m.ename}</td>
                                    <td>${m.dname}</td>
                                    <td>${comp_name}</td>
                                    <td>${card_ID}</td>
                                    <td data-show="showMsg" style="position:relative;">
                                        <span>评价信息详情</span>
                                        <div class="table-responsive hidden-div"   style="display:none">${htmlHidden+`</tbody></table>`}</div>
                                    </td>
                                    <td>${comp_date}</td>
                                    <td>
                                    <p style="display:none">${m.cmid}_${m.comp_name}_${m.comp_ID}_${m.comp_date}_${m.poli_num}_${m.has_evid}_${m.info_from}_${m.issign}_${m.isdeal}_${m.result}_${m.dname}_${m.ename}</p> 
                                    <a href="javascript:;" class="showMsg_p btn btn-primary"  data-toggle="modal" data-target="#loadMsgModal">查看详情</a>`;
                                if(m.poli_num==eno){
                                    if(m.isdeal==0){
                                        html3+=`</td></tr>`;
                                    }else{
                                        html3+=`<a href="javascript:;" class="deal_p btn btn-danger" data-toggle="modal" data-target="#loadMsgModal">查看处理结果</a></td></tr>`;
                                    };
                                }else{
                                        html3+=`<a href="javascript:;" class="deal_p btn btn-danger" data-toggle="modal" data-target="#loadMsgModal">${m.isdeal==1?"查看处理结果":"处理"}</a>
                                        </td></tr>`;
                                }                              
                            };
                            $("#tb1").html(html3);
                            toggleEvalMsg();
                        }); 
                    }else if(comp_type==1){
                        var html4="";                       
                        for(var m of pager.data){
                            var comp_name=m.comp_name.slice(0,1)+"**";
                            var card_ID=m.comp_ID.slice(0,4)+"****"+m.comp_ID.slice(-5,-1);
                            var comp_date=getCurrentTime(new Date(parseInt(m.comp_date)));
                            html4 += `
                                <tr>
                                    <td>投诉警察</td>
                                    <td>${m.poli_num}</td>
                                    <td>${m.ename}</td>
                                    <td>${m.dname}</td>
                                    <td>${comp_name}</td>
                                    <td>${card_ID}</td>
                                    <td>${m.mxname}</td>
                                    <td>${comp_date}</td>
                                    <td>
                                    <p style="display:none">${m.cmid}_${m.comp_name}_${m.comp_ID}_${m.comp_date}_${m.poli_num}_${m.has_evid}_${m.info_from}_${m.issign}_${m.isdeal}_${m.result}_${m.dname}_${m.ename}_${m.mxname}</p>
                                    <a href="javascript:;" class="showMsg_p btn btn-primary"  data-toggle="modal" data-target="#loadMsgModal">查看详情</a>`;
                                if(m.poli_num==eno){
                                    if(m.isdeal==0){
                                        html4+=`</td></tr>`;
                                    }else{
                                        html4+=`<a href="javascript:;" class="deal_p btn btn-danger" data-toggle="modal" data-target="#loadMsgModal">查看处理结果</a></td></tr>`;
                                    };
                                }else{
                                        html4+=`<a href="javascript:;" class="deal_p btn btn-danger" data-toggle="modal" data-target="#loadMsgModal">${m.isdeal==1?"查看处理结果":"处理"}</a>
                                        </td></tr>`;
                                }
                        };
                        $("#tb1").html(html4);
                    };
                };
                //通过角色判断，处理按钮是否显示,如果为普通员工，无处理权限，不显示处理按钮
                if(role_no==7){
                    var $deal_p=$("#tb1>tr>td:last-child>.deal_p");
                    if($deal_p.html()=="处理"){
                        $deal_p.css("display","none");
                    };
                };
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
    };
    function toggleEvalMsg(){
        var tb1=document.getElementById("tb1");
        var showTds=tb1.querySelectorAll("[data-show=showMsg]");
        // console.log(showTds);
        for(var showTd of showTds){
            showTd.onmouseenter=function(e){
                e.stopPropagation();
                e.target.lastElementChild.style.display="block";
            };
            showTd.onmouseleave=function(e){
                e.stopPropagation();
                e.target.lastElementChild.style.display="none";
            };
        };
    };
    function refreshPage(pno){
        var comp_type=$("#comp-type").val();
        if(comp_type==""){
            comp_type=1;
        };
        var start_date=new Date($("#start-date").val()).getTime();
        var end_date=new Date($("#end-date").val()).getTime();
        var sear_enum=$("#sear-enum").val();
        var did=$("#dname").val();
        var isdeal=$("#isdeal").val();
        var pageSize=$("#page-size").val();
        if(isNaN(end_date)){
            end_date=new Date().getTime();
        };
        if(isNaN(start_date)){
            start_date="";
        };
        loadMsgByPage(eno,pno,pageSize,comp_type,start_date,end_date,sear_enum,did,isdeal,role_no);
    }
    $("#search-btn").click(()=>{
        if($("#comp-type").val()==""){
            alert("请先选择投诉/评价类型！");
        }else{
            refreshPage(1);
        };       
    });
    $("#page-size").on("change",function(){
            refreshPage(1);
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
        refreshPage(pno);
    });
    //绑定按钮单击查看详情事件
    //从服务器端拿回数据字典中的数据
    function dataFromDataInfo(id,selector){
        $.get("data/data_info_idsel.php?id="+id)
        .then(data=>{
            $(selector).val(data[0].mxname);
        });
    }
    //动态加载详情内容
    
    function loadDetails(selector){
        var comp_type=$("#comp-type").val();
        var strMsg=$(selector).siblings().first().html();
        var strMsgs=strMsg.split("_");
        var $dealMsgText=$("#dealMsg");
        if(comp_type==3){
            $("#loadMsgModal  div.enfo-only").css("display","block");
            $("#loadMsgModal  div.comp-only").css("display","none");
            // ${m.emid}_${m.eval_name}_${m.eval_ID}_${m.enfo_type}_${m.poli_num}_${m.enfo_date}_${m.enfo_addr}_${m.enfo_msg}_${m.issign}_${m.isdeal}_${m.result}_${m.dname}_${m.ename}_${m.mxname}
            var isdeal=strMsgs[9]==1?"已处理":"未处理";
            var issign=strMsgs[8]==1?"匿名评价":"署名评价";
            dataFromDataInfo(strMsgs[3],"#enfo_type");
            dataFromDataInfo(strMsgs[6],"#enfo_addr");
            if(strMsgs[8]==0){
               $("#loadMsgModal  fieldset.sign-only").css("display","block"); 
            }else{
               $("#loadMsgModal  fieldset.sign-only").css("display","none"); 
            };
            $("#msgId").val(strMsgs[0]);
            $("#m-enum").val(strMsgs[4]);
            $("#m-ename").val(strMsgs[12]);
            $("#m-dname").val(strMsgs[11]);
            $("#m-comp-name").val(strMsgs[1]);
            $("#m-comp-ID").val(strMsgs[2]);
            $("#enfo_date").val(getCurrentTime(new Date(parseInt(strMsgs[5]))));
            $("#m-msg").val(strMsgs[13]);
            $("#m-enfo-msg").val(strMsgs[7]);
            $("#issign").val(issign);
            if(strMsgs[9]==1){
                $dealMsgText.val(strMsgs[10]);
                $dealMsgText.attr("readonly","true");
            }else{
                $dealMsgText.val(null);
            };
        }else{
        //  ${m.cmid}_${m.comp_name}_${m.comp_ID}_${m.comp_date}_${m.poli_num}_${m.has_evid}_${m.info_from}_${m.issign}_${m.isdeal}_${m.result}_${m.dname}_${m.ename}_${m.mxname}
            $("#loadMsgModal  div.enfo-only").css("display","none");
             $("#loadMsgModal  div.comp-only").css("display","block");
            var isdeal=strMsgs[8]==1?"已处理":"未处理";
            var issign=strMsgs[7]==1?"匿名评价":"署名评价";
            var has_evid=strMsgs[5]==1?"有证据":"无证据";
            if(strMsgs[7]==0){
               $("#loadMsgModal  fieldset.sign-only").css("display","block"); 
            }else{
               $("#loadMsgModal  fieldset.sign-only").css("display","none"); 
            };
            var info_from=strMsgs[6]==0?"听说":strMsgs[6]==1?"听见":"我是当事人";
            $("#msgId").val(strMsgs[0]);
            $("#m-enum").val(strMsgs[4]);
            $("#m-ename").val(strMsgs[11]);
            $("#m-dname").val(strMsgs[10]);
            $("#m-comp-name").val(strMsgs[1]);
            $("#m-comp-ID").val(strMsgs[2]);
            $("#m-msg").val(strMsgs[12]);
            $("#issign").val(issign);
            $("#info_from").val(info_from);
            $("#has_evid").val(has_evid);
            if(strMsgs[8]==1){
                $dealMsgText.val(strMsgs[9]);
                $dealMsgText.attr("readonly","true");
            }else{
                $dealMsgText.val(null);
            };
            if(comp_type==2){
            $("#loadMsgModal  div.eval-only").css("display","block");
            $("#m-msg").parent().parent().css("display","none");
            $("#loadMsgModal  div.eval-only").last().html($(".hidden-div").html());
            };
        } 
    }
    $("#tb1").on("click",".showMsg_p",(e)=>{
        e.preventDefault();
        loadDetails(e.target);
        $("#loadMsgModal  .deal-only").css("display","none");
    });
    $("#tb1").on("click",".deal_p",(e)=>{
        e.preventDefault();
        loadDetails(e.target);
        $("#loadMsgModal .deal-only").css("display","block");
        if($(e.target).html()=="查看处理结果"){
            $("#add-btn").css("display","none");
        };
        $("#add-btn").click(()=>{
            var comp_type=$("#comp-type").val();
            var mid=$("#msgId").val();
            var msg=$("#dealMsg").val();
            if(msg==null){
                alert("请先填写处理意见！");
            }else{
                var r=confirm("处理意见提交保存后不能修改，请确认！");
                if(r==true){
                    $.get("data/add_dealmsg.php",{comp_type,mid,msg})
                    .then((data)=>{
                        if(data.code>0){
                            alert("处理意见提交成功");
                            var pno=$("#papagination li.active a").html();
                            refreshPage(pno);
                        }
                    })
                }else{
                    return;
                }
                
            }
        })

    })
})