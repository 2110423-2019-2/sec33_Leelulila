from selenium import webdriver
import time

class Login():
    def __init__(self, driver):
        self.driver = driver

       

    def logining(self):

        self.driver.get("http://localhost:3000/")
        # self.driver.find_element_by_id("username").send_keys(Locators.id_login)
        time.sleep(10000)
        # self.driver.find_element_by_id("password").send_keys(Locators.pass_login)
        # time.sleep(1)
        # self.driver.find_element_by_id("loginBt").click()
        # time.sleep(1)

    # def logininghero6(self):
    #     self.driver.find_element_by_id("username").send_keys("hero6")
    #     time.sleep(1)
    #     self.driver.find_element_by_id("password").send_keys("hero6")
    #     time.sleep(1)
    #     self.driver.find_element_by_id("loginBt").click()
    #     time.sleep(1)