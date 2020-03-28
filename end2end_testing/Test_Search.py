from selenium import webdriver
from Login import Login
import time
import unittest


class Test_Search(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        try:
            cls.driver = webdriver.Chrome("./chromedriver")
        except:
            cls.driver = webdriver.Chrome("./chromedriver.exe")
        cls.driver.implicitly_wait(10)
        cls.driver.maximize_window()

    def test01_search_normal(self):
        driver = self.driver
        login = Login(driver)
        login.logining()
        time.sleep(2)

        driver.find_element_by_id('Search').send_keys('end2endSearch')

        driver.find_element_by_id('SearchButton').click()
        time.sleep(2)

        driver.find_element_by_id('Search').clear()


    def test02_search_normal(self):
        driver = self.driver
        time.sleep(2)

        driver.find_element_by_id('Search').send_keys('end2endSearch2')

        driver.find_element_by_id('SearchButton').click()
        time.sleep(2)

        driver.find_element_by_id('Search').clear()

    def test03_search_blank(self):
        driver = self.driver
        time.sleep(2)

        driver.find_element_by_id('Search').send_keys('end2endSearch3')

        driver.find_element_by_id('SearchButton').click()
        time.sleep(2)

        driver.find_element_by_id('Search').clear()


    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
        cls.driver.quit()
        print("complete")

if __name__ == '__main__':
    unittest.main()
