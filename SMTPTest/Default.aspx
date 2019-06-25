<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="SMTPTest.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link type="text/css" rel="stylesheet" href="Resources/CSS/emailstyle.css" />
    <link type="text/css" rel="stylesheet" href="Resources/CSS/pure.css" />
    <title>Email Device Information</title>
    <style type="text/css">
        #form1 {}
    </style>
</head>
    <!--HP Logo
        <span>
        <asp:Image ID="imgMail" runat="server" ImageUrl="Resources/Assets/HP_Blue_RGB_72_SM.gif" AlternateText="HP Logo"/>
        </span>-->

<body>
    <form id="form1" runat="server" class="pure-form">
        
        <!--Page header-->
        <h2 style="font-weight: 400; text-transform: uppercase; letter-spacing: 0.1em;">
            Email Device Information
        </h2>
        
        <div>
            <label>From: </label>
        </div>
        <div>
            <asp:TextBox ID="txtFrom" runat="server" Width="50%" placeholder="your.email@hp.com" required="true"></asp:TextBox>
        </div>
        <span class="pure-form-message" style="padding-bottom: 1em"> 
            This is a required field
        </span>
        
        <div>
            <label>To: </label>
        </div>
        <div>
            <asp:TextBox ID="txtTo" runat="server" Width="50%" placeholder="recipient.email@hp.com" required="true"></asp:TextBox>
        </div>
        <span class="pure-form-message" style="padding-bottom: 1em"> 
            This is a required field
        </span>
        
        <div>
            <label>Subject: </label>
        </div>
        <div style="padding-bottom: 1em">
            <asp:TextBox ID="txtSubject" runat="server" Width="100%"></asp:TextBox>
        </div>

        <div>
            <label>Message: </label>
        </div>
        <div style="padding-bottom: 1em">
            <asp:TextBox ID="txtMessage" runat="server" TextMode="MultiLine" placeholder="The device information will be attached along with this message" Rows="5" Width="100%"></asp:TextBox>
        </div>

        <div>
            <table>
                <tr>
                    <td>
                        <a href="index.html"><input class="button" type="button" value="Go Home" /></a>
                    </td>
                    <td>
                        <asp:Button ID="btnSend" runat="server" Text="Send" OnClick="BtnSend_Click" class="pure-button" Width="200px" Height="40px" 
                            BackColor="cornflowerblue" BorderStyle="none" />
                    </td>
                </tr>
            </table>
        </div>
           
        <asp:Label ID="lblStatus" runat="server" />

        <!--Retrieve device info from js and pass to backend-->
        <asp:HiddenField ID="modelemail" runat="server" />
        <asp:HiddenField ID="hostemail" runat="server" />
        <asp:HiddenField ID="networkemail" runat="server" />
        <asp:HiddenField ID="macemail" runat="server" />
        <asp:HiddenField ID="osemail" runat="server" />
        <asp:HiddenField ID="prodemail" runat="server" />
        <asp:HiddenField ID="serialemail" runat="server" />


        <script type="text/javascript">
            document.getElementById("<%=modelemail.ClientID%>").value = localStorage.getItem("modprint");
            document.getElementById("<%=hostemail.ClientID%>").value = localStorage.getItem("hostprint");
            document.getElementById("<%=networkemail.ClientID%>").value = localStorage.getItem("ipprint");
            document.getElementById("<%=macemail.ClientID%>").value = localStorage.getItem("macprint");
            document.getElementById("<%=osemail.ClientID%>").value = localStorage.getItem("osprint");
            document.getElementById("<%=prodemail.ClientID%>").value = localStorage.getItem("prodprint");
            document.getElementById("<%=serialemail.ClientID%>").value = localStorage.getItem("serialprint");
        </script>

    </form>
</body>

</html>
