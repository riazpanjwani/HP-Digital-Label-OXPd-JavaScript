<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="print.aspx.cs" Inherits="SMTPTest.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<link type="text/css" rel="stylesheet" href="Resources/CSS/emailstyle.css" />
	<link type="text/css" rel="stylesheet" href="Resources/CSS/pure.css" />
	<script src="http://code.jquery.com/jquery-1.12.4.min.js"
			integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
			crossorigin="anonymous"></script>
	<script src="Resources/JavaScript/oxpddeviceinfo-2.0.0.min.js"></script>
	<script src="Resources/JavaScript/oxpddiscovery-2.0.0.min.js"></script>
	<script src="Resources/JavaScript/oxpdprint-2.0.0.min.js"></script>
	<script src="Resources/JavaScript/oxpdscan-2.0.0.min.js"></script>
	<script src="Resources/JavaScript/logger.js"></script>
	<link type="text/css" rel="stylesheet" href="Resources/CSS/createlabel.css" />

	<title>Generate Label</title>

	<script type="text/javascript">
		//write OXPD Print set up function here

	</script>

</head>
<body>
	<form id="form1" runat="server">
		<div>

		<div style="display: inline-block; vertical-align: top; padding-bottom: 10px; padding-left: 10px">
			<!-- HP LOGO -->
			<img src="Resources/Assets/HP_Blue_RGB_72_SM.gif" alt="HP Inc. Logo" />
		</div>

		<div style="display: inline-block;">
			<div>
			<!-- HEADING -->
			<h1 style="font-weight: 400; text-transform: uppercase; letter-spacing: 0.1em; padding-left: 0.5em">HP Inc Label Generator</h1>
			</div>
		</div>

		<div>
			<ul>
				<li>To print the device information, click the "Create Label" button below to generate a printable label.</li>
			</ul>

			 <ul>
				<li>Once the label is created, you will be redirected to another page and prompted to print the label.</li>
			</ul>

			 <ul>
				<li>To exit the label generator, click "Go Home".</li>
			</ul>
		</div>

		<div>
			<table>
				<tr>
					<td>
						<a href="index.html"><input class="button" type="button" value="Go Home" /></a>
					</td>
					<td>
						<asp:Button ID="btnSend" runat="server" Text="Create Label" OnClick="BtnWrite_Click" class="pure-button" Width="200px" Height="40px" 
							BackColor="cornflowerblue" BorderStyle="none" onsubmit="return false"/>
					</td>
				</tr>
			</table>
		</div>

		<div>
		<!--Retrieve device info from js and pass to backend-->
		<asp:HiddenField ID="modelemail" runat="server" />
		<asp:HiddenField ID="hostemail" runat="server" />
		<asp:HiddenField ID="networkemail" runat="server" />
		<asp:HiddenField ID="macemail" runat="server" />
		<asp:HiddenField ID="osemail" runat="server" />
		<asp:HiddenField ID="prodemail" runat="server" />
		<asp:HiddenField ID="serialemail" runat="server" />
		</div>

		<script type="text/javascript">
			document.getElementById("<%=modelemail.ClientID%>").value = localStorage.getItem("modprint");
			document.getElementById("<%=hostemail.ClientID%>").value = localStorage.getItem("hostprint");
			document.getElementById("<%=networkemail.ClientID%>").value = localStorage.getItem("ipprint");
			document.getElementById("<%=macemail.ClientID%>").value = localStorage.getItem("macprint");
			document.getElementById("<%=osemail.ClientID%>").value = localStorage.getItem("osprint");
			document.getElementById("<%=prodemail.ClientID%>").value = localStorage.getItem("prodprint");
			document.getElementById("<%=serialemail.ClientID%>").value = localStorage.getItem("serialprint");
		</script>

		</div>
	</form>
</body>
</html>
