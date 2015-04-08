<%@ include file="DBConnect.jsp"%>
<%@ include file="Unitility/DBTable.jsp"%>
<%

	String SQLCommand = null;
	String output = "";

	try{

		Statement stmt = conn.createStatement();
		//SQLCommand = " SELECT * FROM ";
		//SQLCommand += DBTables(request.getParameter("table"));
		//SQLCommand += " WHERE 1=1 ";

		String queryname = request.getParameter("queryname");
		String query = null;
		if(request.getParameter("query") != null && !request.getParameter("query").equals("undefined")){
			query = URLDecoder.decode(request.getParameter("query"),"UTF-8");
		}

		JSONObject requestJSON = null;
		if(query != null){
			requestJSON = new JSONObject(query);
			//if(requestJSON != null){
				//SQLCommand = QueryMethod(queryname, requestJSON);
			//}
			//out.println(requestJSON);
		}
		SQLCommand = QueryMethod(queryname, requestJSON);
		//out.println(SQLCommand);
		ResultSet rs = stmt.executeQuery(SQLCommand);

		List<HashMap<String,Object>> list = new ArrayList<HashMap<String,Object>>();
		ResultSetMetaData metaData = rs.getMetaData();
		int count = metaData.getColumnCount(); //number of column
		String columnName[] = new String[count];

		for (int i = 1; i <= count; i++)
		{
		   columnName[i-1] = metaData.getColumnLabel(i); 
		   //out.println(columnName[i-1]);
		}

		while(rs.next()) {
			HashMap<String,Object> row = new HashMap<String, Object>(count);
		    for(int i=1; i<=count; ++i){           
		    	row.put(metaData.getColumnName(i), rs.getObject(i));
		    }
		    list.add(row);
		    //out.println(list);
		}

		JSONObject responseJSON = new JSONObject();
		responseJSON.put("selectObject", list);
		//out.println(responseJSON);

		String callback = request.getParameter("callback");
	    response.setCharacterEncoding("UTF-8");
	    if (callback != null) {
	        // Equivalent to: <@page contentType="text/javascript" pageEncoding="UTF-8">
	        response.setContentType("text/javascript");
	    } else {
	        // Equivalent to: <@page contentType="application/json" pageEncoding="UTF-8">
	        response.setContentType("application/json");
	    }

	    if (callback != null) {
	        output += callback + "(";
	    }

	    output += responseJSON.toString();

	    if (callback != null) {
	        output += ");";
	    }

		//response.setContentType("application/json");
		//response.getWriter().write(responseJSON.toString());
	}
	catch(SQLException ex2) {
		out.println(ex2.getMessage());
	}

%><%=output %>
