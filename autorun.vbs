set wscriptObj = CreateObject("Wscript.Shell")
wscriptObj.run "svnserve -d -r e:\svn_test", 0
wscriptObj.run "node d:\share_server.js", 0