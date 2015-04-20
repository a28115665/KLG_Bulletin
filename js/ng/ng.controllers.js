angular.module('app.controllers', [])
	.factory('settings', ['$rootScope', function($rootScope){
		// supported languages
		
		var settings = {
			languages: [
				{
					language: 'English',
					translation: 'English',
					langCode: 'en',
					flagCode: 'us'
				},
				{
					language: 'Espanish',
					translation: 'Espanish',
					langCode: 'es',
					flagCode: 'es'
				},
				{
					language: 'German',
					translation: 'Deutsch',
					langCode: 'de',
					flagCode: 'de'
				},
				{
					language: 'Korean',
					translation: '한국의',
					langCode: 'ko',
					flagCode: 'kr'
				},
				{
					language: 'French',
					translation: 'français',
					langCode: 'fr',
					flagCode: 'fr'
				},
				{
					language: 'Portuguese',
					translation: 'português',
					langCode: 'pt',
					flagCode: 'br'
				},
				{
					language: 'Russian',
					translation: 'русский',
					langCode: 'ru',
					flagCode: 'ru'
				},
				{
					language: 'Chinese',
					translation: '中國的',
					langCode: 'zh',
					flagCode: 'cn'
				}
			],
			
		};

		return settings;
		
	}])

	.controller('PageViewController', ['$scope', '$route', '$animate', function($scope, $route, $animate) {
		// controler of the dynamically loaded views, for DEMO purposes only.
		/*$scope.$on('$viewContentLoaded', function() {
			
		});*/
	}])

	.controller('SmartAppController', ['$scope', function($scope) {
		// your main controller
	}])

	.controller('LangController', ['$scope', 'settings', 'localize', function($scope, settings, localize) {
		$scope.languages = settings.languages;
		$scope.currentLang = settings.currentLang;
		$scope.setLang = function(lang) {
			settings.currentLang = lang;
			$scope.currentLang = lang;
			localize.setLang(lang);
		};

		// set the default language
		$scope.setLang($scope.currentLang);

	}])
	
;

