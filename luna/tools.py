import smtplib
from email.mime.multipart import MIMEMultipart
import os


CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET_PATH')

async def send_email(me: str, to: str, subject: str, message: str):
    msg = MIMEMultipart()
    msg['Subject'] = subject
    # me == the sender's email address
    # family = the list of all recipients' email addresses
    msg['From'] = me
    msg['To'] = to
    msg.preamble = message

    # Send the email via our own SMTP server.
    s = smtplib.SMTP('localhost')
    s.sendmail(me, to, msg.as_string())
    s.quit()
