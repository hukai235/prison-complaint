/*查询出需要显示在页面的部门 */
$(()=>{
  var msg=decodeURI(location.search.split("=")[1]);
  $(window).load(()=>{
    $("#locationMsg").html(msg);
  });
  var partMsg="";
  $.get('data/part_list.php')
    .then(data=>{
      var html="";
      var empUrl="emp.html?did="
      for(var dparts of data){
        html+=`<a class="btn btn-warning col-xs-5 col-sm-3" href="${empUrl+dparts.did}_${msg}">${dparts.dname}</a>`;
      };
      $(".part-list").html(html);
    })
})

$(()=>{
  /*绑定数字按键单击事件*/ 
  var $enum=$("#enum"); 
  $(".num-table").on("click","td",e=>{
    e.stopPropagation();   
    var $this=$(e.target);           
      if($this.hasClass("td-remove")){
        $enum.val($enum.val().slice(0,-1));
        // console.log($enum.val(enumVal.slice(0,-1)));
      }else if($this.hasClass("td-refresh")){
        $enum.val("");
      }else{
        $enum.val($enum.val()+$this.text());
      }    
  })
  /**
   * 绑定搜索按钮单击事件，跳转到投诉/评价页面
   */  
  $("[data-btn=search]").click(()=>{  
    var inputMsg=$enum.val();
    if(!$enum.val()){
      alert("请输入警号后开始查询！");
      return;
    }else{
      $.get("data/check_enum.php",{enum:inputMsg})
        .then(data=>{
          if(data.code<0){
            alert("您查找的警号信息不存在");
            $enum.val('');
          }else{
            var info=$("#locationMsg").html();
            location.href=`complain.html?enum=${inputMsg}_${info}`;
          }
        })
    }
  })
})