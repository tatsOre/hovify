from .remotive_store import JobSearcher
from hovify_app.models import Vacancy

def get_job_list():
    valid_companies = ["intetics"]
    remotive = JobSearcher()
    job_results = remotive.listof_jobs(valid_companies)
    for job in job_results:
        instance, created = Vacancy.objects.get_or_create(**job)
        if not created:
            for attr, value in job.items():
                setattr(instance, attr, value)
            instance.save()