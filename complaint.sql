SET NAMES UTF8;
DROP DATABASE IF EXISTS complain;
CREATE DATABASE complain CHARSET=UTF8;
USE complain;

/*监狱部门表*/
CREATE TABLE pri_depart(
    did INT PRIMARY KEY AUTO_INCREMENT,
    dname VARCHAR(20),              #部门名称
    isShow INT,                     #是否前台显示(1-显示，0-不显示)
    dstate INT DEFAULT 1,           #部门状态  1-启用 0-禁用 
    role_id INT                     #对应分管副监狱长角色id
);
INSERT INTO pri_depart VALUES
(null,'政治处',1,1,3),
(null,'狱政科',1,1,4),
(null,'狱侦科',1,1,4),
(null,'教育科',1,1,4),
(null,'刑罚执行科',1,1,4),
(null,'生活卫生科',1,1,4),
(null,'劳动改造科',1,1,4),
(null,'审计室',1,1,3),
(null,'医疗防疫站',1,1,3),
(null,'第一监区',1,1,5),
(null,'第二监区',1,1,5),
(null,'第三监区',1,1,5),
(null,'其他部门',0,1,1);

/*人员表/用户表*/
CREATE TABLE pri_emp(
    enum INT PRIMARY KEY,                #警号
    ename VARCHAR(10),                   #警员姓名
    eduty VARCHAR(20),                   #职务信息
    avatar VARCHAR(128),                 #警员照片
    did INT,                             #所属部门id
    card_ID VARCHAR(20),                 #警员身份证号
    epwd VARCHAR(20) DEFAULT '123456',   #后台系统登录密码
    estate INT DEFAULT 1,                #人员状态，1-启用，2-删除/禁用,默认状态为1
    create_time BIGINT                   #人员创建时间
);
INSERT INTO pri_emp VALUES
(1001,'张三','政治处处长','img/avatar/default.jpg',1,'1324823456','123456',1,151254455441),
(1002,'张四','政治处科员','img/avatar/default.jpg',1,'1324823456','123456',1,151254455441),
(1003,'张五','政治处科员','img/avatar/default.jpg',1,'1324823456','123456',1,151254455441),
(1004,'张六','狱政科科长','img/avatar/default.jpg',2,'1324823456','123456',1,151254455441),
(1005,'王一','狱政科科员','img/avatar/default.jpg',2,'1324823456','123456',1,151254455441),
(1006,'王二','狱侦科科长','img/avatar/default.jpg',3,'1324823456','123456',1,151254455441),
(1007,'王三','狱侦科科员','img/avatar/default.jpg',3,'1324823456','123456',1,151254455441),
(1008,'王四','教育科科长','img/avatar/default.jpg',4,'1324823456','123456',1,151254455441),
(1009,'王五','教育科科员','img/avatar/default.jpg',4,'1324823456','123456',1,151254455441),
(1010,'王六','刑罚执行科科长','img/avatar/default.jpg',5,'1324823456','123456',1,151254455441),
(1011,'王七','刑罚执行科科员','img/avatar/default.jpg',5,'1324823456','123456',1,151254455441),
(1012,'王八','生活卫生科科长','img/avatar/default.jpg',6,'1324823456','123456',1,151254455441),
(1013,'王久','生活卫生科科员','img/avatar/default.jpg',6,'1324823456','123456',1,151254455441),
(1014,'李一','劳动改造科科长','img/avatar/default.jpg',7,'1324823456','123456',1,151254455441),
(1015,'李二','劳动改造科科员','img/avatar/default.jpg',7,'1324823456','123456',1,151254455441),
(1016,'李三','审计室主任','img/avatar/default.jpg',8,'1324823456','123456',1,151254455441),
(1017,'李四','审计室职员','img/avatar/default.jpg',8,'1324823456','123456',1,151254455441),
(1018,'李五','医疗防疫站站长','img/avatar/default.jpg',9,'1324823456','123456',1,151254455441),
(1019,'李留','医疗防疫站医生','img/avatar/default.jpg',9,'1324823456','123456',1,151254455441),
(1020,'李琦','第一监区区长','img/avatar/default.jpg',10,'1324823456','123456',1,151254455441),
(1021,'篱笆','第一监区区员','img/avatar/default.jpg',10,'1324823456','123456',1,151254455441),
(1022,'李九','第一监区区员','img/avatar/default.jpg',10,'1324823456','123456',1,151254455441),
(1023,'赵钱','第二监区区长','img/avatar/default.jpg',11,'1324823456','123456',1,151254455441),
(1024,'孙五','第二监区区员','img/avatar/default.jpg',11,'1324823456','123456',1,151254455441),
(1025,'赵四','第二监区区员','img/avatar/default.jpg',11,'1324823456','123456',1,151254455441),
(1026,'赵三','第三监区区长','img/avatar/default.jpg',12,'1324823456','123456',1,151254455441),
(1027,'赵六','第三监区区员','img/avatar/default.jpg',12,'1324823456','123456',1,151254455441),
(1028,'赵琦','第三监区区员','img/avatar/default.jpg',12,'1324823456','123456',1,151254455441),
(1029,'赵八','第三监区区员','img/avatar/default.jpg',12,'1324823456','123456',1,151254455441),
(1030,'赵九','第三监区区员','img/avatar/default.jpg',12,'1324823456','123456',1,151254455441),
(1031,'孙二','监狱长','img/avatar/default.jpg',13,'1324823456','123456',1,151254455441),
(1032,'孙三','办公室类副监狱长','img/avatar/default.jpg',13,'1324823456','123456',1,151254455441),
(1033,'孙四','科室类副监狱长','img/avatar/default.jpg',13,'1324823456','123456',1,151254455441),
(1034,'孙五','监区类副监狱长','img/avatar/default.jpg',13,'1324823456','123456',1,151254455441),
(1035,'孙六','IT科科长','img/avatar/default.jpg',13,'1324823456','123456',1,151254455441);


