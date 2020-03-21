from Login import Login
from selenium import webdriver
import time
import unittest
import random

class Test_Register(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        try:
            cls.driver = webdriver.Chrome("./chromedriver")
        except:
            cls.driver = webdriver.Chrome("./chromedriver.exe")
        cls.driver.implicitly_wait(10)
        cls.driver.maximize_window()

    def test_01_resgister_fail(self):
        driver = self.driver
        driver.get("http://localhost:3000/register")
        time.sleep(2)

        driver.find_elements_by_class_name('MuiButton-label')[3].click()
        time.sleep(2)

        try:
            alert = driver.switch_to_alert()
            alert.accept()
            print ("alert accepted")
            assert True == True

        except:
            print('alert fail')
            assert False == True
        
        driver.get("http://localhost:3000/register")

    def test_02_register_success(self):

        driver = self.driver
        driver.get("http://localhost:3000/register")
        time.sleep(2)


        ran = int(random.random()*100000)

        ran = str(ran)

        email = 'e2etest'+ ran + '@hotmail.com'

        driver.find_element_by_id('email').send_keys(email) #please change

        driver.find_element_by_id('password').send_keys('123456')

        driver.find_element_by_id('confirm-password').send_keys('123456')

        driver.find_element_by_id('firstName').send_keys('e2e')

        driver.find_element_by_id('lastName').send_keys('test')

        driver.find_element_by_id('birthday').send_keys('17052542')

        time.sleep(2)

        driver.find_elements_by_class_name('MuiButton-label')[3].click()

        time.sleep(4)

        try:
            alert = driver.switch_to_alert()
            alert.accept()
            print ("alert accepted")
            assert True == True

        except:
            print('alert fail')
            assert False == True

        time.sleep(2)

        assert 'All Jobs' == driver.find_element_by_id('dashboard-title').text
        
        time.sleep(5)
        

    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
        cls.driver.quit()
        print("complete")

if __name__ == '__main__':
    unittest.main()