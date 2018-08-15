/*从后台导入选择的部门成员*/
$(()=>{
    var msg=location.search.split("=")[1].split("_");
    var did=decodeURI(msg[0]);
    var title=decodeURI(msg[1]);    
    $("#title").html(title);
    var html="";   
    $.get("data/emp_list.php",{did})
     .then(data=>{
         $("#dname").html(data[0].dname); 
        var compUrl="complain.html?enum="
        for(var emp of data){            
            html+=`
            <div class="col-xs-6 col-sm-4 col-md-2 emp-info">
              <div class="emp-photo"><img src="${emp.avatar}" class="img-responsive"></div>
              <p class="emp-num">警号:<span>${emp.enum}</span></p>              
              <p class="emp-duty">职务:<span>${emp.eduty}</span></p>              
              <p class="comp-btn"><a href="${compUrl+emp.enum}_${title}" class="btn btn-warning">${title=="投诉警察"?"投诉":"评价"}</a></p>
          </div>
            `
        }
        $("#emps-container").html(html); 
     })
}) 