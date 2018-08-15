/*显示当前被选择警员的基础信息 */
$(()=>{
  var msg=location.search.split("=")[1].split("_");
  var eno=decodeURI(msg[0]);
  var title=decodeURI(msg[1]);
  var evalArrays=[];
  $("#title").html(title);
  if(title=="投诉警察"){
    $(".info-title").html("我要投诉");
    $("#complain-show").css("display","block").next().css("display","none");
    $("#evidence-show").css("display","block");
  }else if(title="评价警察"){
    $(".info-title").html("我要评价");
    $("#eval-show").css("display","block").prev().css("display","none");
    $("#evidence-show").css("display","none");
  }
  $.get("data/complain_info.php",{enum:eno,title:title})
    .then(data=>{
      /*将投诉人基本信息显示在隐藏的input中 */
      /*投诉时间 */
      $("#comp_date").val(new Date().getTime());
      /*后台读取的数据显示在前台 */
      var infos=data.data[0],msgs=data.complainMsg;
      $("#dname").html(infos.dname);
      var $infoContainer=$("#info-container");
      $infoContainer.find("img").attr("src",infos.avatar);
      $("#enum").val(infos.enum);
      $("#eduty").val(infos.eduty);
      if(title=="投诉警察"){
        var html=`<option value="">请选择</option>`;
        for(var msg of msgs){
          html+=`<option value="${msg.id}">${msg.mxname}</option>`;
        }
        $("#pc-msg").html(html);
      }else if(title="评价警察"){
        // console.log(msgs);
        var html="";
        for(var i=0;i<msgs.length;i++){
          var index=i+1;
          html+=`
            <div class="row">
              <span class="col-xs-6">${index}、${msgs[i].mxname}</span>
              <p class="col-xs-2">
                <input type="radio" name="num${index}" value="${msgs[i].id}_1" checked>
                <span class="glyphicon glyphicon-ok"></span>
              </p>
              <p class="col-xs-2">
                <input type="radio" name="num${index}" value="${msgs[i].id}_0">
                <span class="glyphicon glyphicon-remove"></span>
              </p>
            </div>
          `;
        };
        html+=`<button class="btn btn-primary eval-btn" data-dismiss="modal">确认</button>`;
        var $modalBody=$("#eval-modal .modal-body");
        $modalBody.html(html).on("click","button",()=>{
          var inputs=$modalBody.find("input:checked");
          for(var v of inputs){
            evalArrays.push(v.value);
          };          
        });
      } 
    })
    .then(()=>{
      /**
      * 确认提交，将投诉/评价信息保存到后台数据库，供后台人员查看
      */
      $(".submit-btn").click(e=>{
        var comp_name=$("[name=comp_name]").val();
        var comp_ID=$("[name=comp_ID]").val();
        var comp_date=$("[name=comp_date]").val();
        var has_evid=$("#evidence-show input:checked").val();
        var info_from=$("#info-from input:checked").val();
        var issign=$("#issign input:checked").val();
        var msg_id=null;
        var isgrate=new Array();
        var type=null;
        if(title=="投诉警察"){
          msg_id=$("#pc-msg option:selected").val();
          type=1;
          if(!msg_id){
            alert("请先填写投诉意见！");
          }else{
            var data={poli_num:eno,comp_name,comp_ID,comp_date,has_evid,info_from,issign,msg_id,isgrate,type}      
            $.post("data/complain_submit.php",data)
              .then((data)=>{
                if(data.code>0){
                  alert("您的投诉我们已经收到，相关部门会尽快处理！");
                  location.href="index.html";
                }            
            })
          }
        }else if(title="评价警察"){
          type=2;
          if(evalArrays.length==0){
            alert("请先填写评价意见！");
          }else{
            msg_id=new Array();
            for(var i=0;i<evalArrays.length;i++){
              var msgs=evalArrays[i].split("_");
              msg_id.push(msgs[0]);
              isgrate.push(msgs[1]);
            };
            msg_id=msg_id.join('_');
            isgrate=isgrate.join('_');
            var data={poli_num:eno,comp_name,comp_ID,comp_date,has_evid,info_from,issign,msg_id,isgrate,type};      
            $.post("data/complain_submit.php",data)
              .then((data)=>{
                if(data.code>0){
                  alert("您的评价已经成功提交，非常感谢！");
                  location.href="index.html";
                }            
            })
          };
        };
      });
    });
})
