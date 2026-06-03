import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на почту владельца."""
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    service = body.get('service', '').strip()
    comment = body.get('comment', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': cors,
            'body': json.dumps({'error': 'Имя и телефон обязательны'}, ensure_ascii=False),
        }

    smtp_host = os.environ.get('SMTP_HOST', 'smtp.mail.ru')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ['SMTP_USER']
    smtp_pass = os.environ['SMTP_PASS']
    to_email = os.environ.get('TO_EMAIL', 'test@mail.ru')

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1e3a6e; padding: 24px; border-radius: 12px 12px 0 0;">
        <h2 style="color: white; margin: 0; font-size: 22px;">🔧 Новая заявка — АкваМастер</h2>
      </div>
      <div style="background: #f8fafc; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 0; color: #64748b; font-size: 14px; width: 130px;">Имя</td>
              <td style="padding: 10px 0; font-weight: bold; color: #1e293b;">{name}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b; font-size: 14px;">Телефон</td>
              <td style="padding: 10px 0; font-weight: bold; color: #f97316; font-size: 18px;">{phone}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b; font-size: 14px;">Услуга</td>
              <td style="padding: 10px 0; font-weight: bold; color: #1e293b;">{service or 'Не указана'}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b; font-size: 14px; vertical-align: top;">Комментарий</td>
              <td style="padding: 10px 0; color: #1e293b;">{comment or 'Не указан'}</td></tr>
        </table>
        <div style="margin-top: 20px; padding: 14px; background: #fff7ed; border-radius: 8px; border-left: 4px solid #f97316;">
          <p style="margin: 0; color: #c2410c; font-size: 14px;">⏱ Перезвоните клиенту в течение 5 минут!</p>
        </div>
      </div>
    </div>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка от {name} — АкваМастер'
    msg['From'] = smtp_user
    msg['To'] = to_email
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': cors,
        'body': json.dumps({'ok': True}, ensure_ascii=False),
    }
