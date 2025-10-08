import json
import os
import smtplib
import requests
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send email, SMS and Telegram notifications about new applications
    Args: event - dict with httpMethod, body containing application details
          context - object with request_id attribute
    Returns: HTTP response dict with notification status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    app_id = body_data.get('application_id')
    name = body_data.get('name')
    phone = body_data.get('phone')
    email = body_data.get('email')
    service = body_data.get('service')
    message = body_data.get('message', '')
    
    if not all([app_id, name, phone, email, service]):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Missing required fields'}),
            'isBase64Encoded': False
        }
    
    smtp_host = os.environ.get('SMTP_HOST', 'smtp.mail.ru')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    notification_email = os.environ.get('NOTIFICATION_EMAIL')
    notification_phone = os.environ.get('NOTIFICATION_PHONE')
    sms_api_key = os.environ.get('SMS_API_KEY')
    telegram_bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID', '5262932064')
    
    email_sent = False
    sms_sent = False
    telegram_sent = False
    errors = []
    
    if smtp_user and smtp_password and notification_email:
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f'Новая заявка #{app_id} на сайте'
            msg['From'] = smtp_user
            msg['To'] = notification_email
            
            html_content = f'''
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                        <h2 style="color: #FF6600; border-bottom: 3px solid #FF6600; padding-bottom: 10px;">
                            Новая заявка #{app_id}
                        </h2>
                        <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
                            <p style="margin: 10px 0;"><strong>Услуга:</strong> {service}</p>
                            <p style="margin: 10px 0;"><strong>ФИО клиента:</strong> {name}</p>
                            <p style="margin: 10px 0;"><strong>Телефон:</strong> <a href="tel:{phone}">{phone}</a></p>
                            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
                            {f'<p style="margin: 10px 0;"><strong>Сообщение:</strong><br>{message}</p>' if message else ''}
                        </div>
                        <div style="margin-top: 20px; padding: 15px; background-color: #fff3e6; border-left: 4px solid #FF6600; border-radius: 4px;">
                            <p style="margin: 0;">Войдите в личный кабинет для обработки заявки</p>
                        </div>
                    </div>
                </body>
            </html>
            '''
            
            part = MIMEText(html_content, 'html', 'utf-8')
            msg.attach(part)
            
            with smtplib.SMTP(smtp_host, smtp_port) as server:
                server.starttls()
                server.login(smtp_user, smtp_password)
                server.send_message(msg)
            
            email_sent = True
        except Exception as e:
            errors.append(f'Email error: {str(e)}')
    
    if sms_api_key and notification_phone:
        try:
            sms_text = f'Новая заявка #{app_id} на сайте. Клиент: {name}, тел: {phone}, услуга: {service}'
            
            response = requests.get('https://sms.ru/sms/send', params={
                'api_id': sms_api_key,
                'to': notification_phone,
                'msg': sms_text,
                'json': 1
            }, timeout=10)
            
            result = response.json()
            if result.get('status') == 'OK':
                sms_sent = True
            else:
                errors.append(f'SMS error: {result.get("status_text")}')
        except Exception as e:
            errors.append(f'SMS error: {str(e)}')
    
    if telegram_bot_token and telegram_chat_id:
        try:
            print(f'Sending Telegram notification to chat_id: {telegram_chat_id}')
            telegram_message = f'''🏠 <b>Новая заявка #{app_id}</b>

<b>Услуга:</b> {service}
<b>Клиент:</b> {name}
<b>Телефон:</b> {phone}
<b>Email:</b> {email}'''
            
            if message:
                telegram_message += f'\n<b>Сообщение:</b>\n{message}'
            
            telegram_url = f'https://api.telegram.org/bot{telegram_bot_token}/sendMessage'
            print(f'Telegram URL: {telegram_url}')
            response = requests.post(telegram_url, json={
                'chat_id': telegram_chat_id,
                'text': telegram_message,
                'parse_mode': 'HTML'
            }, timeout=10)
            
            print(f'Telegram response status: {response.status_code}')
            print(f'Telegram response body: {response.text}')
            
            if response.status_code == 200:
                telegram_sent = True
            else:
                errors.append(f'Telegram error: {response.text}')
        except Exception as e:
            print(f'Telegram exception: {str(e)}')
            errors.append(f'Telegram error: {str(e)}')
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'email_sent': email_sent,
            'sms_sent': sms_sent,
            'telegram_sent': telegram_sent,
            'errors': errors if errors else None
        }),
        'isBase64Encoded': False
    }