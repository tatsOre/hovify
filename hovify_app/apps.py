"""Custom app initialization
"""
from django.apps import AppConfig


class HovifyAppConfig(AppConfig):
    """Starts the app

    Args:
        AppConfig: Base App Model
    """
    name = 'hovify_app'

    def ready(self):
        """When app is ready, the updater that contains all the jobs starts.
        """
        from getjobs import updater
        updater.start()
