from django.test import TestCase

# Create your tests here.


class TestJobSearcher(TestCase):
    """Class to get data from remotive"""

    def test_valid_intetics(self):
        """ test an existing linkedin profile """
        valid_companies = ["intetics"]
        remotive = JobSearcher()
        job_results = remotive.listof_jobs(valid_companies)
        self.assertTrue(len(job_results[0].get('JobTitle')) > 0)
        self.assertTrue(len(job_results[0].get('Type')) > 0)
        self.assertTrue(len(job_results[0].get('Company')) > 0)
        self.assertTrue(len(job_results[0].get('Category')) > 0)
        self.assertTrue(len(job_results[0].get('RequiredLocation')) > 0)
        self.assertTrue(len(job_results[0].get('Requirements')) > 0)
        self.assertTrue(isinstance(job_results[0].get('Salary'), str))
        self.assertTrue(len(job_results[0].get('URL')) > 0)
        self.assertTrue(len(job_results[0].get('PublishedAt')) > 0)