angular.module('app.demoControllers', [])
	.controller('WidgetDemoCtrl', ['$scope', '$sce', function($scope, $sce) {
		$scope.title = 'SmartUI Widget';
		$scope.icon = 'fa fa-user';
		$scope.toolbars = [
			$sce.trustAsHtml('<div class="label label-success">\
				<i class="fa fa-arrow-up"></i> 2.35%\
			</div>'),
			$sce.trustAsHtml('<div class="btn-group" data-toggle="buttons">\
				<label class="btn btn-default btn-xs active">\
					<input type="radio" name="style-a1" id="style-a1"> <i class="fa fa-play"></i>\
				</label>\
				<label class="btn btn-default btn-xs">\
					<input type="radio" name="style-a2" id="style-a2"> <i class="fa fa-pause"></i>\
				</label>\
				<label class="btn btn-default btn-xs">\
					<input type="radio" name="style-a2" id="style-a3"> <i class="fa fa-stop"></i>\
				</label>\
			</div>')
		];

		$scope.content = $sce.trustAsHtml('\
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\
						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\
						proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
	}])

	.controller('ActivityDemoCtrl', ['$scope', function($scope) {
		var ctrl = this;
		ctrl.getDate = function() {
			return new Date().toUTCString();
		};

		$scope.refreshCallback = function(contentScope, done) {

			// use contentScope to get access with activityContent directive's Control Scope
			console.log(contentScope);

			// for example getting your very long data ...........
			setTimeout(function() {
				done();
			}, 3000);

			$scope.footerContent = ctrl.getDate();
		};

		$scope.items = [
			{
				title: 'Msgs',
				count: 14, 
				src: 'ajax/notify/mail.html',
				onload: function(item) {
					console.log(item);
					alert('[Callback] Loading Messages ...');
				}
			},
			{
				title: 'Notify',
				count: 3,
				src: 'ajax/notify/notifications.html'
			},
			{
				title: 'Tasks',
				count: 4,
				src: 'ajax/notify/tasks.html',
				//active: true
			}
		];

		$scope.total = 0;
		angular.forEach($scope.items, function(item) {
			$scope.total += item.count;
		});

		$scope.footerContent = ctrl.getDate();
		
	}])
;

angular.module('app.forumControllers', [])
	.constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            logoutFailed: 'auth-logout-failed',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
    })

    .constant('USER_ROLES', {
        admin: 'Admin',
        user: 'User',
        guest: 'Guest'
    })

    .factory('AuthService',
        function ($rootScope, $http, Session, forumService, toaster) {
            var authService = {};

            authService.login = function (credentials) {
				// console.log(credentials);
                var login = {
                    title: "Login",
                    jspUrl: "jsp/",
                    handler: "DBSelect.jsp",
                    addr: $rootScope._URL,
                    queryname: 'SelectAllUserInfo',
                    query: {
                        U_ID     : credentials.U_ID,
                        U_PW     : credentials.U_PW,
                        U_Check  : 1
                    }
                };
            	var promise = forumService.searchMSSQLData(login);
            	promise.then(function(res) {
                	// console.log('testinlogin', res.selectObject);
                    if(res.selectObject.length == 0){
                        // logger.logError("帳號或密碼錯誤");
                        // console.log('帳號或密碼錯誤');
                        toaster.pop('error', "", "帳號或密碼錯誤", 3000);
                    }else{
                        if(res.selectObject[0].U_ID == credentials.U_ID && res.selectObject[0].U_PW == credentials.U_PW){
                            // logger.logSuccess(res.response.docs[0].User_Name+' 登入成功');
                            // console.log(res.response.docs[0].U_Name+' 登入成功');
                            toaster.pop('success', "", "登入成功", 3000);
                            Session.create(res.selectObject[0].U_ID, res.selectObject[0].U_Name, res.selectObject[0].U_Role/*res.user.role*/);
                            return res.selectObject[0];
                        }
                    };
                }, function(data) {
                    return console.log('loginFailed');
                });

                return promise;
            };

            authService.register = function (register) {
                return forumService.applyInsert('jsp/DBInsert.jsp', JSON.stringify(register));
            };

            authService.logout = function () {
                return Session.destroy();
            };

            authService.isAuthenticated = function () {
                // console.log("is:", localStorage.getItem('loginStatus'));
                if(JSON.parse(localStorage.getItem('loginStatus')) != null)
                    return !!JSON.parse(localStorage.getItem('loginStatus')).U_Name;
                else
                    return null;
            };
         
            authService.isAuthorized = function (authorizedRoles) {
                // console.log("authorizedRoles:",authorizedRoles);
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }
                // console.log(authService.isAuthenticated(), authorizedRoles.indexOf(JSON.parse(localStorage.getItem('loginStatus')).userRole) !== -1);
                return (authService.isAuthenticated() && authorizedRoles.indexOf(JSON.parse(localStorage.getItem('loginStatus')).userRole) !== -1);
            };
         
            return authService;
    })

    .service('Session', function () {
        this.create = function (sessionId, userId, userRole) {
            localStorage.setItem('loginStatus', JSON.stringify({
                id : sessionId,
                userId : userId,
                userRole : userRole
            }));
            // this.id = sessionId;
            // this.userId = userId;
            // this.userRole = userRole;
        };
        this.destroy = function () {
            localStorage.removeItem('loginStatus');
            // this.id = null;
            // this.userId = null;
            // this.userRole = null;
        };
        return this;
    })

	.service("forumService", function ($rootScope, $http, $q, $modal, $cookieStore, $location, toaster) {

		// this.changePermissions = function () {
		// 	$rootScope.UserInfo = JSON.parse(localStorage.getItem('loginStatus'))
		// },
		$rootScope.UserInfo = JSON.parse(localStorage.getItem('loginStatus')),
		//$rootScope.folderName = $rootScope.UserInfo == null?'':encodeURI($rootScope.UserInfo['U_Name']+$rootScope.UserInfo['U_PublishDT'].replace(/\s/g,"").replace(/:/g,"_"))+'/',
		$rootScope.folderName = 'uploads',
        $rootScope.createFolderPath = '/KLG_Bulletin/jsp/createFolder.jsp?file-upload-path=', //C:/Users/User/Desktop/example/jetty_demo/webapps/root
		$rootScope.uploadURL='/KLG_Bulletin/jsp/uploadFile.jsp?file-upload=',//C:/Users/User/Desktop/example/jetty_demo/webapps/root/ESVC/uploads/',
		$rootScope._URL= 'http://127.0.0.1:8085/KLG_Bulletin/',

		$rootScope.forumTopicRelation = JSON.parse(localStorage.getItem('forumTopicRelation')),
		$rootScope.forumPostRelation = JSON.parse(localStorage.getItem('forumPostRelation')),
		$rootScope.readyToResolved = JSON.parse(localStorage.getItem('readyToResolved')),
		$rootScope.questionRateData = JSON.parse(localStorage.getItem('questionRateData')),
		$rootScope.readyToFAQ = JSON.parse(localStorage.getItem('readyToFAQ')),
		// $rootScope.forumPost = localStorage.getItem('forumPost'),

		this.searchMSSQLData = function (dataSrc) {
            // var query = $rootScope.appCtrl.query? $rootScope.appCtrl.query:"*:*";
            // console.log("dataSrc:", JSON.stringify(dataSrc.query));
            var deferred = $q.defer();

		    $http({
                method: 'GET',
                //dataType: 'JSON',
                url: dataSrc.jspUrl + dataSrc.handler,
                params: { 
                    'table': dataSrc.table,
                    'queryname': dataSrc.queryname,
                    'query': encodeURI(JSON.stringify(dataSrc.query))
                }
            }).success(function(data, status, headers, config) {
                deferred.resolve(data);
		    }).error(function(data, status, headers, config) {
                deferred.reject(data);
		    });
            return deferred.promise;
        },

        this.insertMSSQLData = function (dataSrc) {
            // var query = $rootScope.appCtrl.query? $rootScope.appCtrl.query:"*:*";
            // console.log("dataSrc:", dataSrc.insert);
            // console.log(dataSrc.jspUrl + dataSrc.handler);
            var deferred = $q.defer();

            $http({
                method: 'GET',
                //dataType: 'JSON',
                url: dataSrc.jspUrl + dataSrc.handler,
                params: { 
                    'table': dataSrc.table,
                    'insertname': dataSrc.insertname,
                    'insert': dataSrc.insert//encodeURI(JSON.stringify(dataSrc.insert))
                }
            }).success(function(data, status, headers, config) {
                deferred.resolve(data);
            }).error(function(data, status, headers, config) {
                deferred.reject(data);
            });
            return deferred.promise;
        },

        this.updateMSSQLData = function (dataSrc) {
            // var query = $rootScope.appCtrl.query? $rootScope.appCtrl.query:"*:*";
            // console.log("dataSrc:", JSON.stringify(dataSrc));
            var deferred = $q.defer();

            $http({
                method: 'GET',
                //dataType: 'JSON',
                url: dataSrc.jspUrl + dataSrc.handler,
                params: { 
                    'table': dataSrc.table,
                    'updatename': dataSrc.updatename,
                    'update': dataSrc.update,//encodeURI(JSON.stringify(dataSrc.update)),
                    'query': dataSrc.query//encodeURI(JSON.stringify(dataSrc.query))
                }
            }).success(function(data, status, headers, config) {
                deferred.resolve(data);
            }).error(function(data, status, headers, config) {
                deferred.reject(data);
            });
            return deferred;
        },

        this.deleteMSSQLData = function (dataSrc) {
            // var query = $rootScope.appCtrl.query? $rootScope.appCtrl.query:"*:*";
            // console.log("dataSrc:", JSON.stringify(dataSrc.query));
            var deferred = $q.defer();

            $http({
                method: 'GET',
                //dataType: 'JSON',
                url: dataSrc.jspUrl + dataSrc.handler,
                params: { 
                    'table': dataSrc.table,
                    'query': dataSrc.query//encodeURI(JSON.stringify(dataSrc.query))
                }
            }).success(function(data, status, headers, config) {
                deferred.resolve(data);
            }).error(function(data, status, headers, config) {
                deferred.reject(data);
            });
            return deferred.promise;
        },

        this.applyInsert = function (url, jsonData){
            // console.log("URL: " + url + "\nCommand: " + jsonData);
            // console.log(JSON.parse(jsonData));
            var xmlhttp = getXMLHttpObject();   
            // console.log(xmlhttp);
            xmlhttp.onreadystatechange=function(){
                if (xmlhttp.readyState == 4) {
                    if(xmlhttp.status == 200 && xmlhttp.responseText.trim() !== "null"){
	        			toaster.pop('note', "", "更新成功!!", 3000);
	        			return 'Success';
                    }
                        // alert('已更新資料！\n' + xmlhttp.responseText);
                    else{
	        			toaster.pop('error', "", "更新失敗!!", 3000);
                        return 'Fail';
                    }
                        // alert('update result: '+xmlhttp.status+'  '+xmlhttp.responseText);
                }
            }       

            // url += '?table=0&insertname=Insert&insert=' + encodeURI(encodeURI(jsonData));
            url += '?table=0&insertname=Insert&insert=' + encodeURIComponent(encodeURIComponent(jsonData));
            // console.log(url);
            xmlhttp.open('POST', url, true);
            // xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.setRequestHeader("Content-type", "text/html; charset=UTF-8");
            xmlhttp.send();

            return 'Success';
        },

		this.formatBytes = function (bytes) {
		    if(bytes < 1024) return bytes + " Bytes";
		    else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KB";
		    else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MB";
		    else return(bytes / 1073741824).toFixed(3) + " GB";
		};

        function getXMLHttpObject (){
            var xmlhttp;
            if (window.XMLHttpRequest){
                xmlhttp = new XMLHttpRequest();
            }
            else{
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            return xmlhttp;
        };

        //VM LocalTime Set To YYYY-MM-DD HH:mm:ss
        this.SetTimeToSQL = function(time){
            return  [time.getFullYear(), time.getMonth()+1, time.getDate()].join('-')+' '+
                    [time.getHours(), time.getMinutes(), time.getSeconds()].join(':');
        };

        //VM LocalTime Set To YYYY/MM/DD
        this.SetDateToSort = function(time){
            return  [time.getFullYear(), time.getMonth()+1 < 10 ? ("0" + (time.getMonth()+1)) : time.getMonth()+1, time.getDate() < 10 ? ("0" + time.getDate()) : time.getDate()].join('-');
        };

		function definedTypeOf (defined) {
            return typeof defined == 'undefined' ? true : false;
        };

        this.DeleteAdditionalKey = function(data){
			for (var i in data){
        		for (var j in data[i]) {
        			switch(j){
        				case 'B_Class'    : delete data[i]['B_Class'];     break;
        				case 'B_ClassLock': delete data[i]['B_ClassLock']; break;
        				case 'F_HasChange': delete data[i]['F_HasChange']; break;
        				case '_version_'  : delete data[i]['_version_'];   break;
        				case 'timestamp'  : delete data[i]['timestamp'];   break;
        				case '$$hashKey'  : delete data[i]['$$hashKey'];   break;
        			}
        		}
        	}
        	return data;
        };

        // Only use in MasterPage and Setting
        this.SearchFromDatePicker = function(from, to, filterStores, oriStores, dateKey){
        	from = definedTypeOf(from)?0:new Date(from).getTime();
        	to = definedTypeOf(to)?9999999999999:new Date(to).getTime();
            filterStores = [];
        	for(var i=0;i<oriStores.length;i++){
        		var time = new Date(ChangeDateType(oriStores[i][dateKey])).getTime();
        		// console.log(from, time, to);
        		if (from <= time && time <= to){
        			filterStores.push(oriStores[i]);
        		}
        	}
            return filterStores;
        };

        function ChangeDateType(date){
			var pattern=/(上午|下午)(\d+)/,
				k = date.match(pattern),
				time;
			if(date.match(/上午/g)){
				time = parseInt(k[0].replace(/上午/g,''));
			}
			if(date.match(/下午/g)){
				time = parseInt(k[0].replace(/下午/g,''))+12;
        	}
        	date = date.replace(/(上午|下午)(\d+)/g,time);

        	return date.replace(/(年|月|日 )/g,',');
        };

	})

	.controller('UpLoadCtrl', ['$scope', function ($scope) {

		$scope.UserID      = 'User1/';
		$scope.StroePath   = ''
		$scope.CurrentPath = $scope.StroePath + $scope.UserID;
		
	}])

	.controller('EditorCtrl', ['$scope', '$http', function ($scope, $http) {

		$scope.SaveEditor = function() {
			console.log(angular.element(document.querySelector('.note-editable')).html());
		};

	}])

	.controller('LoginPageCtrl', ['$scope', '$rootScope', '$location', 'Session', 'forumService', 'AuthService', 'AUTH_EVENTS', 'toaster', 
		function ($scope, $rootScope, $location, Session, forumService, AuthService, AUTH_EVENTS, toaster) {

			//預設為Guest
			// Session.create('Guest', '訪客', 'Guest');
			// forumService.changePermissions();

			// $scope.ChangePermissions = function(id, name, Permissions) {
			// 	Session.create(id, name, Permissions);
			// 	forumService.changePermissions();
			// };

			$scope.credentials = {
				U_ID: $rootScope.UserInfo == null ? '' : $rootScope.UserInfo.U_ID,
	            U_PW: $rootScope.UserInfo == null ? '' : $rootScope.UserInfo.U_PW
			};
			$scope.login = function (credentials) {
				// console.log('credentials:',credentials);
				// console.log('UserInfo:',$rootScope.UserInfo);

				if(credentials != null && $rootScope.UserInfo == null){
					//如果是訪客
					if(credentials.U_ID == ''){
				    	if (!$.root_.hasClass("menu-on-top")){
							$('html').toggleClass("hidden-menu-mobile-lock");
							$.root_.toggleClass("hidden-menu");
							$.root_.removeClass("minified");
				    	} else if ( $.root_.hasClass("menu-on-top") && $.root_.hasClass("mobile-view-activated") ) {
				    		$('html').toggleClass("hidden-menu-mobile-lock");
							$.root_.toggleClass("hidden-menu");
							$.root_.removeClass("minified");
				    	}
					}else{
						AuthService.login(credentials).then(function (user) {
			                // console.log("user:",user);
			                if(user.selectObject.length > 0){
			                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
			                    localStorage.setItem('loginStatus', JSON.stringify({
			                        U_ID        : user.selectObject[0].U_ID,
			                        U_Name      : user.selectObject[0].U_Name, 
			                        U_Department: user.selectObject[0].U_Department, 
			                        U_PW        : user.selectObject[0].U_PW, 
			                        U_Role      : user.selectObject[0].U_Role, 
			                        U_CK_TIME   : user.selectObject[0].U_CK_TIME,
		                            U_CR_TIME   : user.selectObject[0].U_CR_TIME,
		                            U_Check     : user.selectObject[0].U_Check 
			                    }));
			                    $rootScope.UserInfo = [JSON.parse(localStorage.getItem('loginStatus'))];
			                    // console.log("UserInfo:",$scope.UserInfo);
			                    // $scope.$watch("UserInfo",function (newValue, oldValue){
			                    //     console.log("value:", newValue, oldValue);
			                    // },true);
			                    // $location.path('/MasterPage');
			                    // toaster.pop('success', "", "登入成功", 3000);
			                    // location.href='/KLG/#/VM10';
			                }
			            }, function () {
			            	toaster.pop('error', "", "登入失敗", 3000);
			                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
			            });
					}
				}
	        };

			$scope.signupORforgotpw = '';
			$scope.clickSF = function(which){
				// console.log(which=='註冊');
				switch (which) {
	                case '註冊':
	                    return $scope.signupORforgotpw = true;
	                break;
	                case '忘記密碼':
	                    return $scope.signupORforgotpw = false;
	                break;
	            }
			};

			$scope.SendMail = function(userEmail){
				console.log(userEmail);
			};
		}
	])

	.controller('RegisterController', ["$scope", "$rootScope", "$location", "AUTH_EVENTS", "AuthService", "USER_ROLES", 'forumService',
        function ($scope, $rootScope, $location, AUTH_EVENTS, AuthService, USER_ROLES, forumService) {
            var d = new Date();
            $scope.registers = {
            	U_ID          : '',
                U_Role        : USER_ROLES.user,
                U_Name        : '',
                U_PW          : '',
                U_Department  : '',
                U_CR_TIME     : forumService.SetTimeToSQL(d),
                //U_CK_TIME     : null,
                U_Check       : 0
            };

            $scope.register = function (registers) {
                $scope.show = {
                    Success:{
                        bool: false,
                        Messages: ''
                    },
                    Error:{
                        bool: false,
                        Messages: ''
                    }
                };

                // console.log("registers:",registers);
                var emailRegxp = /^([\w]+)(.[\w]+)*$/;
                var passwordRegxp = /^.*(?=.{6,12})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/;
                if(registers.U_Name == '' || registers.U_Password == '' || registers.U_Mail == '' || registers.U_Department == null){
                	$scope.show['Error'].bool = true;
                	$scope.show['Error'].Messages = '註冊資料尚有錯誤或輸入不完整';
                }else if(passwordRegxp.test(registers.U_Password) != true){
                	$scope.show['Error'].bool = true;
                	$scope.show['Error'].Messages = '密碼長度需6~12英數大小寫特殊符號數字混合';
                }else if(emailRegxp.test(registers.U_Mail) != true){
                	$scope.show['Error'].bool = true;
                	$scope.show['Error'].Messages = '信箱資料格式不正確';
                }else{
                	// registers.U_ID = registers.U_Name.replace(/\s/g,"") +'_'+registers.U_Password+'_'+registers.U_PublishTime;

                    var 確認信箱重複否 = {
                        active: true,
                        title: "Login",
                        jspUrl: "jsp/",
                        handler: "DBSelect.jsp",
                        addr: $rootScope._URL,
                        queryname: 'SelectAllUserInfo',
                        query: {
                            U_ID : registers.U_ID
                        }
                    };
                    var promise = forumService.searchSolrData(確認信箱重複否);
                    promise.then(function(res) {
                        if(res.response.numFound > 0){
                            $scope.show['Error'].bool = true;
                            $scope.show['Error'].Messages = '此信箱已有人註冊';
                            console.log('註冊失敗');
                        }else{
                            if(AuthService.register(registers) == 'success'){
                                $scope.show['Error'].bool = false;
                                $scope.show['Success'].bool = true;
                                $scope.show['Success'].Messages = '註冊成功 等待管理員確認名單';
                                console.log('註冊成功');
                                // $location.path('/pages/signin');
                            }else{
                                console.log('註冊失敗');
                            }
                            
                        }
                    }, function(data) {
                        return 'fail';
                    });
                }
                
            };
        }
    ])

	.controller('HeaderCtrl', ['$scope', '$rootScope', 'Session', 'forumService', '$modal', 'AuthService', 'AUTH_EVENTS', 'toaster', function ($scope, $rootScope, Session, forumService, $modal, AuthService, AUTH_EVENTS, toaster) {
		$scope.logout = function(){
			Session.destroy();
		};

		$scope.openLogin = function(data) {
            var modalInstance;
            modalInstance = $modal.open({
                templateUrl: "login.html",
                controller: "myModalOpenLoginCtrl",
                size: 'sm',
                resolve: {
                    items: function() {
                        return data
                    }
                }
            }), modalInstance.result.then(function(credentials) {
            	// console.log(credentials);
                AuthService.login(credentials).then(function (user) {
	                // console.log("user:",user);
	                if(user.selectObject.length > 0){
	                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
	                    localStorage.setItem('loginStatus', JSON.stringify({
	                        U_ID        : user.selectObject[0].U_ID,
	                        U_Name      : user.selectObject[0].U_Name, 
	                        U_Department: user.selectObject[0].U_Department, 
	                        U_PW        : user.selectObject[0].U_PW, 
	                        U_Role      : user.selectObject[0].U_Role, 
	                        U_CK_TIME   : user.selectObject[0].U_CK_TIME,
                            U_CR_TIME   : user.selectObject[0].U_CR_TIME,
                            U_Check     : user.selectObject[0].U_Check 
	                    }));
	                    $rootScope.UserInfo = [JSON.parse(localStorage.getItem('loginStatus'))];
	                    // console.log("UserInfo:",$scope.UserInfo);
	                    // $scope.$watch("UserInfo",function (newValue, oldValue){
	                    //     console.log("value:", newValue, oldValue);
	                    // },true);
	                    // $location.path('/MasterPage');
	                    // toaster.pop('success', "", "登入成功", 3000);
	                    // location.href='/KLG/#/VM10';
	                    location.reload();
	                }
	            }, function () {
	            	toaster.pop('error', "", "登入失敗", 3000);
	                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
	            });
            }, function() {
                // $log.info("Modal dismissed at: " + new Date)
            })
        };

        $scope.openRegister = function(data) {
            var modalInstance;
            modalInstance = $modal.open({
                templateUrl: "register.html",
                controller: "myModalOpenRegisterCtrl",
                size: 'sm',
                resolve: {
                    items: function() {
                        return data
                    }
                }
            }), modalInstance.result.then(function(registers) {
            	// console.log(registers);　
            	toaster.pop('success', "", "註冊成功，等待管理員確認名單", 3000);

                
            }, function() {
                // $log.info("Modal dismissed at: " + new Date)
            })
        };
	}])

	.controller("myModalOpenLoginCtrl", ["$scope", "$modalInstance", "items",
        function($scope, $modalInstance, items) {
            $scope.credentials = items, 
            // $scope.selected = {
            //     topic: "",
            //     content: ""
            // }, 
            $scope.ok = function() {
                $modalInstance.close($scope.credentials)
            }, $scope.cancel = function() {
                $modalInstance.dismiss("cancel")
            }
        }
    ])

    .controller("myModalOpenRegisterCtrl", ["$scope", "$rootScope", "$modalInstance", "items", "forumService", "AuthService",
        function($scope, $rootScope, $modalInstance, items, forumService, AuthService) {
            $scope.registers = items, 
            // $scope.selected = {
            //     topic: "",
            //     content: ""
            // }, 
            $scope.ok = function() {
            	$scope.show = {
                    Success:{
                        bool: false,
                        Messages: ''
                    },
                    Error:{
                        bool: false,
                        Messages: ''
                    }
                };

                //^.*(?=.{6,12})(?=.*(\d|[a-z]|[A-Z]|[@#$%^&+=])).*$
                var passwordRegxp = /^.*(?=.{6,12})(?=.*(\d|[a-z]|[A-Z]|[@#$%^&+=])).*$/;
                if($scope.registers.U_Name == '' || $scope.registers.U_PW == '' || $scope.registers.U_Department == ''){
                	$scope.show['Error'].bool = true;
                	$scope.show['Error'].Messages = '註冊資料尚有錯誤或輸入不完整';
                }else if(passwordRegxp.test($scope.registers.U_PW) != true){
                	$scope.show['Error'].bool = true;
                	$scope.show['Error'].Messages = '密碼長度需6-12(不含特殊符號)';
                }else{
                	var 確認帳號重複否 = {
	                    active: true,
	                    title: "Login",
	                    jspUrl: "jsp/",
	                    handler: "DBSelect.jsp",
	                    addr: $rootScope._URL,
	                    queryname: 'SelectAllUserInfo',
	                    query: {
	                        U_ID : $scope.registers.U_ID
	                    }
	                };
	                var promise = forumService.searchMSSQLData(確認帳號重複否);
	                promise.then(function(res) {
	                	// console.log(res);
	                    if(res.selectObject.length > 0){
	                        $scope.show['Error'].bool = true;
	                        $scope.show['Error'].Messages = '帳號已有人使用';
	                    }else{
	                    	// console.log($scope.registers);
	                        if(AuthService.register($scope.registers) == 'Success'){
	                            $scope.show['Error'].bool = false;
	                            // $scope.show['Success'].bool = true;
	                            // $scope.show['Success'].Messages = '註冊成功 等待管理員確認名單';
		            			$modalInstance.close($scope.registers)
	                            // $location.path('/pages/signin');
	                        }else{
	                            console.log('註冊失敗');
	                        }
	                        
	                    }
	                }, function(data) {
	                    return 'fail';
	                });
		        }
            }, $scope.cancel = function() {
                $modalInstance.dismiss("cancel")
            }
        }
    ])

	.controller('MasterPageCtrl', ['$scope', '$rootScope', '$location', '$http', '$filter', '$cookieStore', '$modal', 'forumService', 'toaster', function ($scope, $rootScope, $location, $http, $filter, $cookieStore, $modal, forumService, toaster) {

		$scope.loadBulletinData = function(department){
			var 公佈欄 = {
                title: "loadTotalCar",
                jspUrl: "jsp/",
                handler: "DBSelect.jsp",
                addr: $rootScope._URL,
                queryname: 'SelectBulletin',
                query:{
                    U_Department : department
                }
            };
            var promise = forumService.searchMSSQLData(公佈欄);
            promise.then(function(res) {
                // console.log('公佈欄:', res.selectObject);

                switch(department){
                    case '秘書科':
                        $scope.numFoundBSL = res.selectObject.length;
                    break;
                    case '勤務指揮中心':
                        $scope.numFoundBCL = res.selectObject.length;
                    break;
                    default:
                        // 知道選了目前選擇的單位
                        $scope.choseDepartment = department
                        $scope.numFoundBL = res.selectObject.length;
                    break;
                }

                if(res.selectObject.length == 0){
                    toaster.pop('warning', "", department + "查無任何公布欄資料", 3000);
                }else{
                    if(department == '秘書科'){
                        $scope.bulletinSecretaryData = [];
                        res.selectObject = PutTop5Type(res.selectObject);
                        for (var i in res.selectObject) {
                            if(res.selectObject[i].B_Top5Lock == 1){
                                $scope.bulletinSecretaryData.push(res.selectObject[i]);
                            }
                        }
                        for (var i in res.selectObject) {
                            if(res.selectObject[i].B_Top5Lock == 0){
                                $scope.bulletinSecretaryData.push(res.selectObject[i]);
                            }
                        }
                        $scope.searchData($scope.bulletinSecretaryData,"BulletinSecretary");
                    }else if(department == '勤務指揮中心'){
                        $scope.bulletinCommandData = [];
                        res.selectObject = PutTop5Type(res.selectObject);
                        for (var i in res.selectObject) {
                            if(res.selectObject[i].B_Top5Lock == 1){
                                $scope.bulletinCommandData.push(res.selectObject[i]);
                            }
                        }
                        for (var i in res.selectObject) {
                            if(res.selectObject[i].B_Top5Lock == 0){
                                $scope.bulletinCommandData.push(res.selectObject[i]);
                            }
                        }
                        $scope.searchData($scope.bulletinCommandData,"BulletinCommand");
                    }else{
                        $scope.bulletinData = [];
                        res.selectObject = PutTop5Type(res.selectObject);
                        for (var i in res.selectObject) {
                            if(res.selectObject[i].B_Top5Lock == 1){
                                $scope.bulletinData.push(res.selectObject[i]);
                            }
                        }
                        for (var i in res.selectObject) {
                            if(res.selectObject[i].B_Top5Lock == 0){
                                $scope.bulletinData.push(res.selectObject[i]);
                            }
                        }
                        $scope.searchData($scope.bulletinData,"Bulletin");
                    }
                    // console.log($scope.bulletinData);
                    // $scope.vm10Data = res.selectObject;
                };
            }, function(data) {
                return console.log('讀取公布欄資料Failed');
            });
		};

        $scope.loadDepartment = function(){

            var 搜尋部門單位 = {
                title: "UserInfo",
                jspUrl: "jsp/",
                handler: "DBSelect.jsp",
                addr: $rootScope._URL,
                queryname: 'SelectAllDepartmentWithout0'
            };
            var promise = forumService.searchMSSQLData(搜尋部門單位);
            promise.then(function(res) {
                // console.log('搜尋部門單位:', res.selectObject);
                if(res.selectObject.length == 0){
                    toaster.pop('warning', "", "無任何部門單位相關資料", 3000);
                }else{
                    $scope.departmentData = [];
                    $scope.departmentDataForMenu = [];
                    $scope.numFoundOD = res.selectObject.length;
                    for (var i in res.selectObject) {
                        $scope.departmentData.push(res.selectObject[i].D_NAME);
                        if(res.selectObject[i].D_NAME != '秘書科' && res.selectObject[i].D_NAME != '勤務指揮中心'){
                            $scope.departmentDataForMenu.push(res.selectObject[i].D_NAME);
                        }
                    }
                };
            }, function(data) {
                return console.log('讀取所有UserInfo資料Failed');
            });

        };

		function PutTypeNameType (data){
			for (var i in data) {
                switch (data[i].F_TypeName) {
                    case "業務類":
                        data[i]['F_Class'] = 'bg-color-greenDark';
                        break;
                    case "系統類":
                        data[i]['F_Class'] = 'bg-color-redLight';
                        break;
                    case "其它類":
                        data[i]['F_Class'] = 'bg-color-orangeDark';
                        break;
                }
            };
            return data;
		};

		function SuccessOrError(condition){
        	if(typeof condition == 'undefined' || condition == null || condition == ''  || isNaN(parseInt(condition))){
        		return true;
        	}else{
        		return false;
        	}
        };

        function PutTop5Type (data) {
        	for (var i in data) {
                switch (data[i].B_Top5Lock) {
                    case 1:
                        data[i]['B_Class'] = 'info';
                        data[i]['B_ClassLock'] = 'glyphicon glyphicon-lock';
                        break;
                }
            };
            return data;
        };

        $scope.ChangeTop5Lock = function($index) {
        	$scope.bulletinData[$index].B_Top5Lock = !$scope.bulletinData[$index].B_Top5Lock;
            // 表示被更改
            $scope.bulletinData[$index]['F_HasChange'] = true;
        };

        $scope.ChangeTop5LockForSecretary = function($index) {
            $scope.bulletinSecretaryData[$index].B_Top5Lock = !$scope.bulletinSecretaryData[$index].B_Top5Lock;
            // 表示被更改
            $scope.bulletinSecretaryData[$index]['F_HasChange'] = true;
        };

        $scope.ChangeTop5LockForCommand = function($index) {
            $scope.bulletinCommandData[$index].B_Top5Lock = !$scope.bulletinCommandData[$index].B_Top5Lock;
            // 表示被更改
            $scope.bulletinCommandData[$index]['F_HasChange'] = true;
        };

        $scope.SetOnTop5 = function(bulletinData) {

            var onlyChangeBulletinUpdate = [];
            for (var i in bulletinData){
                for (var j in bulletinData[i]) {
                    if (j == 'F_HasChange') {
                        onlyChangeBulletinUpdate.push(bulletinData[i]);
                    }
                }
            }

        	onlyChangeBulletinUpdate = forumService.DeleteAdditionalKey(onlyChangeBulletinUpdate);

            // console.log(onlyChangeBulletinUpdate);
            for(var i in onlyChangeBulletinUpdate){

                delete onlyChangeBulletinUpdate[i]['U_Department'];
                onlyChangeBulletinUpdate[i].B_Top5Lock = onlyChangeBulletinUpdate[i].B_Top5Lock == true ? 1 : 0 ;
                // console.log(onlyChangeBulletinUpdate[i]);
                var d = new Date();
                var update帳號管理 = {
                    active: true,
                    title: "帳號管理",
                    jspUrl: "jsp/",
                    handler: "DBUpdate.jsp",
                    addr: $rootScope._URL,
                    table: 1,
                    updatename: 'Update',
                    update: {
                        B_Top5Lock : onlyChangeBulletinUpdate[i].B_Top5Lock
                    },
                    query: {
                        B_ID : onlyChangeBulletinUpdate[i].B_ID
                    }
                };
                var promise = forumService.updateMSSQLData(update帳號管理);
                promise.promise.then(function(res) {
                    // console.log(res);
                    if(res.trim() == "Success"){
                        // console.log("更新成功");
                        toaster.pop('success', "", "更新成功", 3000);
                        if($scope.UserInfo.U_Department == '系統管理'){
                            $scope.loadBulletinData();
                        }else{
                            $scope.loadBulletinData($scope.UserInfo.U_Department);
                        }
                        promise.reject();
                    }else{
                        // console.log("更新失敗");
                        toaster.pop('danger', "", "更新失敗", 3000);
                        promise.resolve();
                    }
                }, function(data) {
                    // console.log("更新失敗");
                    promise.resolve();
                    // return 'Fail';
                    toaster.pop('danger', "", "更新失敗", 3000);
                });
            }
        };

        $scope.whichTab = {
            name : '各單位公告',
            tab  : 'tab1'
        };
        $scope.changeTab = function (name, tabs) { 
            $scope.whichTab.name = name;
            $scope.whichTab.tab = tabs;
        };

		$scope.filteredBoardStores = [];
        $scope.searchKeywords = {
            B_PublishD   : '',
            U_Department : '',
            B_Topic      : '',
            B_User       : ''
        };
        $scope.filteredBoardSecretaryStores = [];
        $scope.searchSecretaryKeywords = {
            B_PublishD   : '',
            B_Topic      : '',
        };
        $scope.filteredBoardCommandStores = [];
        $scope.searchCommandKeywords = {
            B_PublishD   : '',
            B_Topic      : '',
        };
		$scope.searchData = function(data, module) {
            switch (module) {
                case "Bulletin":
                    $scope.searchKeywords.B_PublishD = $scope.searchKeywords.B_PublishD == null || $scope.searchKeywords.B_PublishD == '' ? '' : forumService.SetDateToSort(new Date($scope.searchKeywords.B_PublishD));
                    $scope.searchKeywords.U_Department = $scope.searchKeywords.U_Department == null ? '' : $scope.searchKeywords.U_Department;
                    // console.log($scope.searchKeywords.B_PublishD);
                    return $scope.filteredBoardStores = $filter("filter")(data, $scope.searchKeywords), $scope.onFilterChange();
                break;
                case "BulletinSecretary":
                    $scope.searchSecretaryKeywords.B_PublishD = $scope.searchSecretaryKeywords.B_PublishD == null || $scope.searchSecretaryKeywords.B_PublishD == '' ? '' : forumService.SetDateToSort(new Date($scope.searchSecretaryKeywords.B_PublishD));
                    return $scope.filteredBoardSecretaryStores = $filter("filter")(data, $scope.searchSecretaryKeywords), $scope.onFilterSecretaryChange();
                break;
                case "BulletinCommand":
                    $scope.searchCommandKeywords.B_PublishD = $scope.searchCommandKeywords.B_PublishD == null || $scope.searchCommandKeywords.B_PublishD == '' ? '' : forumService.SetDateToSort(new Date($scope.searchCommandKeywords.B_PublishD));
                    return $scope.filteredBoardCommandStores = $filter("filter")(data, $scope.searchCommandKeywords), $scope.onFilterCommandChange();
                break;
            }
        };

        $scope.postNewsOnBoard = function() {
            var modalInstance;
            modalInstance = $modal.open({
                templateUrl: "NewsBoard.html",
                controller: "myModalBoardCtrl",
                size: 'lg',
                resolve: {
                    items: function() {
                        // return $scope.CommunityData
                    }
                }
            }), modalInstance.result.then(function(selected) {
                // $scope.selected = selectedItem;

				// console.log(selected);
                var d = new Date();
                var boardData = {
                	// B_ID         : selected.name+'_'+selected.topic.replace(/\s/g,"")+'_'+d.getTime(),//selected.id, 
                	B_PublishDT  : forumService.SetTimeToSQL(d),
                    B_PublishD   : forumService.SetTimeToSQL(d),
                	// B_PublishTime: d.getTime(),
                	B_Topic      : selected.topic, 
                	B_Content    : selected.content, 
                    B_Files      : selected.files, 
					B_User       : selected.name,
					B_Top5Lock   : 0
				};

				var insert新增佈告欄 = {
                    active: true,
                    title: "新增佈告欄",
                    jspUrl: "jsp/",
                    handler: "DBInsert.jsp",
                    addr: $rootScope._URL,
                    table: 1,
                    insertname: 'Insert',
                    insert: {
                        B_PublishDT  : boardData.B_PublishDT,
                        B_PublishD   : boardData.B_PublishD,
                        B_Topic      : boardData.B_Topic,
                        B_Content    : boardData.B_Content,
                        B_Files      : boardData.B_Files,
                        B_User       : boardData.B_User,
                        B_Top5Lock   : boardData.B_Top5Lock
                    }
                };
                var promise = forumService.insertMSSQLData(insert新增佈告欄);
                promise.then(function(res) {
                    toaster.pop('success', "", "新增成功", 3000);
                    // location.reload();
                    if($scope.UserInfo.U_Department == '系統'){
                        $scope.loadBulletinData();
                    }else{
                        $scope.loadBulletinData($scope.UserInfo.U_Department);
                    }
                }, function(data) {
                    // return 'Fail';
                    toaster.pop('danger', "", "新增失敗", 3000);
                });

                // $scope.新增佈告欄 = {
                //     solrUrl: "jsp/",
                //     handler: "update.jsp",
                //     core: "BoardInfo",
                //     data: $scope.boardData
                // };
                // forumService.applySolrUpdate($scope.新增佈告欄.solrUrl + $scope.新增佈告欄.handler + "?core=" + $scope.新增佈告欄.core, JSON.stringify($scope.新增佈告欄.data));
                
                $scope.board = [];
				// $scope.loadBoardData();
            }, function() {
                // $log.info("Modal dismissed at: " + new Date)
            })
        };

        $scope.openNewsOnBoard = function(data) {
            var modalInstance;
            modalInstance = $modal.open({
                templateUrl: "openNews.html",
                controller: "myModalOpenNewsCtrl",
                size: 'lg',
                resolve: {
                    items: function() {
                        return data
                    }
                }
            }), modalInstance.result.then(function(selected) {
                // $scope.selected = selectedItem;
            }, function() {
                // $log.info("Modal dismissed at: " + new Date)
            })
        };

        $scope.editorData = function (editordata, which) {
            switch(which){
                case '公佈欄':
                    editorDataModal(editordata, which);
                break;
            }
        };

        function editorDataModal (editordata, which) {
            var modalInstance;
            modalInstance = $modal.open({
                templateUrl: "editorBulletin.html",
                controller: "editorDataCtrl",
                size: "lg",
                resolve: {
                    items: function() {
                        return editordata
                    }
                }
            }), modalInstance.result.then(function(selected) {

                // console.log(selected);

                var update公佈欄 = {
                    active: true,
                    title: "帳號管理",
                    jspUrl: "jsp/",
                    handler: "DBUpdate.jsp",
                    addr: $rootScope._URL,
                    table: 1,
                    updatename: 'Update',
                    update: {
                        B_Topic   : selected.B_Topic,
                        B_Content : selected.B_Content,
                        B_Files   : selected.B_Files
                    },
                    query: {
                        B_ID : selected.B_ID
                    }
                };
                var promise = forumService.updateMSSQLData(update公佈欄);
                promise.promise.then(function(res) {
                    // console.log(res);
                    if(res.trim() == "Success"){
                        // console.log("更新成功");
                        toaster.pop('success', "", "更新成功", 3000);
                        if($scope.UserInfo.U_Department == '系統'){
                            $scope.loadBulletinData();
                        }else{
                            $scope.loadBulletinData($scope.UserInfo.U_Department);
                        }
                        promise.reject();
                    }else{
                        // console.log("更新失敗");
                        toaster.pop('danger', "", "更新失敗", 3000);
                        promise.resolve();
                    }
                }, function(data) {
                    // console.log("更新失敗");
                    promise.resolve();
                    // return 'Fail';
                    toaster.pop('danger', "", selected.B_Topic + "更新失敗", 3000);
                });
            }, function() {
                // $log.info("Modal dismissed at: " + new Date)
            })
        };

		$scope.deleteData = function (deletedata, which) {
			switch(which){
				case '公佈欄':
                    var delete公佈欄 = {
                        active: true,
                        title: "單位資料",
                        jspUrl: "jsp/",
                        handler: "DBDelete.jsp",
                        addr: $rootScope._URL,
                        table: 1,
                        query: {
                            B_ID : deletedata.B_ID
                        }
                    };
		            allrightDeleteDataModal(deletedata, delete公佈欄, '公佈欄');
		        break;
				case '問題列表':
					var 刪除問題列表項目 = {
		                solrUrl: "jsp/",
		                handler: "update.jsp",
		                core: "ForumInfo",
		                query: '+F_ID:'+deletedata.F_ID
		            };
		            allrightDeleteDataModal(deletedata, 刪除問題列表項目, '問題列表');
				break;
			}
		};

        function allrightDeleteDataModal (deletedata, AJAXparam, which) {
            var modalInstance;
            modalInstance = $modal.open({
                templateUrl: which+".html",
                controller: "allrightDeleteDataCtrl",
                size: "lg",
                resolve: {
                    items: function() {
                        return deletedata
                    }
                }
            }), modalInstance.result.then(function(selected) {

                var promise = forumService.deleteMSSQLData(AJAXparam);
                promise.then(function(res) {
                    if(res.trim() == "Success"){
                        console.log("刪除成功");
                        switch(which){
                            case '公佈欄':
                                // $scope.board = [];
                                if($scope.UserInfo.U_Department == '秘書科' || $scope.UserInfo.U_Department == '勤務指揮中心'){
                                    $scope.loadBulletinData($scope.UserInfo.U_Department);
                                }else{
                                    $scope.loadBulletinData();
                                }
                            break;
                            case '問題列表':
                                $scope.questionList = [];
                                $scope.loadQuestionList(($scope.currentPageQL-1)*10, 10, $scope.QLtime.search == true ? new Date($scope.QLtime.from).getTime() : '', $scope.QLtime.search == true ? new Date($scope.QLtime.to).getTime() : '');
                            break;
                        }
                    }else{
                        console.log("刪除失敗");
                    }
                    // toaster.pop('success', "", "新增成功", 3000);
                }, function(data) {
                    console.log("刪除失敗");
                    // return 'Fail';
                    // toaster.pop('danger', "", "新增失敗", 3000);
                });

            }, function() {
                // $log.info("Modal dismissed at: " + new Date)
            })
		};

		$scope.next_ForumTopic = function (caseType, bgClass, Introduction) {
			forumService.next_ForumTopic(caseType, bgClass, Introduction);
		};

		$scope.enter_ForumPost = function (forumTopicRelation, data) {
			forumService.next_ForumPost(forumTopicRelation, data);
		};

		$scope.enter_ForumPost_Widget = function (forumTopicRelation, data) {
			forumService.next_ForumPost(forumTopicRelation, data.totalData);
		};

		$scope.BLtime = {
			from  :   '',
			to    :   '',
			search: false
		};
		$scope.QLtime = {
			from  :   '',
			to    :   '',
			search: false
		};
		$scope.SearchFromDatePicker = function(from, to, which){
			// console.log($scope.filteredBoardStores,$scope.board);
			from = (typeof from == 'undefined') || isNaN(parseInt(from))?0:new Date(from).getTime();
        	to = (typeof to == 'undefined') || isNaN(parseInt(to))?9999999999999:new Date(to).getTime()+86400000;
        	switch(which){
        		case '公佈欄': 
        			$scope.BLtime.search = true;
        			$scope.filteredBoardStores = [];
		        	for(var i=0;i<$scope.board.length;i++){
		        		if(from < $scope.board[i].B_PublishTime && to > $scope.board[i].B_PublishTime){
		        			$scope.filteredBoardStores.push($scope.board[i]);
		        		}
		        	}
        		break;
        		case '問題列表': 
        			$scope.QLtime.search = true;
        			$scope.currentPageQL = 1;
        			$scope.questionList = [];
        			$scope.loadQuestionList(0, 10, from, to);
        		break;
        	}
        	
        	// $scope.filteredBoardStores = forumService.SearchFromDatePicker(from, to, $scope.filteredBoardStores, $scope.board, 'B_PublishDT');
        };

        $scope.ClearSearchFromDatePicker = function(from, to, which){
        	switch(which){
        		case '公佈欄':
        			$scope.BLtime = {
						from  :   '',
						to    :   '',
						search: false
					};
        			$scope.board = [];
        			$scope.loadBoardData();
        		break;
        		case '問題列表':
        			$scope.QLtime = {
						from  : '',
						to    : '',
						search: false
					};
					$scope.currentPageQL = 1;
        			$scope.questionList = [];
        			$scope.loadQuestionList(0, 10);
        		break;
        	}
        };

        $scope.SelectPage = function(currentPage, which){
        	switch(which){
        		case '公佈欄':
        			$scope.currentPageBL = currentPage;
        		break;
                case '局務會報資料':
                    $scope.currentPageBSL = currentPage;
                break;
                case '週報資料':
                    $scope.currentPageBCL = currentPage;
                break;
        		case '問題列表':
        			$scope.currentPageQL = currentPage;
        			$scope.questionList = [];
        			$scope.loadQuestionList((currentPage - 1) * 10, 10, $scope.QLtime.search == true ? new Date($scope.QLtime.from).getTime() : '', $scope.QLtime.search == true ? new Date($scope.QLtime.to).getTime() : '');
        		break;
        	}
		};

		return  $scope.disabled = 'disabled',
				$scope.currentPageBL = 1,
                $scope.currentPageBSL = 1,
                $scope.currentPageBCL = 1,
				$scope.currentPageQL = 1,
				$scope.numFoundBL = 0,
				$scope.numFoundQL = 0,
				$scope.totalPageQL = 0,
				$scope.onFilterChange = function() {
		            return $scope.currentPageBL = 1, $scope.totalPage = $scope.filteredBoardStores.length / 10;
		        },
                $scope.onFilterSecretaryChange = function() {
                    return $scope.currentPageBSL = 1, $scope.totalSPage = $scope.filteredBoardSecretaryStores.length / 10;
                },
                $scope.onFilterCommandChange = function() {
                    return $scope.currentPageBCL = 1, $scope.totalCPage = $scope.filteredBoardCommandStores.length / 10;
                },
				$scope.previousPage = function (whichTab) {
					switch (whichTab) {
						case "公佈欄":
							$scope.currentPageBL -= 1; 
						break;
                        case "局務會報資料":
                            $scope.currentPageBSL -= 1; 
                        break;
                        case "週報資料":
                            $scope.currentPageBCL -= 1; 
                        break;
						case "問題列表": 
							$scope.currentPageQL -= 1; 
							$scope.questionList = [];
							$scope.loadQuestionList(($scope.currentPageQL - 1) * 10, 10);
						break;
					}
				},
				$scope.nextPage = function (whichTab) {
					switch (whichTab) {
						case "公佈欄":
							$scope.currentPageBL += 1; 
						break;
                        case "局務會報資料":
                            $scope.currentPageBSL += 1; 
                        break;
                        case "週報資料":
                            $scope.currentPageBCL += 1; 
                        break;
						case "問題列表": 
							$scope.currentPageQL += 1; 
							$scope.questionList = [];
							$scope.loadQuestionList(($scope.currentPageQL - 1) * 10, 10);
						break;
					}
				};

	}])

	.controller("myModalBoardCtrl", ["$scope", "$modalInstance", "items", "$timeout", "$q", "$upload",
        function($scope, $modalInstance, items, $timeout, $q, $upload) {
            // $scope.items = items, 
            $scope.alertMessage = "",
            $scope.selected = {
                topic: "",
                content: ""
            }, 

            $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
            $scope.attachments = [];
            $scope.progress = [];
            var d = new Date(),
                dt = d.getTime();
            $scope.topicAttachments = function($files) {
                if ($scope.upload && $scope.upload.length > 0) {
                    for (var i = 0; i < $scope.upload.length; i++) {
                        if ($scope.upload[i] != null) {
                            $scope.upload[i].abort();
                        }
                    }
                }
                $scope.uploading = true;
                $scope.upload = [];
                $scope.selectedFiles = [];
                $scope.dataUrls = [];
                $scope.uploadResult = [];
                $scope.selectedFiles = $files;
                $scope.attachments = [];

                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];
                    if(file.size > 25000000){
                        toaster.pop('warning', file.name, "檔案超過上傳檔案限制25MB", 3000);
                        $scope.uploading = false;
                        return;
                    }
                    $scope.attachments.push({name:dt+'_'+file.name, size:$scope.fileSize(file.size), url:'files/'});

                    var fileReader = new FileReader();
                    fileReader.readAsDataURL($files[i]);
                    if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
                        var loadFile = function(fileReader, index) {
                            fileReader.onload = function(e) {
                                $timeout(function() {
                                    console.log(e.target.result);
                                    $scope.dataUrls[index] = e.target.result;
                                });
                            }
                        }(fileReader, i);
                    }else{

                    }
                    $scope.progress[i] = 0;
                }
            },

            $scope.fileSize = function (filesize){
                return formatBytes(filesize)
            },

            $scope.hasUploader = function(index) {
                return $scope.upload[index] != null;
            },

            $scope.abort = function(index) {
                $scope.upload[index].abort(); 
                $scope.upload[index] = null;
            },

            $scope.StartUpload = function (index) {
                var deferred = $q.defer();

                $scope.upload[index] = $upload.upload({
                    url: $scope.uploadURL+'files' + '&' + 'datetime='+dt,
                    type: "POST",
                    // data: data
                    file: $scope.selectedFiles[index]
                });
                $scope.upload[index].then(function(response) {
                    // $timeout(function() {
                        // console.log(response.data);
                        $scope.uploadResult.push(response.data);
                        var countFalse = 0;
                        for(var i = 0;i<$scope.progress.length;i++){
                            // console.log(i,$scope.progress[i]);
                            if($scope.progress[i] != 100){
                                $scope.uploading = true;
                                // console.log(i, 'true');
                            }else{
                                countFalse++;
                                if(countFalse == $scope.progress.length){
                                    $scope.uploading = false;
                                    // console.log(countFalse, $scope.progress.length);
                                }
                            }
                        }
                        deferred.resolve();
                    // });
                }, function(response) {
                    if (response.status > 0) {
                        $scope.errorMsg = response.status + ': ' + response.data;
                        deferred.reject();
                    }
                }, function(evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });

                return deferred.promise;
            },

            $scope.appendAttachmentsToContent = function (content, attachments){
                $scope.finalContent = '';

                if(attachments.length > 0){ 
                    $scope.finalAttach = '<br><p><span style="background-color: rgb(251, 251, 251);">'+attachments.length+' 個附加檔案</p>';
                    $scope.attach = '';
                    for (var i = 0; i < attachments.length; i++) {
                        $scope.attach += '<li class="well well-sm padding-5"><span style="font-weight: 700;">'+attachments[i].name+'</span>&nbsp;<br>'+attachments[i].size+'&nbsp;<br><a style="-webkit-tap-highlight-color: rgba(169, 3, 41, 0.498039);" href="'+(attachments[i].url+'/'+attachments[i].name)+'" download>下載</a>'
                    };
                    $scope.ul = '<ul class="list-inline margin-top-10" style="background-color: rgb(251, 251, 251);">'+$scope.attach+'</ul>';
                    $scope.finalContent = content + $scope.finalAttach + $scope.ul;
                }else{
                    $scope.finalContent = content;
                }

                return $scope.finalContent;
            },

            $scope.attachmentsToContent = function (attachments){
                $scope.finalContent = '';

                if(attachments.length > 0){ 
                    $scope.finalAttach = '<br><p><span style="background-color: rgb(251, 251, 251);">'+attachments.length+' 個附加檔案</p>';
                    $scope.attach = '';
                    for (var i = 0; i < attachments.length; i++) {
                        $scope.attach += '<li class="well well-sm padding-5"><span style="font-weight: 700;">'+attachments[i].name+'</span>&nbsp;<br>'+attachments[i].size+'&nbsp;<br><a style="-webkit-tap-highlight-color: rgba(169, 3, 41, 0.498039);" href="'+(attachments[i].url+'/'+attachments[i].name)+'" download>下載</a>'
                    };
                    $scope.ul = '<ul class="list-inline margin-top-10" style="background-color: rgb(251, 251, 251);">'+$scope.attach+'</ul>';
                    $scope.finalContent = $scope.finalAttach + $scope.ul;
                }else{
                    $scope.finalContent = '';
                }

                return $scope.finalContent;
            },

            $scope.ok = function(topic, attachments, UserInfo) {
        		//console.log(topic, UserInfo);

                if(topic == '' || topic == null){
                    $scope.alertMessage = "尚未輸入標題";
                    // toaster.pop('warning', "", "尚未輸入標題", 3000);
                    return;
                }
                if($scope.uploading == false){
                    $scope.alertMessage = "檔案超過上傳檔案限制25MB";
                    // toaster.pop('warning', "", "檔案超過上傳檔案限制25MB", 3000);
                    return;
                }

                $scope.progress[index] = 0;
                if(typeof $scope.selectedFiles != 'undefined' && $scope.selectedFiles.length > 0){
                    for(var index=0;index<$scope.selectedFiles.length;index++){
                        // console.log('前有檔案',index);
                        var promise = $scope.StartUpload(index, $scope.selectedFiles.length);
                        promise.then(function(data) {
                            // console.log('upload success');
                            if($scope.uploading == false){
                                // console.log('有檔案',$scope.uploading,index);
                                // UpdateTopicForum(forumTopicRelation, Topic, attachments, UserInfo);
                                $scope.selected = {
                                    id: UserInfo.U_ID,
                                    name: UserInfo.U_Name,
                                    topic: topic,
                                    content: angular.element(document.querySelector('.note-editable')).html(),
                                    files: $scope.attachmentsToContent(attachments)
                                };
                                $modalInstance.close($scope.selected)
                            }
                        }, function(data) {
                            console.log('upload error');
                        });
                    }
                }else{
                    // console.log('無檔案');
                    // UpdateTopicForum(forumTopicRelation, Topic, attachments, UserInfo);
                    $scope.selected = {
                        id: UserInfo.U_ID,
                        name: UserInfo.U_Name,
                        topic: topic,
                        content: angular.element(document.querySelector('.note-editable')).html(),
                        files: $scope.attachmentsToContent(attachments)
                    };
                    $modalInstance.close($scope.selected)
                }
            }, 

            $scope.cancel = function() {
                $modalInstance.dismiss("cancel")
            }

            function formatBytes (bytes) {
                if(bytes < 1024) return bytes + " Bytes";
                else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KB";
                else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MB";
                else return(bytes / 1073741824).toFixed(3) + " GB";
            }
        }
    ])

    .controller("myModalOpenNewsCtrl", ["$scope", "$modalInstance", "items",
        function($scope, $modalInstance, items) {
            // console.log(items);
            $scope.openNewsData = items, 
            $scope.selected = {
                topic: "",
                content: ""
            }, 
            $scope.ok = function(topic) {
            	$scope.selected = {
	                topic: topic,
	                content: angular.element(document.querySelector('.note-editable')).html()
	            };
                $modalInstance.close($scope.selected)
            }, $scope.cancel = function() {
                $modalInstance.dismiss("cancel")
            }
        }
    ])

    .controller("allrightDeleteDataCtrl", ["$scope", "$modalInstance", "items",
        function($scope, $modalInstance, items) {
            $scope.items = items, 
            $scope.ok = function() {
                $modalInstance.close()
            }, $scope.cancel = function() {
                $modalInstance.dismiss("cancel")
            }
        }
    ])

    .controller("editorDataCtrl", ["$scope", "$modalInstance", "items", "$timeout", "$q", "$upload",
        function($scope, $modalInstance, items, $timeout, $q, $upload) {
            // $scope.items = items,
            $scope.alertMessage = "",
            $scope.selected = items, 

            $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
            $scope.attachments = [];
            $scope.progress = [];
            var d = new Date(),
                dt = d.getTime();
            $scope.topicAttachments = function($files) {
                if ($scope.upload && $scope.upload.length > 0) {
                    for (var i = 0; i < $scope.upload.length; i++) {
                        if ($scope.upload[i] != null) {
                            $scope.upload[i].abort();
                        }
                    }
                }
                $scope.uploading = true;
                $scope.upload = [];
                $scope.selectedFiles = [];
                $scope.dataUrls = [];
                $scope.uploadResult = [];
                $scope.selectedFiles = $files;
                $scope.attachments = [];

                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];
                    if(file.size > 25000000){
                        toaster.pop('warning', file.name, "檔案超過上傳檔案限制25MB", 3000);
                        $scope.uploading = false;
                        return;
                    }
                    $scope.attachments.push({name:dt+'_'+file.name, size:$scope.fileSize(file.size), url:'files/'});

                    var fileReader = new FileReader();
                    fileReader.readAsDataURL($files[i]);
                    if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
                        var loadFile = function(fileReader, index) {
                            fileReader.onload = function(e) {
                                $timeout(function() {
                                    console.log(e.target.result);
                                    $scope.dataUrls[index] = e.target.result;
                                });
                            }
                        }(fileReader, i);
                    }else{

                    }
                    $scope.progress[i] = 0;
                }
            },

            $scope.fileSize = function (filesize){
                return formatBytes(filesize)
            },

            $scope.hasUploader = function(index) {
                return $scope.upload[index] != null;
            },

            $scope.abort = function(index) {
                $scope.upload[index].abort(); 
                $scope.upload[index] = null;
            },

            $scope.StartUpload = function (index) {
                var deferred = $q.defer();

                $scope.upload[index] = $upload.upload({
                    url: $scope.uploadURL+'files' + '&' + 'datetime='+dt,
                    type: "POST",
                    // data: data
                    file: $scope.selectedFiles[index]
                });
                $scope.upload[index].then(function(response) {
                    // $timeout(function() {
                        // console.log(response.data);
                        $scope.uploadResult.push(response.data);
                        var countFalse = 0;
                        for(var i = 0;i<$scope.progress.length;i++){
                            // console.log(i,$scope.progress[i]);
                            if($scope.progress[i] != 100){
                                $scope.uploading = true;
                                // console.log(i, 'true');
                            }else{
                                countFalse++;
                                if(countFalse == $scope.progress.length){
                                    $scope.uploading = false;
                                    // console.log(countFalse, $scope.progress.length);
                                }
                            }
                        }
                        deferred.resolve();
                    // });
                }, function(response) {
                    if (response.status > 0) {
                        $scope.errorMsg = response.status + ': ' + response.data;
                        deferred.reject();
                    }
                }, function(evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });

                return deferred.promise;
            },

            $scope.appendAttachmentsToContent = function (content, attachments){
                $scope.finalContent = '';

                if(attachments.length > 0){ 
                    $scope.finalAttach = '<br><p><span style="background-color: rgb(251, 251, 251);">'+attachments.length+' 個附加檔案</p>';
                    $scope.attach = '';
                    for (var i = 0; i < attachments.length; i++) {
                        $scope.attach += '<li class="well well-sm padding-5"><span style="font-weight: 700;">'+attachments[i].name+'</span>&nbsp;<br>'+attachments[i].size+'&nbsp;<br><a style="-webkit-tap-highlight-color: rgba(169, 3, 41, 0.498039);" href="'+(attachments[i].url+'/'+attachments[i].name)+'" download>下載</a>'
                    };
                    $scope.ul = '<ul class="list-inline margin-top-10" style="background-color: rgb(251, 251, 251);">'+$scope.attach+'</ul>';
                    $scope.finalContent = content + $scope.finalAttach + $scope.ul;
                }else{
                    $scope.finalContent = content;
                }

                return $scope.finalContent;
            },

            $scope.attachmentsToContent = function (attachments){
                $scope.finalContent = '';

                if(attachments.length > 0){ 
                    $scope.finalAttach = '<br><p><span style="background-color: rgb(251, 251, 251);">'+attachments.length+' 個附加檔案</p>';
                    $scope.attach = '';
                    for (var i = 0; i < attachments.length; i++) {
                        $scope.attach += '<li class="well well-sm padding-5"><span style="font-weight: 700;">'+attachments[i].name+'</span>&nbsp;<br>'+attachments[i].size+'&nbsp;<br><a style="-webkit-tap-highlight-color: rgba(169, 3, 41, 0.498039);" href="'+(attachments[i].url+'/'+attachments[i].name)+'" download>下載</a>'
                    };
                    $scope.ul = '<ul class="list-inline margin-top-10" style="background-color: rgb(251, 251, 251);">'+$scope.attach+'</ul>';
                    $scope.finalContent = $scope.finalAttach + $scope.ul;
                }else{
                    $scope.finalContent = '';
                }

                return $scope.finalContent;
            },

            $scope.ok = function(topic, attachments, UserInfo) {
                //console.log(topic, UserInfo);

                if(topic == '' || topic == null){
                    $scope.alertMessage = "尚未輸入標題";
                    // toaster.pop('warning', "", "尚未輸入標題", 3000);
                    return;
                }
                if($scope.uploading == false){
                    $scope.alertMessage = "檔案超過上傳檔案限制25MB";
                    // toaster.pop('warning', "", "檔案超過上傳檔案限制25MB", 3000);
                    return;
                }

                $scope.progress[index] = 0;
                if(typeof $scope.selectedFiles != 'undefined' && $scope.selectedFiles.length > 0){
                    for(var index=0;index<$scope.selectedFiles.length;index++){
                        // console.log('前有檔案',index);
                        var promise = $scope.StartUpload(index, $scope.selectedFiles.length);
                        promise.then(function(data) {
                            // console.log('upload success');
                            if($scope.uploading == false){
                                // console.log('有檔案',$scope.uploading,index);
                                // UpdateTopicForum(forumTopicRelation, Topic, attachments, UserInfo);
                                //$scope.selected.B_Content = $scope.appendAttachmentsToContent(angular.element(document.querySelector('.note-editable')).html(), attachments);
                                $scope.selected.B_Content = angular.element(document.querySelector('.note-editable')).html();
                                $scope.selected.B_Files = $scope.attachmentsToContent(attachments);
                                $modalInstance.close($scope.selected)
                            }
                        }, function(data) {
                            console.log('upload error');
                        });
                    }
                }else{
                    // console.log('無檔案');
                    // UpdateTopicForum(forumTopicRelation, Topic, attachments, UserInfo);
                    $scope.selected.B_Content = angular.element(document.querySelector('.note-editable')).html();
                    $scope.selected.B_Files = $scope.attachmentsToContent(attachments);
                    $modalInstance.close($scope.selected)
                }
            },

            // $scope.ok = function() {
            //     $scope.items.B_Content = angular.element(document.querySelector('.note-editable')).html();
            //     $modalInstance.close($scope.items)
            // }, 
            $scope.cancel = function() {
                $modalInstance.dismiss("cancel")
            }

            function formatBytes (bytes) {
                if(bytes < 1024) return bytes + " Bytes";
                else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KB";
                else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MB";
                else return(bytes / 1073741824).toFixed(3) + " GB";
            }
        }
    ])

    .controller('SettingCtrl', ['$scope', '$rootScope', '$filter', '$modal', 'forumService', 'toaster', 'Session',
    	function ($scope, $rootScope, $filter, $modal, forumService, toaster, Session) {

			$scope.totalFAQ = []; // Total Forum Data

			$scope.filteredFAQStores = [];
			$scope.filteredReadyToFAQStores = [];
			// $scope.searchData = function(data, module) {
	  //           switch (module) {
	  //               case "FAQ":
	  //                   return $scope.filteredFAQStores = $filter("filter")(data, $scope.searchKeywords), $scope.onFilterChange();
	  //               break;
	  //               case "FAQList":
	  //                   return $scope.filteredReadyToFAQStores = $filter("filter")(data, $scope.searchKeywords), $scope.onFilterChange();
	  //               break;
	  //           }
	  //       };

	        $scope.loadAccount = function(start, rows, startTime, endTime){

                var 讀取所有UserInfo資料 = {
                    title: "UserInfo",
                    jspUrl: "jsp/",
                    handler: "DBSelect.jsp",
                    addr: $rootScope._URL,
                    queryname: 'SelectUserInfoFilterAAndG'
                };
                var promise = forumService.searchMSSQLData(讀取所有UserInfo資料);
                promise.then(function(res) {
                    // console.log('讀取所有UserInfo資料:', res.selectObject);
                    if(res.selectObject.length == 0){
                        toaster.pop('warning', "", "無任何使用者相關資料", 3000);
                    }else{
                        $scope.numFoundAC = res.selectObject.length;
                        $scope.allUserAccount = [];
                        for (var i in res.selectObject) {
                            $scope.allUserAccount.push(res.selectObject[i]);
                        }
                    };
                }, function(data) {
                    return console.log('讀取所有UserInfo資料Failed');
                });
	        };

	        $scope.ChangeCheck = function($index) {
	        	$scope.allUserAccount[$index].U_Check = !$scope.allUserAccount[$index].U_Check;
                // 表示被更改
	        	$scope.allUserAccount[$index]['F_HasChange'] = true;
	        };

	        $scope.AllowAcount = function(allUserAccount) {

	        	// for (var i in allUserAccount){
	        	// 	for (var j in allUserAccount[i]) {
	        	// 		if (allUserAccount[i]['U_Check'] == true) {
	        	// 			// console.log("encodeURI:",encodeURI(allUserAccount[i]['U_Name']+allUserAccount[i]['U_PublishDT'].replace(/\s/g,"").replace(/:/g,"_")));
	        	// 			forumService.applyCreateFolder($scope.createFolderPath+encodeURI(allUserAccount[i]['U_Name']+allUserAccount[i]['U_PublishDT'].replace(/\s/g,"").replace(/:/g,"_"))+'/')
	        	// 			break;
	        	// 		}
	        	// 	}
	        	// }

	        	// console.log(allUserAccount);
	        	var onlyChangeUserUpdateFAQ = [];
	        	for (var i in allUserAccount){
	        		for (var j in allUserAccount[i]) {
	        			if (j == 'F_HasChange') {
							onlyChangeUserUpdateFAQ.push(allUserAccount[i]);
	        			}
	        		}
	        	}

	        	onlyChangeUserUpdateFAQ = forumService.DeleteAdditionalKey(onlyChangeUserUpdateFAQ);

                for(var i in onlyChangeUserUpdateFAQ){

                    onlyChangeUserUpdateFAQ[i].U_Check = onlyChangeUserUpdateFAQ[i].U_Check == true ? 1 : 0 ;
                    // console.log(onlyChangeUserUpdateFAQ[i]);

                    var d = new Date();
                    var update帳號管理 = {
                        active: true,
                        title: "帳號管理",
                        jspUrl: "jsp/",
                        handler: "DBUpdate.jsp",
                        addr: $rootScope._URL,
                        table: 0,
                        updatename: 'Update',
                        update: {
                            U_Check   : onlyChangeUserUpdateFAQ[i].U_Check,
                            U_CK_TIME : forumService.SetTimeToSQL(d)
                        },
                        query: {
                            U_ID : onlyChangeUserUpdateFAQ[i].U_ID
                        }
                    };
                    var promise = forumService.updateMSSQLData(update帳號管理);
                    promise.promise.then(function(res) {
                        // console.log(res);
                        if(res.trim() == "Success"){
                            // console.log("更新成功");
                            toaster.pop('success', "", "更新成功", 3000);
                            promise.reject();
                        }else{
                            // console.log("更新失敗");
                            toaster.pop('danger', "", "更新失敗", 3000);
                            promise.resolve();
                        }
                    }, function(data) {
                        // console.log("更新失敗");
                        promise.resolve();
                        // return 'Fail';
                        toaster.pop('danger', "", onlyChangeUserUpdateFAQ[i].U_ID + "更新失敗", 3000);
                    });
                }

            };

	        function SuccessOrError(condition){
	        	if(typeof condition == 'undefined' || condition == null || condition == ''  || isNaN(parseInt(condition))){
	        		return true;
	        	}else{
	        		return false;
	        	}
	        };

	        $scope.loadBestFAQ = function(start, rows){
				$scope.最佳解 = {
		            active: true,
		            title: "ForumInfo",
		            solrUrl: "jsp/",
		            handler: "select.jsp",
		            targetHandler: "select",
		            core: "ForumInfo",
		            addr: $scope._URL,
		            query: '+F_FAQ:true +F_Floor:1',
		            sort: "F_PublishTime desc",
		            field: null,
		            start: start,
		            rows: rows
		        };
		        var promise = forumService.searchSolrData($scope.最佳解);
		        promise.then(function(data) {
		            BestFAQ(data);
		            // console.log(data);
		        }, function(data) {
		            console.log('BestFAQ error');
		        });
		        function BestFAQ (bestFAQ) {
		            // console.log("Data:",bestFAQ.response.numFound);
		            $scope.numFoundBF = bestFAQ.response.numFound;
		            for (var i in bestFAQ.response.docs) {
		                $scope.readyToFAQ.push(bestFAQ.response.docs[i]);
		            }
		            // $scope.searchData($scope.readyToFAQ,"FAQ");
		            $scope.totalPageBF = Math.ceil($scope.numFoundBF / 10);
		        };
			};

			$scope.readyToFAQ = [];	// Ready to the best FAQ, only floor = 1.
			$scope.loadReadyToFAQ = function(start, rows, startTime, endTime){
	        	var date;
				SuccessOrError(startTime)? (SuccessOrError(endTime)? date = '+F_PublishTime:[* TO *]': date = '+F_PublishTime:[* TO '+endTime+']') : SuccessOrError(endTime) ? date = '+F_PublishTime:['+startTime+' TO *]' : date = '+F_PublishTime:['+startTime+' TO '+endTime+']';
	        	
				$scope.選擇FAQ = {
		            active: true,
		            title: "ForumInfo",
		            solrUrl: "jsp/",
		            handler: "select.jsp",
		            targetHandler: "select",
		            core: "ForumInfo",
		            addr: $scope._URL,
		            query: '+F_Score:[0 10] +F_Floor:1 ' + date,
		            sort: "F_PublishTime desc",
		            field: null,
		            start: start,
		            rows: rows
		        };
		        var promise = forumService.searchSolrData($scope.選擇FAQ);
		        promise.then(function(data) {
		            ReadyToFAQ(data);
		            // console.log(data);
		        }, function(data) {
		            console.log('ForumTopicData error');
		        });
		        function ReadyToFAQ (readyToFAQ) {
		            // console.log("Data:",track);
		            $scope.numFoundRTB = readyToFAQ.response.numFound;
		            for (var i in readyToFAQ.response.docs) {
		            	$scope.totalFAQ.push(readyToFAQ.response.docs[i]);
		            	if(readyToFAQ.response.docs[i].F_Floor == 1){
		                	$scope.readyToFAQ.push(readyToFAQ.response.docs[i]);
		            	}
		            }
		            // $scope.searchData($scope.readyToFAQ,"FAQList");
		            // $scope.board = PutTop5Type($scope.board);
		            // $scope.searchData($scope.board,"Board");
		        };
			};

			$scope.ChoseBest = function($index){
				$scope.readyToFAQ[$index].F_FAQ = !$scope.readyToFAQ[$index].F_FAQ;
				$scope.readyToFAQ[$index]['F_HasChange'] = true;
			};

			$scope.BestFAQ = function(readyToFAQ, totalFAQ) {
	        	// console.log(board);
	        	var onlyChangeUserUpdateFAQ = [];
	        	for (var i in readyToFAQ){
	        		for (var j in readyToFAQ[i]) {
	        			if (j == 'F_HasChange') {
							for (var k in totalFAQ){
								if (totalFAQ[k]['F_ID'] == readyToFAQ[i]['F_ID']){
									totalFAQ[k].F_FAQ = readyToFAQ[i].F_FAQ;
									onlyChangeUserUpdateFAQ.push(totalFAQ[k]);
								}
							}
	        			}
	        		}
	        	}
	        	onlyChangeUserUpdateFAQ = forumService.DeleteAdditionalKey(onlyChangeUserUpdateFAQ);
	    		var BestFAQ = {
	                solrUrl: "jsp/",
	                handler: "update.jsp",
	                core: "ForumInfo",
	                data: onlyChangeUserUpdateFAQ
	            };
	            forumService.applySolrUpdate(BestFAQ.solrUrl + BestFAQ.handler + "?core=" + BestFAQ.core, JSON.stringify(BestFAQ.data));
	        };

	        $scope.loadDepartment = function(){

                var 搜尋部門單位 = {
                    title: "UserInfo",
                    jspUrl: "jsp/",
                    handler: "DBSelect.jsp",
                    addr: $rootScope._URL,
                    queryname: 'SelectAllDepartmentWithout0'
                };
                var promise = forumService.searchMSSQLData(搜尋部門單位);
                promise.then(function(res) {
                    // console.log('搜尋部門單位:', res.selectObject);
                    if(res.selectObject.length == 0){
                        toaster.pop('warning', "", "無任何使用者相關資料", 3000);
                    }else{
                        $scope.departmentData = [];
                        $scope.numFoundOD = res.selectObject.length;
                        for (var i in res.selectObject) {
                            $scope.departmentData.push(res.selectObject[i]);
                        }
                    };
                }, function(data) {
                    return console.log('讀取所有UserInfo資料Failed');
                });

			};

			$scope.mergeOUData = [];
			$scope.MergeOrganizationAndUnit = function(organizationData) {
				for(var i in organizationData){
					$scope.mergeOUData.push(organizationData[i].O_Organization + organizationData[i].O_Unit);
				}
			};

	        $scope.AddOrganization = function(unit) {
	        	// var d = new Date(),
	        	// 	organizationData = {
		        // 		O_ID: organization + '_' + unit + '_' + d.getTime(),
		        // 		O_Unit: unit,
		        // 		O_Organization: organization,
		        // 		O_PublishDT: d.toLocaleString(),
		        // 		O_PublishTime: d.getTime()
		        // 	};
	        	// var AddOrganization = {
	         //        solrUrl: "jsp/",
	         //        handler: "update.jsp",
	         //        core: "OrganizationInfo",
	         //        data: [organizationData]
	         //    };
	         //    forumService.applySolrUpdate(AddOrganization.solrUrl + AddOrganization.handler + "?core=" + AddOrganization.core, JSON.stringify(AddOrganization.data));
	        	// $scope.organizationData = [];
                var insert新增單位 = {
                    active: true,
                    title: "新增單位",
                    jspUrl: "jsp/",
                    handler: "DBInsert.jsp",
                    addr: $rootScope._URL,
                    table: 2,
                    insertname: 'Insert',
                    insert: {
                        D_ID    : $scope.departmentData[$scope.departmentData.length-1].D_ID + 1,
                        D_NAME  : unit
                    }
                };
                var promise = forumService.insertMSSQLData(insert新增單位);
                promise.then(function(res) {
                    // console.log(res);
                    toaster.pop('success', "", "新增成功", 3000);
                    // location.reload();
                    $scope.loadDepartment();
                }, function(data) {
                    // return 'Fail';
                    toaster.pop('danger', "", "新增失敗", 3000);
                });
	        };

	        $scope.openChangePW = function(data) {
	            var modalInstance;
	            modalInstance = $modal.open({
	                templateUrl: "ChangePW.html",
	                controller: "myModalOpenChangePW",
	                resolve: {
	                    items: function() {
	                        return data
	                    }
	                }
	            }), modalInstance.result.then(function(selected) {
                    // console.log(selected);
                    var d = new Date();
                    var 更改密碼 = {
                        active: true,
                        title: "更改密碼",
                        jspUrl: "jsp/",
                        handler: "DBUpdate.jsp",
                        addr: $rootScope._URL,
                        table: 0,
                        updatename: 'Update',
                        update: {
                            U_PW      : selected.U_Password,
                            U_Check   : 1
                        },
                        query: {
                            U_ID : selected.U_ID
                        }
                    };
                    var promise = forumService.updateMSSQLData(更改密碼);
                    promise.promise.then(function(res) {
                        // console.log(res);
                        if(res.trim() == "Success"){
                            // console.log("更新成功");
                            toaster.pop('success', "", "更新成功，重新登入", 3000);
                            Session.destroy();
                            promise.reject();
                        }else{
                            // console.log("更新失敗");
                            toaster.pop('danger', "", "更新失敗", 3000);
                            promise.resolve();
                        }
                    }, function(data) {
                        // console.log("更新失敗");
                        promise.resolve();
                        // return 'Fail';
                        toaster.pop('danger', "", "更新失敗", 3000);
                    });
	            }, function() {
	                // $log.info("Modal dismissed at: " + new Date)
	            })
	        };

	        $scope.ACtime = {
				from  :   '',
				to    :   '',
				search: false
			};
			$scope.FAQtime = {
				from  :   '',
				to    :   '',
				search: false
			};
	        $scope.SearchFromDatePicker = function(from, to, which){
	        	from = (typeof from == 'undefined') || isNaN(parseInt(from)) ?0:new Date(from).getTime();
	        	to = (typeof to == 'undefined') || isNaN(parseInt(to)) ?9999999999999:new Date(to).getTime()+86400000;
	        	switch(which){
	        		case '帳號': 
	        			$scope.ACtime.search = true;
	        			$scope.allUserAccount = [];
	        			$scope.loadAccount(0, 10, from, to);
	        		break;
	        		case 'FAQ列表': 
	        			$scope.FAQtime.search = true;
			        	$scope.filteredReadyToFAQStores = [];
						$scope.readyToFAQ = [];
						$scope.loadReadyToFAQ(0, 10, from, to);
			        	// for(var i=0;i<$scope.readyToFAQ.length;i++){
			        	// 	if(from < $scope.readyToFAQ[i].F_PublishTime && to > $scope.readyToFAQ[i].F_PublishTime){
			        	// 		$scope.filteredReadyToFAQStores.push($scope.readyToFAQ[i]);
			        	// 	}
			        	// }
	        		break;
	        	}
	        	// $scope.filteredReadyToFAQStores = forumService.SearchFromDatePicker(from, to, $scope.filteredReadyToFAQStores, $scope.readyToFAQ, 'F_PublishDT');
	        };

	        $scope.ClearSearchFromDatePicker = function(from, to, which){
	        	switch(which){
	        		case '帳號':
	        			$scope.ACtime = {
							from  :   '',
							to    :   '',
							search: false
						};
	        			$scope.allUserAccount = [];
	        			$scope.loadAccount(0, 10);
	        		break;
	        		case 'FAQ列表':
	        			$scope.FAQtime = {
							from  :   '',
							to    :   '',
							search: false
						};
						$scope.readyToFAQ = [];
						$scope.loadReadyToFAQ(0, 10);
	        		break;
	        	}
	        };

	        $scope.SelectPage = function(currentPage, which){
	        	switch(which){
	        		case '查詢':
						$scope.searchField = [];
						$scope.searchCondition = [];
						$scope.loadSearchCondition((currentPage-1)*10, 10);
						$scope.currentPage = currentPage;
	        		break;
	        		case '帳號':
                        $scope.ACcurrentPage = currentPage;
	        			// $scope.allUserAccount = [];
	        			// $scope.loadAccount((currentPage-1)*10, 10, $scope.ACtime.search == true ? new Date($scope.ACtime.from).getTime() : '', $scope.ACtime.search == true ? new Date($scope.ACtime.to).getTime() : '');
	        		break;
	        		case 'FAQ列表':
	        			$scope.readyToFAQ = [];
						$scope.loadReadyToFAQ((currentPage-1)*10, 10, $scope.FAQtime.search == true ? new Date($scope.FAQtime.from).getTime() : '', $scope.FAQtime.search == true ? new Date($scope.FAQtime.to).getTime() : '');
	        		break;
                    case '自訂部門單位':
                        $scope.ODcurrentPage = currentPage;
                    break;
	        	}
			};

			$scope.deleteData = function (deletedata, which) {
				switch(which){
					case '帳號':
                        var delete帳號 = {
                            active: true,
                            title: "帳號資料",
                            jspUrl: "jsp/",
                            handler: "DBDelete.jsp",
                            addr: $rootScope._URL,
                            table: 0,
                            query: {
                                U_ID : deletedata.U_ID
                            }
                        };
			            allrightDeleteDataModal(deletedata, delete帳號, '帳號');
					break;
					case '部門單位':
                        var delete單位 = {
                            active: true,
                            title: "單位資料",
                            jspUrl: "jsp/",
                            handler: "DBDelete.jsp",
                            addr: $rootScope._URL,
                            table: 2,
                            query: {
                                D_ID : deletedata.D_ID
                            }
                        };
			            allrightDeleteDataModal(deletedata, delete單位, '部門單位');
					break;
				}
			};

			$scope.sendEmail = function (data){
				// console.log(data);
			};

			function allrightDeleteDataModal (deletedata, AJAXparam, which) {
	            var modalInstance;
	            modalInstance = $modal.open({
	                templateUrl: which+".html",
	                controller: "allrightDeleteDataCtrl",
	                resolve: {
	                    items: function() {
	                        return deletedata
	                    }
	                }
	            }), modalInstance.result.then(function(selected) {

                    var promise = forumService.deleteMSSQLData(AJAXparam);
                    promise.then(function(res) {
                        if(res.trim() == "Success"){
                            console.log("刪除成功");
                            switch(which){
                                case '帳號':
                                    // $scope.allUserAccount = [];
                                    $scope.loadAccount(0, 10);
                                break;
                                case '部門單位':
                                    // $scope.organizationData = [];
                                    $scope.loadDepartment();
                                break;
                            }
                        }else{
                            console.log("刪除失敗");
                        }
                        // toaster.pop('success', "", "新增成功", 3000);
                    }, function(data) {
                        console.log("刪除失敗");
                        // return 'Fail';
                        // toaster.pop('danger', "", "新增失敗", 3000);
                    });
			        
	            }, function() {
	                // $log.info("Modal dismissed at: " + new Date)
	            })
			};

			$scope.enter_ForumPost = function (forumTopicRelation, data) {
				forumService.next_ForumPost(forumTopicRelation, data);
			};

			$scope.countStar = function (star){
				var countStar = [];
				for(var i=1;i<=star;i++){
					countStar.push(i);
				};
				return countStar;
			};

			$scope.previousPageFAQ = function () {
				$scope.BFcurrentPage -= 1; 
				$scope.readyToFAQ = [];
				$scope.loadBestFAQ(($scope.BFcurrentPage - 1) * 10, 10);
			},
			$scope.nextPageFAQ = function () {
				$scope.BFcurrentPage += 1; 
				$scope.readyToFAQ = [];
				$scope.loadBestFAQ(($scope.BFcurrentPage - 1) * 10, 10);
			};

			return  $scope.searchKeywords = "",
					$scope.disabled = 'disabled',
					$scope.currentPage = 1,
					$scope.ACcurrentPage = 1,
					$scope.BFcurrentPage = 1,
					$scope.RTBcurrentPage = 1,
					$scope.SCcurrentPage = 1,
					$scope.ODcurrentPage = 1,
					$scope.numFoundAC = 0,
					$scope.numFoundBF = 0,
					$scope.numFoundRTB = 0,
					$scope.numFoundSC = 0,
					$scope.numFoundOD = 0,
					$scope.totalPageBF = 0,
					$scope.maxSize = 3,
					$scope.select = function(page) {
		                var end, start;
		                return start = (page - 1) * $scope.numPerPage, 
		                        end = start + $scope.numPerPage; 
		            },
					$scope.onFilterChange = function() {
			            return $scope.totalPage = Math.ceil($scope.filteredFAQStores.length / 10);
			        },(init = function() {
		                return $scope.select($scope.currentPage)
		            })()

    	}
    ])

	.controller("myModalOpenChangePW", ["$scope", "$modalInstance", "items",
        function($scope, $modalInstance, items) {
        	// console.log(items);
        	$scope.showError = false,
            $scope.openChangePWData = items, 
            $scope.ok = function(oldPW, newPW, confirmNewPW) {
            	// console.log(newPW, confirmNewPW);
            	if (typeof newPW == 'undefined' || typeof confirmNewPW == 'undefined' || newPW == '' || confirmNewPW == '' || newPW != confirmNewPW || items.U_PW != oldPW) {
            		$scope.showError = true;
            	}else{
            		items.U_Password = newPW
                	$modalInstance.close(items)
            	}
            }, $scope.cancel = function() {
                $modalInstance.dismiss("cancel")
            }
        }
    ])
;
