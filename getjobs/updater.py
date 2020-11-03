#!/usr/bin/env python3
"""
This module is in charge of updating the list of jobs,
when the server starts and in a period of time.
"""
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from getjobs import getjobs
from apscheduler.triggers.cron import CronTrigger
import sys
import socket


def start():
    """Function to execute when Django starts
        socket trick is used to avoid double scheduler starting
    """
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.bind(("127.0.0.1", 47200))
        getjobs.get_job_list()
    except socket.error:
        print("Scheduler initialized!")
    else:
        scheduler = BackgroundScheduler(daemon=True)
        scheduler.add_job(getjobs.get_job_list, 'interval', weeks=4)
        scheduler.start()
