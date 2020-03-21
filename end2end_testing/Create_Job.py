from selenium import webdriver
import time

class Create_Job():
    def __init__(self, driver):
        self.driver = driver

       

    def creatingjob(self):

        driver = self.driver
        driver.get("http://localhost:3000/Createjob")
        time.sleep(1)

        driver.find_element_by_id('jobname').send_keys('testbyselenium')                
        
        driver.find_element_by_id('amount').send_keys('1')

        driver.find_element_by_id('jobdescription').send_keys('testbyselenium')

        driver.find_element_by_id('timebegin').send_keys('1800')

        driver.find_element_by_id('timeend').send_keys('1900')

        driver.find_element_by_id('location').send_keys('testbyselenium')

        driver.find_element_by_id('workDate').send_keys('21032020')

        driver.find_element_by_id('wages').send_keys('500')

        driver.find_elements_by_class_name('PrivateSwitchBase-input-358')[0].click()        
        
        driver.find_elements_by_class_name("MuiButton-label")[-1].click()
        time.sleep(1)
        
        driver.get("http://localhost:3000/Dashboard")
