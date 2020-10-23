from storages.backends.s3boto3 import S3Boto3Storage
from django.conf import settings
class MediaStorage(S3Boto3Storage):
    location = 'media'
    file_overwrite = False

class PrivateMediaStorage(S3Boto3Storage):
    location = settings.AWS_PRIVATE_MEDIA_LOCATION
    default_acl = 'private'
    file_overwrite = False
    custom_domain = False