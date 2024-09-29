# accounts/utils.py
import json
import jwt
from django.contrib.auth import authenticate
import requests
from rest_framework import exceptions
from django.conf import settings

def jwt_get_username_from_payload_handler(payload):
    username = payload.get('sub').replace('|', '.')
    authenticate(remote_user=username)
    return username

def jwt_decode_token(token):
    header = jwt.get_unverified_header(token)
    jwks = requests.get(f'https://{settings.AUTH0_DOMAIN}/.well-known/jwks.json').json()
    public_key = None
    for jwk in jwks['keys']:
        if jwk['kid'] == header['kid']:
            public_key = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(jwk))

    if public_key is None:
        raise exceptions.AuthenticationFailed('Public key not found.')

    try:
        return jwt.decode(
            token,
            public_key,
            algorithms=['RS256'],
            audience=settings.API_IDENTIFIER,
            issuer=f'https://{settings.AUTH0_DOMAIN}/'
        )
    except jwt.ExpiredSignatureError:
        raise exceptions.AuthenticationFailed('Token has expired.')
    except jwt.InvalidTokenError:
        raise exceptions.AuthenticationFailed('Invalid token.')