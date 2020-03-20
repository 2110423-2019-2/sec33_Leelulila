from Login import Login
from selenium import webdriver
import time
import unittest
class Test_Login(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome("/Users/thusk/Documents/CP/Project/SE/sec33_Leelulila/end2end_testing/chromedriver")
        cls.driver.implicitly_wait(10)
        cls.driver.maximize_window()

    def test_login_fail(self):
        driver = self.driver
        driver.get("http://localhost:3000/login")
        time.sleep(2)

        driver.find_element_by_id('email').send_keys('drive@hotmail.com')
        time.sleep(2)

        driver.find_element_by_id('pass').send_keys('12345')
        time.sleep(2)

        driver.find_element_by_id('loginBtn').click()
        time.sleep(5)

        try:
            alert = driver.switch_to_alert()
            alert.accept()
            print ("alert accepted")
            assert True == True

        except:
            print('alert fail')
            assert False == True

        
        

    def test_login_success(self):
        driver = self.driver
        driver.get("http://localhost:3000/login")
        time.sleep(2)

        driver.find_element_by_id('email').send_keys('drive@hotmail.com')
        time.sleep(2)

        driver.find_element_by_id('pass').send_keys('123456')
        time.sleep(2)

        driver.find_element_by_id('loginBtn').click()
        time.sleep(5)
        
        

    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
        cls.driver.quit()
        print("complete")
        

    if __name__ == '__main__':
        unittest.main()