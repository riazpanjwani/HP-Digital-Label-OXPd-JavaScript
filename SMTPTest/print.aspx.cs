using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;

namespace SMTPTest
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_LoadComplete(object sender, EventArgs e)
        {
            //load oxpd setup print on page load
            //throw this back on button click

            //lblStatus.Text = "<b style='color:green'>OXPD Print Setup</b>";
        }

        protected void BtnWrite_Click(object sender, EventArgs e)
        {
            string FilePath = Server.MapPath("printlabel.txt");
            string FileContent = "MANAGED PRINT SERVICES DEVICE" + Environment.NewLine + Environment.NewLine
                + "Model: " + modelemail.Value.ToString() + Environment.NewLine
                + "Hostname: " + hostemail.Value.ToString() + Environment.NewLine
                + "Network Address: " + networkemail.Value.ToString() + Environment.NewLine
                + "Mac Address: " + macemail.Value.ToString() + Environment.NewLine
                + "Firmware Version: " + osemail.Value.ToString() + Environment.NewLine
                + "Product Number: " + prodemail.Value.ToString() + Environment.NewLine
                + "Serial Number: " + serialemail.Value.ToString() + Environment.NewLine + Environment.NewLine
                + "For Support Call 1-800-HELPDESK";
            File.WriteAllText(FilePath, FileContent);

            if (Page.IsPostBack)
            {
                //call OXPD Print set up function
                Response.Redirect("printlabel.html"); //redirect to print.html where print script is automatically loaded
            }

            //ScriptManager.RegisterClientScriptBlock(this, GetType(), "mykey", "main().print('https://ipg-mis01-wja.auth.hpicorp.net:9443/mpsdigitallabel/Printpage.txt');", true); //try firing on page script if not working

            //lblStatus.Text = "<b style='color:green'>Text file written successsfully and printed</b>";
        }

    }
}