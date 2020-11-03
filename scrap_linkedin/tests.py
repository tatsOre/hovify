import unittest
from linkedin_scraper import LikedinScraper
import json


class TestLinkedinScraper(unittest.TestCase):

    new_scraping = LikedinScraper(user_agent="")

    def test_valid_url_maria(self):
        """ test an existing linkedin profile """
        user_data = self.new_scraping.get_data(
            "https://www.linkedin.com/in/mariafernandacrespo/")
        self.assertEqual(user_data['FirstName'], "Maria Fernanda")
        self.assertEqual(user_data['LastName'], "Crespo Martinez")
        self.assertTrue("Software" in user_data['Role'])
        self.assertTrue(len(user_data['Location']) > 0)
        self.assertTrue(len(user_data['Summary']) > 0)
        self.assertTrue(len(user_data['Education']) > 0)
        self.assertTrue(len(user_data['Professional']) > 0)
        self.assertTrue(len(user_data['Skills']) > 0)
        self.assertTrue(len(user_data['Languages']) > 0)
        self.assertTrue(len(user_data['Projects']) > 0)

    def test_valid_url_juan(self):
        """ test an existing linkedin profile """
        user_data = self.new_scraping.get_data(
            "https://www.linkedin.com/in/juansebastianllanogallego/")
        self.assertEqual(user_data['FirstName'], "Juan Sebastián")
        self.assertEqual(user_data['LastName'], "Llano Gallego")
        self.assertTrue("Software" in user_data['Role'])
        self.assertTrue(len(user_data['Location']) > 0)
        self.assertTrue(len(user_data['Summary']) > 0)
        self.assertTrue(len(user_data['Education']) > 0)
        self.assertTrue(len(user_data['Professional']) > 0)
        self.assertTrue(len(user_data['Skills']) > 0)
        self.assertTrue(len(user_data['Projects']) == 0)

    def test_valid_url_david(self):
        """ test an existing linkedin profile """
        user_data = self.new_scraping.get_data(
            "https://www.linkedin.com/in/davidorejuela14/")
        self.assertEqual(user_data['FirstName'], "David")
        self.assertEqual(user_data['LastName'], "Orejuela")
        self.assertTrue("Software" in user_data['Role'])
        self.assertTrue(len(user_data['Location']) > 0)
        self.assertTrue(len(user_data['Summary']) > 0)
        self.assertTrue(len(user_data['Education']) > 0)
        self.assertTrue(len(user_data['Professional']) > 0)
        self.assertTrue(len(user_data['Skills']) > 0)
        self.assertTrue(len(user_data['Languages']) > 0)
        self.assertTrue(len(user_data['Projects']) == 0)

    def test_valid_url_nath(self):
        """ test an existing linkedin profile """
        user_data = self.new_scraping.get_data(
            "https://www.linkedin.com/in/nathsotomayor/")
        self.assertEqual(user_data['FirstName'], "Nathaly")
        self.assertEqual(user_data['LastName'], "Sotomayor Ampudia")
        self.assertTrue("Software" in user_data['Role'])
        self.assertTrue(len(user_data['Location']) > 0)
        self.assertTrue(len(user_data['Summary']) > 0)
        self.assertTrue(len(user_data['Education']) > 0)
        self.assertTrue(len(user_data['Professional']) > 0)
        self.assertTrue(len(user_data['Skills']) > 0)
        self.assertTrue(len(user_data['Languages']) > 0)
        self.assertTrue(len(user_data['Projects']) == 0)

    def test_valid_url_andy(self):
        """ test an existing linkedin profile """
        user_data = self.new_scraping.get_data(
            "https://www.linkedin.com/in/andresfbayona/")
        self.assertEqual(user_data['FirstName'], "Andres Felipe")
        self.assertEqual(user_data['LastName'], "Bayona Monares")
        self.assertTrue("Software" in user_data['Role'])
        self.assertTrue(len(user_data['Location']) > 0)
        self.assertTrue(len(user_data['Summary']) > 0)
        self.assertTrue(len(user_data['Education']) > 0)
        self.assertTrue(len(user_data['Professional']) > 0)
        self.assertTrue(len(user_data['Skills']) > 0)
        self.assertTrue(len(user_data['Languages']) == 0)
        self.assertTrue(len(user_data['Projects']) > 0)

    def test_valid_url_tatiana(self):
        """ test an existing linkedin profile """
        user_data = self.new_scraping.get_data(
            "https://www.linkedin.com/in/tatiana-orejuela-08b98225/")
        self.assertEqual(user_data['FirstName'], "Tatiana")
        self.assertEqual(user_data['LastName'], "Orejuela")

    def test_invalid_url(self):
        """ test an existing linkedin profile """
        user_data = self.new_scraping.get_data(
            "https://www.linkedin.com/in/hiimnotreal06/")
        self.assertEqual(user_data, None)


if __name__ == '__main__':
    unittest.main()
