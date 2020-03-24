from Login import Login
from Create_Job import Create_Job
from selenium import webdriver
import time
import unittest
from selenium.webdriver.common.keys import Keys
import random

class Test_Job_History(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        try:
            cls.driver = webdriver.Chrome("./chromedriver")
        except:
            cls.driver = webdriver.Chrome("./chromedriver.exe")
        cls.driver.implicitly_wait(10)
        cls.driver.maximize_window()


    def test_01_review_job(self):
        
        driver = self.driver
        driver.get("http://localhost:3000/login")
        time.sleep(2)

        driver.find_element_by_id('email').send_keys('thus@hotmail.com')

        driver.find_element_by_id('pass').send_keys('123456')

        driver.find_element_by_id('loginBtn').click()
        time.sleep(2)

        driver.get("http://localhost:3000/JobHistory")
        time.sleep(2)

        title_job = driver.find_elements_by_class_name('title')[0].text
        title_job = title_job[8:]

        driver.find_elements_by_class_name('MuiButton-label')[10].click()
        time.sleep(2)

        driver.find_element_by_id('detail').send_keys('TestBySelenium')
        time.sleep(2)

        driver.find_elements_by_class_name('MuiButton-label')[-1].click()
        time.sleep(2)
        
        driver.switch_to.alert.accept()
        time.sleep(2)
        
        assert driver.find_elements_by_class_name('titlename')[0].text == title_job


    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
        cls.driver.quit()
        print("complete")

if __name__ == '__main__':
    unittest.main()