<%@ include file="DBConnect.jsp"%>
<%@ include file="Unitility/DBTable.jsp"%>
<%
	String SQLCommand = null;
	String returnStatus = null;
	try{

		Statement stmt = conn.createStatement();
		SQLCommand = " DELETE FROM ";
		SQLCommand += DBTables(request.getParameter("table"));

		SQLCommand += " WHERE 1=1 ";
		String query = null;
		if(request.getParameter("query") != null && !request.getParameter("query").equals("undefined")){
			//query = URLDecoder.decode(request.getParameter("query"),"UTF-8");
			query = request.getParameter("query");
		}

		JSONObject requestJSON = null;
		if(query != null){
			requestJSON = new JSONObject(query);
			//if(requestJSON != null){
				//SQLCommand += ConditionOfUpdateMethod(queryname, requestJSON);
			//}
		}
		SQLCommand += QueryMethod("Select", requestJSON);
		//out.println(SQLCommand);
		stmt.executeUpdate(SQLCommand);

		returnStatus = "Success";
	}
	catch(SQLException ex2) {
		returnStatus = "Fail";
		out.println(ex2.getMessage());
	}
%><%=returnStatus %>