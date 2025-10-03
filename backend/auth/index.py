import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Authenticate user, register new clients, return role
    Args: event - dict with httpMethod, body containing username, password, optional email for registration
          context - object with request_id attribute
    Returns: HTTP response dict with authentication or registration result
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
    username = body_data.get('username')
    password = body_data.get('password')
    email = body_data.get('email')
    register_mode = body_data.get('register', False)
    
    if not username or not password:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Username and password required'}),
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
    
    username_escaped = username.replace("'", "''")
    password_escaped = password.replace("'", "''")
    
    if register_mode and email:
        email_escaped = email.replace("'", "''")
        
        check_query = f"SELECT id FROM users WHERE username = '{username_escaped}'"
        cur.execute(check_query)
        if cur.fetchone():
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Username already exists'}),
                'isBase64Encoded': False
            }
        
        insert_query = f"""
            INSERT INTO users (username, email, password, role)
            VALUES ('{username_escaped}', '{email_escaped}', '{password_escaped}', 'client')
            RETURNING id
        """
        cur.execute(insert_query)
        user_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'user_id': user_id,
                'role': 'client',
                'username': username,
                'message': 'Registration successful'
            }),
            'isBase64Encoded': False
        }
    
    query = f"SELECT id, role FROM users WHERE username = '{username_escaped}' AND password = '{password_escaped}'"
    cur.execute(query)
    result = cur.fetchone()
    
    cur.close()
    conn.close()
    
    if not result:
        return {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid credentials'}),
            'isBase64Encoded': False
        }
    
    user_id, role = result
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'user_id': user_id,
            'role': role,
            'username': username
        }),
        'isBase64Encoded': False
    }