from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from getjobs import getjobs
from apscheduler.triggers.cron import CronTrigger
import sys, socket

def start():
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.bind(("127.0.0.1", 47200))
        getjobs.get_job_list()
    except socket.error:
        print("!!!scheduler already started, DO NOTHING")
    else:
        scheduler = BackgroundScheduler(daemon=True)
        scheduler.add_job(getjobs.get_job_list, 'interval', weeks=4)
        scheduler.start()