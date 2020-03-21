from selenium import webdriver
import time

class Login():
    def __init__(self, driver):
        self.driver = driver

       

    def logining(self):

        driver = self.driver
        driver.get("http://localhost:3000/login")
        time.sleep(1)

        driver.find_element_by_id('email').send_keys('e2etest@hotmail.com')

        driver.find_element_by_id('pass').send_keys('123456')
        time.sleep(1)

        driver.find_element_by_id('loginBtn').click()
        time.sleep(3)
