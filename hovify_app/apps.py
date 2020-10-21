from django.apps import AppConfig


class HovifyAppConfig(AppConfig):
    name = 'hovify_app'

    def ready(self):
        from getjobs import updater
        updater.start()

