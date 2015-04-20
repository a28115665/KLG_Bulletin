<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"
		 import="com.google.common.collect.*,
		 		 util.io.*,
		 		 java.net.*,
		 		 java.util.*,
		 		 java.io.*,
		 		 java.util.regex.*,
		 		 java.lang.*,
		 		 org.json.*,
		 		 java.sql.*"
%>
<%
	String conn_str = "jdbc:sqlserver://192.168.124.131:1433;databaseName=KLG_Bulletin;user=sa;password=p@ssw0rd;";
	Connection conn = null;
	File now_directory = new File(".");
	String absolutePath = now_directory.getAbsolutePath().replaceAll("\\.","");
	
	try {
		Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
		conn = DriverManager.getConnection(conn_str);
	}
	catch(ClassNotFoundException ex1) {
		out.println("JDBC Driver Fail");
		out.println(ex1.getMessage());
	}

%>