<%@ include file="DBConnect.jsp"%>
<%@ include file="Unitility/DBTable.jsp"%>
<%
	String SQLCommand = null;
	String returnStatus = null;

	try{

		//if(request.getParameter("table") == null) return;
		//if(request.getParameter("insertname") == null) return;
		//if(request.getParameter("insert") == null) return;

		Statement stmt = conn.createStatement();
		SQLCommand = " INSERT INTO ";
		SQLCommand += DBTables(request.getParameter("table"));

		String insertname = request.getParameter("insertname");
		//String insert = URLDecoder.decode(request.getParameter("insert"),"UTF-8");
		String insert = request.getParameter("insert");
		if(insert != null){
			//out.println(request.getParameter("insert"));
			JSONObject requestJSON = new JSONObject(insert);
			if(requestJSON != null){
				SQLCommand += InsertMethod(insertname, requestJSON);
			}
		}
		//out.println(SQLCommand);
		stmt.executeUpdate(SQLCommand);

		//ResultSetMetaData metaData = rs.getMetaData();
		//returnNumber = metaData.getColumnCount();
		returnStatus = "Success";
	}
	catch(SQLException ex2) {
		returnStatus = "Fail";
		out.println(ex2.getMessage());
	}

%><%=SQLCommand %>