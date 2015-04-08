<%@ include file="ExtendMethod.jsp"%>
<%@ page import="org.json.*" %>
<%!
	private String DBTables(String m_parameter){
		if(m_parameter.equals("0")){
			return "UserInfo";
		}
		if(m_parameter.equals("1")){
			return "Bulletin";
		}
		if(m_parameter.equals("2")){
			return "Department";
		}
		return "";
	}

	private String QueryMethod(String m_queryname, JSONObject m_requestJSON){
		String SQLCommand = "";
		Iterator it = new ArrayList().iterator();
		if(m_requestJSON != null){
			it = m_requestJSON.keys();
		}
		try {
			//Select Table Condition
			if(m_queryname != null && m_queryname.equals("Select")){
				while(it.hasNext()) {
				    Object key = it.next(); // get key
					SQLCommand += "AND " + key + "='"+m_requestJSON.get(key.toString())+"'";
				}
				return SQLCommand;
			}

			//Select UserInfo Table All Info
			if(m_queryname != null && m_queryname.equals("SelectAllUserInfo")){

				SQLCommand += " SELECT * FROM UserInfo WHERE 1=1 ";

				while(it.hasNext()) {
				    Object key = it.next(); // get key
					//SQLCommand += "AND " + key + "='"+m_requestJSON.get(key.toString())+"'";
				    if(key.toString().equals("U_ID") && m_requestJSON.get(key.toString()) != null){
						SQLCommand += "AND U_ID='"+m_requestJSON.get(key.toString())+"'";
					}
				    if(key.toString().equals("U_Name") && m_requestJSON.get(key.toString()) != null){
						SQLCommand += "AND U_Name='"+m_requestJSON.get(key.toString())+"'";
					}
				    if(key.toString().equals("U_PW") && m_requestJSON.get(key.toString()) != null){
						SQLCommand += "AND U_PW='"+m_requestJSON.get(key.toString())+"'";
					}
				    if(key.toString().equals("U_Role") && m_requestJSON.get(key.toString()) != null){
						SQLCommand += "AND U_Role='"+m_requestJSON.get(key.toString())+"'";
					}
				    if(key.toString().equals("U_Department") && m_requestJSON.get(key.toString()) != null){
						SQLCommand += "AND U_Department='"+m_requestJSON.get(key.toString())+"'";
					}
				    if(key.toString().equals("U_Check") && m_requestJSON.get(key.toString()) != null){
						SQLCommand += "AND U_Check='"+m_requestJSON.get(key.toString())+"'";
					}
				}
				return SQLCommand;
			}

			//Select Bulletin Table All Info
			if(m_queryname != null && m_queryname.equals("SelectAllBulletin")){

				SQLCommand += " SELECT * FROM Bulletin WHERE 1=1 ";

				while(it.hasNext()) {
				    Object key = it.next(); // get key
				    if(key.toString().equals("B_ID") && m_requestJSON.get(key.toString()) != null){
						SQLCommand += "AND B_ID='"+m_requestJSON.get(key.toString())+"'";
					}
				    if(key.toString().equals("B_PublishDT") && m_requestJSON.get(key.toString()) != null){
						SQLCommand += "AND B_PublishDT='"+m_requestJSON.get(key.toString())+"'";
					}
				    if(key.toString().equals("B_Topic") && m_requestJSON.get(key.toString()) != null){
						SQLCommand += "AND B_Topic='"+m_requestJSON.get(key.toString())+"'";
					}
				    if(key.toString().equals("B_Content") && m_requestJSON.get(key.toString()) != null){
						SQLCommand += "AND B_Content='"+m_requestJSON.get(key.toString())+"'";
					}
				    if(key.toString().equals("B_User") && m_requestJSON.get(key.toString()) != null){
						SQLCommand += "AND B_User='"+m_requestJSON.get(key.toString())+"'";
					}
				    if(key.toString().equals("B_Top5Lock") && m_requestJSON.get(key.toString()) != null){
						SQLCommand += "AND B_Top5Lock='"+m_requestJSON.get(key.toString())+"'";
					}
				}
				return SQLCommand;
			}

			//Select Department Table All Info
			if(m_queryname != null && m_queryname.equals("SelectAllDepartment")){

				SQLCommand += " SELECT * FROM Department WHERE 1=1 ";

				while(it.hasNext()) {
				    Object key = it.next(); // get key
				    if(key.toString().equals("D_ID") && m_requestJSON.get(key.toString()) != null){
						SQLCommand += "AND D_ID='"+m_requestJSON.get(key.toString())+"'";
					}
				    if(key.toString().equals("D_NAME") && m_requestJSON.get(key.toString()) != null){
						SQLCommand += "AND D_NAME='"+m_requestJSON.get(key.toString())+"'";
					}
				}
				return SQLCommand;
			}

			//Select UserInfo Table Filter Admin and Guest
			if(m_queryname != null && m_queryname.equals("SelectUserInfoFilterAAndG")){

				SQLCommand += " SELECT * FROM UserInfo WHERE U_ID not in ('Administrator', 'Guest') ";
				
				return SQLCommand;
			}

			//Select Department Table without 系統
			if(m_queryname != null && m_queryname.equals("SelectAllDepartmentWithout0")){

				SQLCommand += " SELECT * FROM Department WHERE D_ID != 0 ";
				
				return SQLCommand;
			}

			//Select Bulletin Table with UserInfo
			if(m_queryname != null && m_queryname.equals("SelectBulletin")){

				SQLCommand += " SELECT Bulletin.*, UserInfo.U_Department FROM Bulletin LEFT JOIN UserInfo ON UserInfo.U_Name = Bulletin.B_User ORDER BY Bulletin.B_PublishDT DESC";
				
				return SQLCommand;
			}

		} catch (JSONException e) {
	     	e.printStackTrace();
	    }
		return SQLCommand;
	}

	private String InsertMethod(String m_insertname, JSONObject m_requestJSON){
		String SQLCommand = "";
		String Schema = "";
		String Values = " VALUES ";
		Iterator it = m_requestJSON.keys();

		try{
			//Insert Table Condition
			if(m_insertname != null && m_insertname.equals("Insert")){
				Schema += " ( ";
				Values += " ( ";
				while(it.hasNext()) {
				    Object key = it.next(); // get key
				    Schema += key.toString() + ",";
				    Values += "N'" + m_requestJSON.get(key.toString()) + "',";
				}
				if(Schema != null && Values != null){
					Schema = TrimEnd(Schema, ",");
					Values = TrimEnd(Values, ",");
				}
				Schema += " ) ";
				Values += " ) ";
				SQLCommand = Schema + Values;

				return SQLCommand;
			}
		} catch (JSONException e) {
	     	e.printStackTrace();
	    }

		return SQLCommand;
	}

	private String UpdateMethod(String m_updatename, JSONObject m_requestJSON){
		String SQLCommand = "";
		String Set = " SET ";
		Iterator it = m_requestJSON.keys();

		try{
			//Update Table Condition
			if(m_updatename != null && m_updatename.equals("Update")){
				while(it.hasNext()) {
				    Object key = it.next(); // get key
				    Set += key + "=N'" + m_requestJSON.get(key.toString()) + "',";
				}
				if(Set != null){
					Set = TrimEnd(Set, ",");
				}
				SQLCommand = Set;

				return SQLCommand;
			}
		} catch (JSONException e) {
	     	e.printStackTrace();
	    }

		return SQLCommand;
	}
%>