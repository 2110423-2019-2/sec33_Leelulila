from Login import Login
from Create_Job import Create_Job
from selenium import webdriver
import time
import unittest
from selenium.webdriver.common.keys import Keys
import random

class Test_Job_Management(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        try:
            cls.driver = webdriver.Chrome("./chromedriver")
        except:
            cls.driver = webdriver.Chrome("./chromedriver.exe")
        cls.driver.implicitly_wait(10)
        cls.driver.maximize_window()

    



    def test_01_management_delete_Btn(self):
        
        driver = self.driver
        driver.get("http://localhost:3000/login")
        time.sleep(2)

        driver.find_element_by_id('email').send_keys('thus@hotmail.com')

        driver.find_element_by_id('pass').send_keys('123456')

        driver.find_element_by_id('loginBtn').click()
        time.sleep(2)

        driver.get("http://localhost:3000/JobOwned")
        time.sleep(2)

        before_delete = len(driver.find_elements_by_id('ListingJobForm'))

        driver.find_elements_by_class_name('MuiButton-label')[10].click()
        time.sleep(2)

        print(len(driver.find_elements_by_class_name('MuiListItemText-root')))
        driver.find_elements_by_class_name('MuiListItemText-root')[7].click()
        time.sleep(5)

        assert len(driver.find_elements_by_id('ListingJobForm')) == before_delete-1

    def test_02_management_applicant_and_employee_Btn(self):
        
        driver = self.driver

        driver.get("http://localhost:3000/JobOwned")
        time.sleep(2)

        driver.find_elements_by_class_name('MuiButton-label')[10].click()
        time.sleep(2)

        driver.find_elements_by_class_name('MuiListItemText-root')[10].click()
        time.sleep(1)

        # driver.find_elements_by_class_name('MuiButton-label')[10].click()
        # time.sleep(2)

        before_accepted = len(driver.find_elements_by_class_name('accepted-employee'))

        driver.get("http://localhost:3000/JobOwned")
        time.sleep(2)

        driver.find_elements_by_class_name('MuiButton-label')[10].click()
        time.sleep(2)

        driver.find_elements_by_class_name('MuiListItemText-root')[9].click()
        time.sleep(2)

        driver.find_element_by_id('customized-menu').click()
        driver.find_element_by_class_name('acceptBtn').click()
        time.sleep(2)

        driver.find_elements_by_class_name('MuiButton-label')[10].click()
        time.sleep(2)

        driver.find_elements_by_class_name('MuiListItemText-root')[10].click()
        time.sleep(1)

        assert before_accepted+1 == len(driver.find_elements_by_class_name('accepted-employee'))
       

    def test_03_management_start_Btn(self):
        
        driver = self.driver

        driver.get("http://localhost:3000/JobOwned")
        time.sleep(2)

        driver.find_elements_by_class_name('MuiButton-label')[10].click()
        time.sleep(2)

        driver.find_elements_by_class_name('MuiListItemText-root')[8].click()
        time.sleep(2)

        assert driver.find_element_by_class_name('start').text == 'Start'

        driver.find_elements_by_class_name('MuiButton-label')[10].click()
        time.sleep(2)



    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
        cls.driver.quit()
        print("complete")

if __name__ == '__main__':
    unittest.main()