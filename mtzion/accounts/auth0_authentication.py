from django.contrib.auth import get_user_model
from rest_framework import authentication
from rest_framework import exceptions
from jose import jwt
from django.conf import settings

class Auth0Authentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header:
            return None

        try:
            token = auth_header.split()[1]
            payload = jwt.decode(
                token,
                algorithms=['RS256'],
                audience=settings.AUTH0_AUDIENCE,
                issuer=f'https://{settings.AUTH0_DOMAIN}/'
            )
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token has expired')
        except jwt.JWTError:
            raise exceptions.AuthenticationFailed('Invalid token')

        user_id = payload['sub']
        User = get_user_model()

        try:
            user = User.objects.get(auth0_id=user_id)
        except User.DoesNotExist:
            user = User(auth0_id=user_id, username=payload.get('email', user_id))
            user.save()

        return (user, token)