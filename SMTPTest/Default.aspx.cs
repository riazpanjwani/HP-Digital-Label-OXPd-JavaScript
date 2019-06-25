using System;
using System.IO;
using System.Net.Mail;
using System.Web.UI;


namespace SMTPTest
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void BtnSend_Click(object sender, EventArgs e)
        {
            try
            {
                //Generate email from user input and device information values
                string from = txtFrom.Text.Trim();
                string to = txtTo.Text.Trim();
                string subject = txtSubject.Text.Trim();
                string title = "<br/><br/><b><u>" + "MPS Device Information Request" + "</b></u>";
                string message = txtMessage.Text.Trim() + title + "<br/>"
                    + "Model: " + modelemail.Value.ToString() + "<br/>"
                    + "Hostname: " + hostemail.Value.ToString() + "<br/>"
                    + "Network Address: " + networkemail.Value.ToString() + "<br/>"
                    + "Mac Address: " + macemail.Value.ToString() + "<br/>"
                    + "Firmware Version: " + osemail.Value.ToString() + "<br/>"
                    + "Product Number: " + prodemail.Value.ToString() + "<br/>"
                    + "Serial Number: " + serialemail.Value.ToString();

                //Create SMTP object and initialize server
                MailAddress fromAddr = new MailAddress(from);
                MailAddress toAddr = new MailAddress(to);
                var objSmtpClient = new SmtpClient
                {
                    Host = "smtp3.hp.com",
                    Port = 25,
                    EnableSsl = false,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Timeout = 100000

                };

                //Set message and send
                using (MailMessage msg = new MailMessage(fromAddr, toAddr)
                {
                    Subject = subject,
                    Body = message,
                    IsBodyHtml = true,
                    BodyEncoding = System.Text.Encoding.UTF8,
                })
                {
                    objSmtpClient.Send(msg);
                }

                //Email sent notification and web form reset
                System.Diagnostics.Debug.WriteLine("Email sent successfully");
                string alertmsg = "Email has been successfully sent.";
                string content = "window.onload=function(){ alert('";
                content += alertmsg;
                content += "');";
                content += "window.location='";
                content += Request.Url.AbsoluteUri;
                content += "';}";
                ClientScript.RegisterStartupScript(this.GetType(), "SuccessMessage", content, true);
                //lblStatus.Text = "<b style='color:green'>Email has been successfully sent.</b>";
                return;
            }

            //Exception handing (error made visible to user)
            catch (SmtpException ex)
            {
                ScriptManager.RegisterClientScriptBlock(this, typeof(Page), "ErrorMessage", "alert('An error occured. We were unable to send your email.');", true);
                lblStatus.Text = "<b style='color:red'>Exception caught: </b>" + ex.ToString();
                System.Diagnostics.Debug.WriteLine("Exception: " + ex.ToString());
            }

        }

    }
}