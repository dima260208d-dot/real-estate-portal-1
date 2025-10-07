import json
import os
import psycopg2
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
    
    notification_url = os.environ.get('NOTIFICATION_FUNCTION_URL')
    if notification_url:
        try:
            import requests
            requests.post(notification_url, json={
                'application_id': app_id,
                'name': name,
                'phone': phone,
                'email': email,
                'service': service,
                'message': message
            }, timeout=5)
        except Exception:
            pass
    
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