import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get all applications for admin/director dashboard
    Args: event - dict with httpMethod, queryStringParameters with optional status filter
          context - object with request_id attribute
    Returns: HTTP response dict with list of applications
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters') or {}
    status_filter = params.get('status')
    user_id = params.get('user_id')
    
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
    
    if user_id and status_filter:
        query = f"""
            SELECT id, name, phone, email, service, message, status, 
                   created_at, updated_at
            FROM applications
            WHERE user_id = {user_id} AND status = '{status_filter.replace("'", "''")}'
            ORDER BY created_at DESC
        """
        cur.execute(query)
    elif user_id:
        query = f"""
            SELECT id, name, phone, email, service, message, status, 
                   created_at, updated_at
            FROM applications
            WHERE user_id = {user_id}
            ORDER BY created_at DESC
        """
        cur.execute(query)
    elif status_filter:
        query = f"""
            SELECT id, name, phone, email, service, message, status, 
                   created_at, updated_at
            FROM applications
            WHERE status = '{status_filter.replace("'", "''")}'
            ORDER BY created_at DESC
        """
        cur.execute(query)
    else:
        query = """
            SELECT id, name, phone, email, service, message, status, 
                   created_at, updated_at
            FROM applications
            ORDER BY created_at DESC
        """
        cur.execute(query)
    
    rows = cur.fetchall()
    
    applications = []
    for row in rows:
        applications.append({
            'id': row[0],
            'name': row[1],
            'phone': row[2],
            'email': row[3],
            'service': row[4],
            'message': row[5],
            'status': row[6],
            'created_at': row[7].isoformat() if row[7] else None,
            'updated_at': row[8].isoformat() if row[8] else None
        })
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'applications': applications,
            'count': len(applications)
        }),
        'isBase64Encoded': False
    }