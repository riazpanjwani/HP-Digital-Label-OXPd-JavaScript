using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net.Mail;

namespace SMTPTest
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnSend_Click (object sender, EventArgs e)
        {
            try
            {
                string from = txtFrom.Text.Trim(); //how is this authenticated?
                string to = txtTo.Text.Trim();
                string subject = txtSubject.Text.Trim();
                string message = txtMessage.Text.Trim();

                SmtpClient objSmtpClient = new SmtpClient(); //initializes new instance of SmtpClient class using config file settings
                objSmtpClient.Host = "localhost"; //also specified in web config file
                objSmtpClient.Port = 25; //configure to same port in IIS
                objSmtpClient.DeliveryMethod = SmtpDeliveryMethod.SpecifiedPickupDirectory; //.Network, .PickupDirectoryFromIis, .SpecifiedPickupDirectory
                //objSmtpClient.EnableSsl = true;
                objSmtpClient.Timeout = 100000;
                System.Diagnostics.Debug.WriteLine("Smtp set up completed");
                objSmtpClient.Send(from, to, subject, message);
                //SmtpClient.Credentials needed? -> Gets/sets the credentials used to authenticate the sender
                System.Diagnostics.Debug.WriteLine("Email sent successfully");
                lblStatus.Text = "<b style='color:green'>Email has been successfully sent</b>";
            }

            catch (SmtpException ex)
            {
                lblStatus.Text = "<b style='color:red'>Exception caught: </b>" + ex.ToString();
                System.Diagnostics.Debug.WriteLine("Exception: " + ex.ToString());
            }

        }

    }
}

/*
public static void CreateTestMessage4(string server)
{
    MailAddress from = new MailAddress("ben@contoso.com");
    MailAddress to = new MailAddress("Jane@contoso.com");
    MailMessage message = new MailMessage(from, to);
    message.Subject = "Using the SmtpClient class.";
    message.Body = @"Using this feature, you can send an email message from an application very easily.";
    SmtpClient client = new SmtpClient(server);
    Console.WriteLine("Sending an email message to {0} by using SMTP host {1} port {2}.",
    to.ToString(), client.Host, client.Port);
    try
    {
        client.Send(message);
    }
    catch (Exception ex)
    {
        Console.WriteLine("Exception caught in CreateTestMessage4(): {0}",
        ex.ToString());
    }
}
}*/