/*投诉/评价信息汇总表*/
CREATE TABLE coll_msg(
    cmid INT PRIMARY KEY AUTO_INCREMENT,
    comp_name VARCHAR(20),             #投诉(评价)人姓名
    comp_ID VARCHAR(20),               #投诉(评价)人身份证号码
    comp_date BIGINT,                  #投诉(评价)时间
    poli_num INT,                      #被投诉人(评价)警号
    msg_id VARCHAR(50),                #投诉(评价)意见id(因需保存多个评价信息id，用字符串表示)
    has_evid INT,                      #有无证据(0-无，1-有)
    info_from INT,                     #消息来源(0-听说,1-听见,2-我是当事人)
    issign INT,                        #是否署名投诉(0-署名投诉,1-匿名投诉)
    type INT DEFAULT 0,                #投诉信息(1-代表为投诉意见 2-代表为评价意见)
    isdeal INT DEFAULT 0,              #投诉是否处理(0-未处理，1-已经处理 )
    result VARCHAR(200) DEFAULT NULL,  #处理结果
    isgrate VARCHAR(50)                #满意度评价 1-好评 0-差评 null-未评价
);
CREATE TABLE enforce_msg(
    emid INT PRIMARY KEY AUTO_INCREMENT,
    eval_name VARCHAR(20),             #评价人姓名
    eval_ID VARCHAR(20),               #评价人身份证号码
    eval_date BIGINT,                  #评价时间
    enfo_type INT,                     #执法类型
    enfo_part INT,                     #被评价部门
    poli_num INT,                      #被评价人警号
    enfo_date BIGINT,                  #执法时间
    enfo_addr INT,                     #执法地点
    enfo_id INT,                       #评价意见id
    enfo_msg VARCHAR(200),             #评价具体问题
    issign INT,                        #是否署名投诉(0-署名投诉,1-匿名投诉)
    isdeal INT DEFAULT 0,              #投诉是否处理(0-未处理，1-已经处理 )
    result VARCHAR(200) DEFAULT NULL   #处理结果
);
/*角色表*/
CREATE TABLE role_tb(
    role_no INT PRIMARY KEY AUTO_INCREMENT,    #角色号
    role_name VARCHAR(100),                    #角色名称
    create_time BIGINT                         #角色创建时间
);
INSERT INTO role_tb VALUES
(null,'超级管理员',123544872),
(null,'监狱长',123544872),
(null,'办公室类管理员',123544872),
(null,'科室类管理员',123544872),
(null,'监区类管理员',123544872),
(null,'部门管理员',123544872),
(null,'普通职员',123544872);


/*用户角色表*/
CREATE TABLE user_role_tb(
    enum INT,                                  #警号即用户id
    role_no INT                                #角色id
);

INSERT INTO user_role_tb VALUES
(1001,6),
(1002,7),
(1003,7),
(1004,6),
(1005,7),
(1006,6),
(1007,7),
(1008,6),
(1009,7),
(1010,6),
(1011,7),
(1012,6),
(1013,7),
(1014,6),
(1015,7),
(1016,6),
(1017,7),
(1018,6),
(1019,7),
(1020,6),
(1021,7),
(1022,7),
(1023,6),
(1024,7),
(1025,7),
(1026,6),
(1027,7),
(1028,7),
(1029,7),
(1030,7),
(1031,2),
(1032,3),
(1033,4),
(1034,5),
(1035,1);

/*部门角色表*/
CREATE TABLE part_role_tb(
    role_no INT,                              #角色id
    did INT                                   #部门id
);

/*下拉菜单列表中的信息--数据字典*/
CREATE TABLE data_info(
 id INT PRIMARY KEY AUTO_INCREMENT,
 type VARCHAR(20),  #jtyj,zfdd 
 mxname VARCHAR(50)
);

INSERT INTO data_info values
(null,'投诉警察意见','未按规定穿着警服，佩戴警徽'),
(null,'投诉警察意见','上班期间不遵守上班规定'),
(null,'投诉警察意见','私自执法，造成严重伤害'),
(null,'投诉警察意见','私下收受家属贿赂'),
(null,'投诉警察意见','办事不按流程'),
(null,'投诉警察意见','公私不分，公报私仇'),
(null,'满意度评价','根据监狱工作要点，制定年度政治工作计划和阶段性工作安排'),
(null,'满意度评价','负责监狱党委会议议案的收集'),
(null,'满意度评价','党委会议的筹备、召集、记录、会议决定'),
(null,'满意度评价','决议、相关文件的起草'),
(null,'满意度评价','督导落实负责起草监狱党务工作'),
(null,'满意度评价','督导落实负责起草监狱思想政治工作'),
(null,'执法类型','行政执法'),
(null,'执法类型','刑罚执法'),
(null,'执法类型','普通执法'),
(null,'执法类型','高级执法'),
(null,'执法类型','中极执法'),
(null,'执法地点','监狱'),
(null,'执法地点','刑罚室'),
(null,'执法地点','法场'),
(null,'执法地点','外勤'),
(null,'执法地点','办公室'),
(null,'执法评价意见','日常工作方面'),
(null,'执法评价意见','警容风貌方面'),
(null,'执法评价意见','执法态度方面'),
(null,'执法评价意见','执法水平方面');



