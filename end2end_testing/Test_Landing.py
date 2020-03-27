from Login import Login
from selenium import webdriver
import time
import unittest

class Test_Landing(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        try:
            cls.driver = webdriver.Chrome("./chromedriver")
        except:
            cls.driver = webdriver.Chrome("./chromedriver.exe")
        cls.driver.implicitly_wait(10)
        cls.driver.maximize_window()

    def test_landing(self):
        driver = self.driver
        driver.get("http://localhost:3000/")
        time.sleep(3)
        
        assert "WELCOME TO CU PART-TIME!" == driver.find_element_by_id('title').text

    def test_NavBar(self):
        driver = self.driver
        driver.get("http://localhost:3000/")
        time.sleep(3)

        assert "CU PART-TIME" == driver.find_element_by_id('NavBarLogo').text

    def test_Btn(self):
        driver = self.driver
        driver.get("http://localhost:3000/")
        time.sleep(3)
        driver.find_elements_by_class_name("MuiButton-label")[1].click()
        time.sleep(3)

        assert "Sign up for CU PART-TIME" == driver.find_element_by_id('title').text
        
    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
        cls.driver.quit()
        print("complete")

if __name__ == '__main__':
    unittest.main()