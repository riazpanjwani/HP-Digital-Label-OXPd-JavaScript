<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="SMTPTest.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            
<table style="font-family: Arial,'Segoe UI';">
                <tr>
                    <td colspan="3">
                        <span align="left">
                            <asp:Image ID="imgMail" runat="server" ImageUrl="~/Image/hp.png" />
                        </span>
                        <span style="font-size: 20px; font-family:"sans-serif"; margin-top: -5px">Sending Email through SMTP IIS
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>From</td>
                    <td>:</td>
                    <td>
                        <asp:TextBox ID="txtFrom" runat="server" Width="407" Height="20"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>To</td>
                    <td>:</td>
                    <td>
                        <asp:TextBox ID="txtTo" runat="server" Width="407" Height="20"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>Subject</td>
                    <td>:</td>
                    <td>
                        <asp:TextBox ID="txtSubject" runat="server" Width="407" Height="20"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>Message</td>
                    <td>:</td>
                    <td>
                        <asp:TextBox ID="txtMessage" runat="server" TextMode="MultiLine" Rows="5" Columns="54"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" align="Right">
                        <asp:Button ID="btnSend" runat="server" Text="Send mail" OnClick="btnSend_Click" BackColor="cornflowerblue" ForeColor="White" 
                             Height="40" Width="200" Font-Size="18" BorderStyle="none" font-family="sans-serif"/>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <asp:Label ID="lblStatus" runat="server" />
                    </td>
                </tr>
            </table>

        </div>
    </form>
</body>
</html>
