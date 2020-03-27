from Login import Login
from Create_Job import Create_Job
from selenium import webdriver
import time
import unittest
from selenium.webdriver.common.keys import Keys
import random

class Test_Profile(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        try:
            cls.driver = webdriver.Chrome("./chromedriver")
        except:
            cls.driver = webdriver.Chrome("./chromedriver.exe")
        cls.driver.implicitly_wait(10)
        cls.driver.maximize_window()

    def test_01_edit_save_Btn(self):
        
        driver = self.driver
        driver.get("http://localhost:3000/login")
        time.sleep(2)

        driver.find_element_by_id('email').send_keys('thus@hotmail.com')

        driver.find_element_by_id('pass').send_keys('123456')

        driver.find_element_by_id('loginBtn').click()
        time.sleep(2)

        ran = int(random.random()*100)

        ran = str(ran)

        driver.get("http://localhost:3000/Profile")
        time.sleep(2)

        driver.find_elements_by_class_name('MuiButton-label')[10].click()
        time.sleep(2)


        oldtext = driver.find_element_by_id('about-text').text
        driver.find_element_by_id('About').clear()
        time.sleep(1)

        driver.find_element_by_id('About').send_keys(ran)
        time.sleep(2)

        driver.find_element_by_id('saveBtn').click()
        time.sleep(2)  

        newtext = oldtext+ran

        assert driver.find_element_by_id('about-text').text == newtext

    def test_02_edit_discard_Btn(self):
        
        driver = self.driver
        driver.get("http://localhost:3000/Profile")
        time.sleep(2)

        

        ran = int(random.random()*100)

        ran = str(ran)

        oldtext = driver.find_element_by_id('about-text').text

        driver.find_elements_by_class_name('MuiButton-label')[10].click()
        time.sleep(2)

        driver.find_element_by_id('About').send_keys(ran)
        time.sleep(2)

        driver.find_element_by_id('discardBtn').click()
        time.sleep(2)

        assert driver.find_element_by_id('about-text').text == oldtext


    def test_03_edit_save_Btn(self):

        driver = self.driver
        driver.get("http://localhost:3000/Profile")
        time.sleep(2)

        ran = int(random.random()*100)

        ran = str(ran)

        driver.get("http://localhost:3000/Profile")
        time.sleep(2)

        driver.find_elements_by_class_name('MuiButton-label')[11].click()
        time.sleep(2)


        oldtext = driver.find_element_by_id('education-text').text
        driver.find_element_by_id('Education').clear()
        time.sleep(1)

        driver.find_element_by_id('Education').send_keys(ran)
        time.sleep(2)

        driver.find_element_by_id('saveBtn').click()
        time.sleep(2)  

        newtext = oldtext+ran

        assert driver.find_element_by_id('education-text').text == newtext

    def test_04_edit_discard_Btn(self):
        
        driver = self.driver
        driver.get("http://localhost:3000/Profile")
        time.sleep(2)

        

        ran = int(random.random()*100)

        ran = str(ran)

        oldtext = driver.find_element_by_id('education-text').text

        driver.find_elements_by_class_name('MuiButton-label')[11].click()
        time.sleep(2)

        driver.find_element_by_id('Education').send_keys(ran)
        time.sleep(2)

        driver.find_element_by_id('discardBtn').click()
        time.sleep(2)

        assert driver.find_element_by_id('education-text').text == oldtext

    def test_05_edit_save_Btn(self):

        driver = self.driver
        driver.get("http://localhost:3000/Profile")
        time.sleep(2)

        ran = int(random.random()*100)

        ran = str(ran)

        driver.get("http://localhost:3000/Profile")
        time.sleep(2)

        driver.find_elements_by_class_name('MuiButton-label')[12].click()
        time.sleep(2)


        oldtext = driver.find_element_by_id('skill-text').text
        driver.find_element_by_id('Skill').clear()
        time.sleep(1)

        driver.find_element_by_id('Skill').send_keys(ran)
        time.sleep(2)

        driver.find_element_by_id('saveBtn').click()
        time.sleep(2)  

        newtext = oldtext+ran

        assert driver.find_element_by_id('skill-text').text == newtext

    def test_06_edit_discard_Btn(self):
        
        driver = self.driver
        driver.get("http://localhost:3000/Profile")
        time.sleep(2)

        

        ran = int(random.random()*100)

        ran = str(ran)

        oldtext = driver.find_element_by_id('skill-text').text

        driver.find_elements_by_class_name('MuiButton-label')[12].click()
        time.sleep(2)

        driver.find_element_by_id('Skill').send_keys(ran)
        time.sleep(2)

        driver.find_element_by_id('discardBtn').click()
        time.sleep(2)

        assert driver.find_element_by_id('skill-text').text == oldtext

        time.sleep(5)

    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
        cls.driver.quit()
        print("complete")

if __name__ == '__main__':
    unittest.main()