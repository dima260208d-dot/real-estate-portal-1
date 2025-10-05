import json
import os
import psycopg2
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import urllib.request
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Submit client application to database
    Args: event - dict with httpMethod, body containing name, phone, email, service, message
          context - object with request_id attribute
    Returns: HTTP response dict with status and application ID
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
    name = body_data.get('name')
    phone = body_data.get('phone')
    email = body_data.get('email')
    service = body_data.get('service')
    message = body_data.get('message', '')
    user_id = body_data.get('user_id')
    
    if not all([name, phone, email, service]):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Missing required fields'}),
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database configuration error'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    name_escaped = name.replace("'", "''")
    phone_escaped = phone.replace("'", "''")
    email_escaped = email.replace("'", "''")
    service_escaped = service.replace("'", "''")
    message_escaped = message.replace("'", "''")
    
    if user_id:
        insert_query = f"""
            INSERT INTO applications (name, phone, email, service, message, status, user_id)
            VALUES ('{name_escaped}', '{phone_escaped}', '{email_escaped}', '{service_escaped}', '{message_escaped}', 'new', {user_id})
            RETURNING id
        """
    else:
        insert_query = f"""
            INSERT INTO applications (name, phone, email, service, message, status)
            VALUES ('{name_escaped}', '{phone_escaped}', '{email_escaped}', '{service_escaped}', '{message_escaped}', 'new')
            RETURNING id
        """
    
    cur.execute(insert_query)
    app_id = cur.fetchone()[0]
    
    conn.commit()
    cur.close()
    conn.close()
    
    # Send notifications
    send_email_notification(app_id, name, phone, email, service)
    send_telegram_notification(app_id, name, phone, email, service)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'application_id': app_id,
            'message': 'Заявка успешно отправлена'
        }),
        'isBase64Encoded': False
    }


def send_email_notification(app_id: int, name: str, phone: str, email: str, service: str) -> None:
    '''Send email notification about new application'''
    try:
        smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        smtp_user = os.environ.get('SMTP_USER', '')
        smtp_password = os.environ.get('SMTP_PASSWORD', '')
        
        if not smtp_user or not smtp_password:
            print('Email credentials not configured')
            return
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Новая заявка #{app_id} - {service}'
        msg['From'] = smtp_user
        msg['To'] = 'mishany_kharchenko@mail.ru'
        
        html = f'''
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px;">
              <h2 style="color: #2563eb; margin-bottom: 20px;">🔔 Новая заявка #{app_id}</h2>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                <h3 style="margin-top: 0; color: #1f2937;">Информация о клиенте:</h3>
                <p><strong>Имя:</strong> {name}</p>
                <p><strong>Телефон:</strong> <a href="tel:{phone}">{phone}</a></p>
                <p><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
              </div>
              
              <div style="background: white; padding: 20px; border-radius: 8px;">
                <h3 style="margin-top: 0; color: #1f2937;">Детали заявки:</h3>
                <p><strong>Услуга:</strong> {service}</p>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #eff6ff; border-left: 4px solid #2563eb; border-radius: 4px;">
                <p style="margin: 0; font-size: 14px;">
                  <strong>Свяжитесь с клиентом:</strong><br>
                  Телефон: <a href="tel:89805557580" style="color: #2563eb;">8 (980) 555-75-80</a>
                </p>
              </div>
            </div>
          </body>
        </html>
        '''
        
        part = MIMEText(html, 'html')
        msg.attach(part)
        
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        print(f'Email notification sent for application {app_id}')
    except Exception as e:
        print(f'Email error: {str(e)}')


def send_telegram_notification(app_id: int, name: str, phone: str, email: str, service: str) -> None:
    '''Send Telegram notification about new application'''
    try:
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
        chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')
        
        if not bot_token or not chat_id:
            print('Telegram credentials not configured')
            return
        
        message = f'''
🔔 <b>Новая заявка #{app_id}</b>

👤 <b>Клиент:</b>
Имя: {name}
Телефон: {phone}
Email: {email}

📋 <b>Услуга:</b> {service}

📞 <b>Связаться:</b> <a href="tel:89805557580">8 (980) 555-75-80</a>
        '''
        
        url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
        data = {
            'chat_id': chat_id,
            'text': message.strip(),
            'parse_mode': 'HTML'
        }
        
        req = urllib.request.Request(
            url,
            data=json.dumps(data).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        
        with urllib.request.urlopen(req) as response:
            if response.status == 200:
                print(f'Telegram notification sent for application {app_id}')
    except Exception as e:
        print(f'Telegram error: {str(e)}')