-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-10-22 20:45:14
-- 服务器版本： 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `complain`
--
SET NAMES UTF8;
DROP DATABASE IF EXISTS complain;
CREATE DATABASE complain CHARSET=UTF8;
USE complain;
-- --------------------------------------------------------

--
-- 表的结构 `coll_msg`
--

CREATE TABLE `coll_msg` (
  `cmid` int(11) NOT NULL,
  `comp_name` varchar(20) DEFAULT NULL,
  `comp_ID` varchar(20) DEFAULT NULL,
  `comp_date` bigint(20) DEFAULT NULL,
  `poli_num` int(11) DEFAULT NULL,
  `msg_id` int(11) DEFAULT NULL,
  `has_evid` int(11) DEFAULT NULL,
  `info_from` int(11) DEFAULT NULL,
  `issign` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT '0',
  `isdeal` int(11) DEFAULT '0',
  `result` varchar(200) DEFAULT NULL,
  `isgrate` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `coll_msg`
--

INSERT INTO `coll_msg` (`cmid`, `comp_name`, `comp_ID`, `comp_date`, `poli_num`, `msg_id`, `has_evid`, `info_from`, `issign`, `type`, `isdeal`, `result`, `isgrate`) VALUES
(1, '丁丁', '4254201255643205', 1508691320623, 1005, 1, 1, 2, 0, 1, 0, NULL, 2),
(2, '丁丁', '4254201255643205', 1508691334007, 1014, 5, 1, 1, 0, 1, 0, NULL, 2),
(3, '丁丁', '4254201255643205', 1508691346474, 1028, 3, 0, 0, 0, 1, 0, NULL, 2),
(4, '丁丁', '4254201255643205', 1508691355057, 1007, 6, 0, 0, 0, 1, 0, NULL, 2),
(5, '丁丁', '4254201255643205', 1508691365285, 1014, 2, 1, 1, 0, 1, 0, NULL, 2),
(6, '丁丁', '4254201255643205', 1508691377797, 1024, 4, 1, 2, 0, 1, 0, NULL, 2),
(7, '丁丁', '4254201255643205', 1508691388636, 1008, 1, 0, 1, 0, 1, 0, NULL, 2),
(8, '丁丁', '4254201255643205', 1508691403430, 1017, 8, 0, 1, 0, 2, 0, NULL, 1),
(9, '丁丁', '4254201255643205', 1508691403430, 1017, 9, 0, 1, 0, 2, 0, NULL, 1),
(10, '丁丁', '4254201255643205', 1508691403430, 1017, 10, 0, 1, 0, 2, 0, NULL, 0),
(11, '丁丁', '4254201255643205', 1508691403430, 1017, 11, 0, 1, 0, 2, 0, NULL, 1),
(12, '丁丁', '4254201255643205', 1508691403430, 1017, 12, 0, 1, 0, 2, 0, NULL, 1),
(13, '丁丁', '4254201255643205', 1508691417560, 1010, 8, 0, 0, 0, 2, 0, NULL, 1),
(14, '丁丁', '4254201255643205', 1508691417560, 1010, 9, 0, 0, 0, 2, 0, NULL, 0),
(15, '丁丁', '4254201255643205', 1508691417560, 1010, 10, 0, 0, 0, 2, 0, NULL, 1),
(16, '丁丁', '4254201255643205', 1508691417560, 1010, 11, 0, 0, 0, 2, 0, NULL, 1),
(17, '丁丁', '4254201255643205', 1508691417560, 1010, 12, 0, 0, 0, 2, 0, NULL, 1),
(18, '丁丁', '4254201255643205', 1508691429634, 1019, 1, 0, 0, 1, 1, 0, NULL, 2),
(19, '丁丁', '4254201255643205', 1508691438435, 1022, 8, 0, 2, 0, 2, 0, NULL, 1),
(20, '丁丁', '4254201255643205', 1508691438435, 1022, 9, 0, 2, 0, 2, 0, NULL, 0),
(21, '丁丁', '4254201255643205', 1508691438435, 1022, 10, 0, 2, 0, 2, 0, NULL, 1),
(22, '丁丁', '4254201255643205', 1508691438435, 1022, 11, 0, 2, 0, 2, 0, NULL, 1),
(23, '丁丁', '4254201255643205', 1508691438435, 1022, 12, 0, 2, 0, 2, 0, NULL, 1),
(24, '丁丁', '4254201255643205', 1508691438435, 1022, 8, 0, 2, 0, 2, 0, NULL, 1),
(25, '丁丁', '4254201255643205', 1508691438435, 1022, 9, 0, 2, 0, 2, 0, NULL, 0),
(26, '丁丁', '4254201255643205', 1508691438435, 1022, 10, 0, 2, 0, 2, 0, NULL, 1),
(27, '丁丁', '4254201255643205', 1508691438435, 1022, 11, 0, 2, 0, 2, 0, NULL, 1),
(28, '丁丁', '4254201255643205', 1508691438435, 1022, 12, 0, 2, 0, 2, 0, NULL, 1),
(29, '丁丁', '4254201255643205', 1508691438435, 1022, 8, 0, 2, 0, 2, 0, NULL, 1),
(30, '丁丁', '4254201255643205', 1508691438435, 1022, 9, 0, 2, 0, 2, 0, NULL, 0),
(31, '丁丁', '4254201255643205', 1508691438435, 1022, 10, 0, 2, 0, 2, 0, NULL, 0),
(32, '丁丁', '4254201255643205', 1508691438435, 1022, 11, 0, 2, 0, 2, 0, NULL, 1),
(33, '丁丁', '4254201255643205', 1508691438435, 1022, 12, 0, 2, 0, 2, 0, NULL, 1);

-- --------------------------------------------------------

--
-- 表的结构 `data_info`
--

CREATE TABLE `data_info` (
  `id` int(11) NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  `mxname` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `data_info`
--

INSERT INTO `data_info` (`id`, `type`, `mxname`) VALUES
(1, '投诉警察意见', '未按规定穿着警服，佩戴警徽'),
(2, '投诉警察意见', '上班期间不遵守上班规定'),
(3, '投诉警察意见', '私自执法，造成严重伤害'),
(4, '投诉警察意见', '私下收受家属贿赂'),
(5, '投诉警察意见', '办事不按流程'),
(6, '投诉警察意见', '公私不分，公报私仇'),
(7, '满意度评价', '根据监狱工作要点，制定年度政治工作计划和阶段性工作安排'),
(8, '满意度评价', '负责监狱党委会议议案的收集'),
(9, '满意度评价', '党委会议的筹备、召集、记录、会议决定'),
(10, '满意度评价', '决议、相关文件的起草'),
(11, '满意度评价', '督导落实负责起草监狱党务工作'),
(12, '满意度评价', '督导落实负责起草监狱思想政治工作'),
(13, '执法类型', '行政执法'),
(14, '执法类型', '刑罚执法'),
(15, '执法类型', '普通执法'),
(16, '执法类型', '高级执法'),
(17, '执法类型', '中极执法'),
(18, '执法地点', '监狱'),
(19, '执法地点', '刑罚室'),
(20, '执法地点', '法场'),
(21, '执法地点', '外勤'),
(22, '执法地点', '办公室'),
(23, '执法评价意见', '日常工作方面'),
(24, '执法评价意见', '警容风貌方面'),
(25, '执法评价意见', '执法态度方面'),
(26, '执法评价意见', '执法水平方面');

-- --------------------------------------------------------

--
-- 表的结构 `enforce_msg`
--

CREATE TABLE `enforce_msg` (
  `emid` int(11) NOT NULL,
  `eval_name` varchar(20) DEFAULT NULL,
  `eval_ID` varchar(20) DEFAULT NULL,
  `eval_date` bigint(20) DEFAULT NULL,
  `enfo_type` int(11) DEFAULT NULL,
  `enfo_part` int(11) DEFAULT NULL,
  `poli_num` int(11) DEFAULT NULL,
  `enfo_date` int(11) DEFAULT NULL,
  `enfo_addr` int(11) DEFAULT NULL,
  `enfo_id` int(11) DEFAULT NULL,
  `enfo_msg` varchar(200) DEFAULT NULL,
  `issign` int(11) DEFAULT NULL,
  `isdeal` int(11) DEFAULT '0',
  `result` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `enforce_msg`
--

INSERT INTO `enforce_msg` (`emid`, `eval_name`, `eval_ID`, `eval_date`, `enfo_type`, `enfo_part`, `poli_num`, `enfo_date`, `enfo_addr`, `enfo_id`, `enfo_msg`, `issign`, `isdeal`, `result`) VALUES
(1, '丁丁', '4254201255643205', 1508691453408, 17, 2, 1005, 2147483647, 20, 23, '啊tea银行', 1, 0, NULL),
(2, '丁丁', '4254201255643205', 1508691469610, 16, 5, 1010, 2147483647, 22, 25, '鄂温特与他西侧哦了', 1, 0, NULL),
(3, '丁丁', '4254201255643205', 1508691488392, 16, 12, 1029, 2147483647, 20, 23, '额外供图族人箱体', 0, 0, NULL),
(4, '丁丁', '4254201255643205', 1508691509142, 15, 4, 1009, 2147483647, 18, 24, '他还箱体ucoliubpnoimkgm', 0, 0, NULL),
(5, '丁丁', '4254201255643205', 1508693961183, 13, 1, 1002, 2147483647, 21, 25, 'weTGREURZIK', 0, 0, NULL),
(6, '丁丁', '4254201255643205', 1508693980154, 15, 1, 1002, 2147483647, 22, 23, '鄂温特温柔的就是打开房间看电视v', 1, 0, NULL),
(7, '丁丁', '4254201255643205', 1508694253660, 17, 1, 1002, 2147483647, 21, 24, '第三轮房间看电视女驸马科技股咖啡吧股份', 0, 0, NULL),
(8, '丁丁', '4254201255643205', 1508694301385, 14, 1, 1002, 2147483647, 19, 25, '法国警方扣留的释放空间都是快乐', 0, 0, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `part_role_tb`
--

CREATE TABLE `part_role_tb` (
  `role_no` int(11) DEFAULT NULL,
  `did` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `pri_depart`
--

CREATE TABLE `pri_depart` (
  `did` int(11) NOT NULL,
  `dname` varchar(20) DEFAULT NULL,
  `isShow` int(11) DEFAULT NULL,
  `dstate` int(11) DEFAULT '1',
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `pri_depart`
--

INSERT INTO `pri_depart` (`did`, `dname`, `isShow`, `dstate`, `role_id`) VALUES
(1, '政治处', 1, 1, 3),
(2, '狱政科', 1, 1, 4),
(3, '狱侦科', 1, 1, 4),
(4, '教育科', 1, 1, 4),
(5, '刑罚执行科', 1, 1, 4),
(6, '生活卫生科', 1, 1, 4),
(7, '劳动改造科', 1, 1, 4),
(8, '审计室', 1, 1, 3),
(9, '医疗防疫站', 1, 1, 3),
(10, '第一监区', 1, 1, 5),
(11, '第二监区', 1, 1, 5),
(12, '第三监区', 1, 1, 5),
(13, '其他部门', 0, 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `pri_emp`
--

CREATE TABLE `pri_emp` (
  `enum` int(11) NOT NULL,
  `ename` varchar(10) DEFAULT NULL,
  `eduty` varchar(20) DEFAULT NULL,
  `avatar` varchar(128) DEFAULT NULL,
  `did` int(11) DEFAULT NULL,
  `card_ID` varchar(20) DEFAULT NULL,
  `epwd` varchar(20) DEFAULT '123456',
  `estate` int(11) DEFAULT '1',
  `create_time` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `pri_emp`
--

INSERT INTO `pri_emp` (`enum`, `ename`, `eduty`, `avatar`, `did`, `card_ID`, `epwd`, `estate`, `create_time`) VALUES
(1001, '张三', '政治处处长', 'img/avatar/default.jpg', 1, '1324823456', '123456', 1, 151254455441),
(1002, '张四', '政治处科员', 'img/avatar/default.jpg', 1, '1324823456', '123456', 1, 151254455441),
(1003, '张五', '政治处科员', 'img/avatar/default.jpg', 1, '1324823456', '123456', 1, 151254455441),
(1004, '张六', '狱政科科长', 'img/avatar/default.jpg', 2, '1324823456', '123456', 1, 151254455441),
(1005, '王一', '狱政科科员', 'img/avatar/default.jpg', 2, '1324823456', '123456', 1, 151254455441),
(1006, '王二', '狱侦科科长', 'img/avatar/default.jpg', 3, '1324823456', '123456', 1, 151254455441),
(1007, '王三', '狱侦科科员', 'img/avatar/default.jpg', 3, '1324823456', '123456', 1, 151254455441),
(1008, '王四', '教育科科长', 'img/avatar/default.jpg', 4, '1324823456', '123456', 1, 151254455441),
(1009, '王五', '教育科科员', 'img/avatar/default.jpg', 4, '1324823456', '123456', 1, 151254455441),
(1010, '王六', '刑罚执行科科长', 'img/avatar/default.jpg', 5, '1324823456', '123456', 1, 151254455441),
(1011, '王七', '刑罚执行科科员', 'img/avatar/default.jpg', 5, '1324823456', '123456', 1, 151254455441),
(1012, '王八', '生活卫生科科长', 'img/avatar/default.jpg', 6, '1324823456', '123456', 1, 151254455441),
(1013, '王久', '生活卫生科科员', 'img/avatar/default.jpg', 6, '1324823456', '123456', 1, 151254455441),
(1014, '李一', '劳动改造科科长', 'img/avatar/default.jpg', 7, '1324823456', '123456', 1, 151254455441),
(1015, '李二', '劳动改造科科员', 'img/avatar/default.jpg', 7, '1324823456', '123456', 1, 151254455441),
(1016, '李三', '审计室主任', 'img/avatar/default.jpg', 8, '1324823456', '123456', 1, 151254455441),
(1017, '李四', '审计室职员', 'img/avatar/default.jpg', 8, '1324823456', '123456', 1, 151254455441),
(1018, '李五', '医疗防疫站站长', 'img/avatar/default.jpg', 9, '1324823456', '123456', 1, 151254455441),
(1019, '李留', '医疗防疫站医生', 'img/avatar/default.jpg', 9, '1324823456', '123456', 1, 151254455441),
(1020, '李琦', '第一监区区长', 'img/avatar/default.jpg', 10, '1324823456', '123456', 1, 151254455441),
(1021, '篱笆', '第一监区区员', 'img/avatar/default.jpg', 10, '1324823456', '123456', 1, 151254455441),
(1022, '李九', '第一监区区员', 'img/avatar/default.jpg', 10, '1324823456', '123456', 1, 151254455441),
(1023, '赵钱', '第二监区区长', 'img/avatar/default.jpg', 11, '1324823456', '123456', 1, 151254455441),
(1024, '孙五', '第二监区区员', 'img/avatar/default.jpg', 11, '1324823456', '123456', 1, 151254455441),
(1025, '赵四', '第二监区区员', 'img/avatar/default.jpg', 11, '1324823456', '123456', 1, 151254455441),
(1026, '赵三', '第三监区区长', 'img/avatar/default.jpg', 12, '1324823456', '123456', 1, 151254455441),
(1027, '赵六', '第三监区区员', 'img/avatar/default.jpg', 12, '1324823456', '123456', 1, 151254455441),
(1028, '赵琦', '第三监区区员', 'img/avatar/default.jpg', 12, '1324823456', '123456', 1, 151254455441),
(1029, '赵八', '第三监区区员', 'img/avatar/default.jpg', 12, '1324823456', '123456', 1, 151254455441),
(1030, '赵九', '第三监区区员', 'img/avatar/default.jpg', 12, '1324823456', '123456', 1, 151254455441),
(1031, '孙二', '监狱长', 'img/avatar/default.jpg', 13, '1324823456', '123456', 1, 151254455441),
(1032, '孙三', '办公室类副监狱长', 'img/avatar/default.jpg', 13, '1324823456', '123456', 1, 151254455441),
(1033, '孙四', '科室类副监狱长', 'img/avatar/default.jpg', 13, '1324823456', '123456', 1, 151254455441),
(1034, '孙五', '监区类副监狱长', 'img/avatar/default.jpg', 13, '1324823456', '123456', 1, 151254455441),
(1035, '孙六', 'IT科科长', 'img/avatar/default.jpg', 13, '1324823456', '123456', 1, 151254455441);

-- --------------------------------------------------------

--
-- 表的结构 `role_tb`
--

CREATE TABLE `role_tb` (
  `role_no` int(11) NOT NULL,
  `role_name` varchar(100) DEFAULT NULL,
  `create_time` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `role_tb`
--

INSERT INTO `role_tb` (`role_no`, `role_name`, `create_time`) VALUES
(1, '超级管理员', 123544872),
(2, '监狱长', 123544872),
(3, '办公室类管理员', 123544872),
(4, '科室类管理员', 123544872),
(5, '监区类管理员', 123544872),
(6, '部门管理员', 123544872),
(7, '普通职员', 123544872);

-- --------------------------------------------------------

--
-- 表的结构 `user_role_tb`
--

CREATE TABLE `user_role_tb` (
  `enum` int(11) DEFAULT NULL,
  `role_no` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user_role_tb`
--

INSERT INTO `user_role_tb` (`enum`, `role_no`) VALUES
(1001, 6),
(1002, 7),
(1003, 7),
(1004, 6),
(1005, 7),
(1006, 6),
(1007, 7),
(1008, 6),
(1009, 7),
(1010, 6),
(1011, 7),
(1012, 6),
(1013, 7),
(1014, 6),
(1015, 7),
(1016, 6),
(1017, 7),
(1018, 6),
(1019, 7),
(1020, 6),
(1021, 7),
(1022, 7),
(1023, 6),
(1024, 7),
(1025, 7),
(1026, 6),
(1027, 7),
(1028, 7),
(1029, 7),
(1030, 7),
(1031, 2),
(1032, 3),
(1033, 4),
(1034, 5),
(1035, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `coll_msg`
--
ALTER TABLE `coll_msg`
  ADD PRIMARY KEY (`cmid`);

--
-- Indexes for table `data_info`
--
ALTER TABLE `data_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enforce_msg`
--
ALTER TABLE `enforce_msg`
  ADD PRIMARY KEY (`emid`);

--
-- Indexes for table `pri_depart`
--
ALTER TABLE `pri_depart`
  ADD PRIMARY KEY (`did`);

--
-- Indexes for table `pri_emp`
--
ALTER TABLE `pri_emp`
  ADD PRIMARY KEY (`enum`);

--
-- Indexes for table `role_tb`
--
ALTER TABLE `role_tb`
  ADD PRIMARY KEY (`role_no`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `coll_msg`
--
ALTER TABLE `coll_msg`
  MODIFY `cmid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- 使用表AUTO_INCREMENT `data_info`
--
ALTER TABLE `data_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- 使用表AUTO_INCREMENT `enforce_msg`
--
ALTER TABLE `enforce_msg`
  MODIFY `emid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- 使用表AUTO_INCREMENT `pri_depart`
--
ALTER TABLE `pri_depart`
  MODIFY `did` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- 使用表AUTO_INCREMENT `role_tb`
--
ALTER TABLE `role_tb`
  MODIFY `role_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
