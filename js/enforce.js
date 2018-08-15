$(()=>{
    //动态加载下拉框内容
    function loadData(data,selector){
      var tmp_html="";
        for(var tmp of data){
            tmp_html+=`<option value="${tmp.id}">${tmp.mxname}</option>`;
        };
        $(selector).append(tmp_html);  
    };
    $(window).load(()=>{
      $("#comp_date").val(new Date().getTime());
        //加载数据字典中的信息
        $.get("data/data_info_read.php")
          .then(data=>{
            loadData(data.enfo_type,"#enfo_type");
            loadData(data.enfo_addr,"#enfo_addr");
            loadData(data.enfo_id,"#enfo_id");
          });
        //加载部门列表信息以及所选择部门警员信息
        var $enfo_part=$("#enfo_part");
        $.get("data/part_list.php")
          .then(data=>{
             var part_html="";
            for(var tmp of data){
                part_html+=`<option value="${tmp.did}">${tmp.dname}</option>`;
            };
            $enfo_part.append(part_html); 
          }).then(()=>{
            $enfo_part.change(()=>{
              if($enfo_part.val()==""){
                alert("请先选择执法部门！");
              }else{
                $.get("data/emp_list.php",{did:$enfo_part.val()})
                  .then(data=>{
                      var emp_html=`<option value="">请选择</option>`;
                      for(var tmp of data){
                          emp_html+=`<option value="${tmp.enum}">${tmp.ename}&nbsp;&nbsp;${tmp.enum}</option>`;
                      };
                      $("#enfo_poli").html(emp_html); 
                  })
              }
            });          
          })
    });
    $(".submit-btn").click(()=>{
      var count=0,enfo_type= $("#enfo_type").val(),enfo_part= $("#enfo_part").val(),enfo_poli= $("#enfo_poli").val();
      var enfo_date=new Date($("#enfo_date").val()).getTime(),enfo_addr= $("#enfo_addr").val(),enfo_id= $("#enfo_id").val(),enfo_msg= $("#enfo_msg").val(),issign= $("#enfo_issign input:checked").val();
      var comp_name=$("[name=comp_name]").val(),comp_ID=$("[name=comp_ID]").val(),comp_date=$("[name=comp_date]").val();
      function valiNull(data,msg){
        if(!data){
          alert(msg);
          return;
        }else{
          count++;
        };
      };
      valiNull(enfo_type,"请先选择执法类型");
      valiNull(enfo_part,"请先选择执法部门");
      valiNull(enfo_poli,"请先选择执法警察");
      valiNull(enfo_date,"请先选择具体执法日期");
      valiNull(enfo_addr,"请先选择执法地点");
      valiNull(enfo_id,"请先选择具体意见");
      valiNull(enfo_msg,"请填写具体问题");
      if(count==7){
        var data={comp_name,comp_ID,comp_date,enfo_type,enfo_part,enfo_poli,enfo_date,enfo_addr,enfo_id,enfo_msg,issign};
        $.ajax({
          type:"POST",
          url:"data/enforce_submit.php",
          data:data,
          success:data=>{
            if(data.code>0){
              alert("您的执法评价信息已经提交成功，非常感谢您宝贵的意见！");
              // location.href="index.html";
            };
          }
        });
      };
    });
})