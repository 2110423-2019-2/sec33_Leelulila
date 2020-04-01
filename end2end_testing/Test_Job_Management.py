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

        driver.find_element_by_id('email').send_keys('waris46842@hotmail.com')

        driver.find_element_by_id('pass').send_keys('4684246842')

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

        driver.get("http://localhost:3000/JobHistory")

    def test_04_management_edit_Btn_Discard(self):

        ran = int(random.random()*100)

        ran1 = str(ran)

        ran2 = str(ran)

        ran3 = str(ran)

        list1 = ['01-01-2020','02-02-2020','03-03-2020','04-04-2020','05-05-2020','06-06-2020','07-07-2020','08-08-2020','09-09-2020','10-10-2020','11-11-2020','12-12-2020',]

        list2 = ['01:1010','02:1010','03:1010','04:1010','05:1010','06:1010']

        list3 = ['02:1020','03:1020','04:1020','05:1020','06:1020','07:1020']

        driver = self.driver

        driver.get("http://localhost:3000/JobOwned")
        time.sleep(2)

        x = driver.find_element_by_id('detail')

        driver.find_elements_by_class_name('MuiButton-label')[10].click()
        time.sleep(2)

        driver.find_elements_by_class_name('MuiListItemText-root')[11].click()
        time.sleep(2)

        driver.find_element_by_id('Detail').send_keys(ran1)
        time.sleep(2)
        driver.find_element_by_id('Wages').send_keys(ran2)
        time.sleep(2)
        driver.find_element_by_id('Location').send_keys(ran3)
        time.sleep(2)
        driver.find_element_by_id('WorkDate').send_keys(random.choice(list1))
        time.sleep(2)
        driver.find_element_by_id('TimeBegin').send_keys(random.choice(list2))
        time.sleep(2)
        driver.find_element_by_id('TimeEnd').send_keys(random.choice(list3))
        time.sleep(5)

        driver.find_element_by_id('Discard').click()

        y = driver.find_element_by_id('detail')

        assert x==y

    def test_05_management_edit_Btn_Save(self):

        ran = int(random.random()*100)

        ran1 = str(ran)

        ran2 = str(ran)

        ran3 = str(ran)

        list1 = ['01-01-2020','02-02-2020','03-03-2020','04-04-2020','05-05-2020','06-06-2020','07-07-2020','08-08-2020','09-09-2020','10-10-2020','11-11-2020','12-12-2020',]

        list2 = ['01:1010','02:1010','03:1010','04:1010','05:1010','06:1010']

        list3 = ['02:1020','03:1020','04:1020','05:1020','06:1020','07:1020']


        driver = self.driver

        driver.get("http://localhost:3000/JobOwned")

        x = driver.find_element_by_id('detail')

        driver.find_elements_by_class_name('MuiButton-label')[10].click()
        time.sleep(2)

        driver.find_elements_by_class_name('MuiListItemText-root')[11].click()
        time.sleep(2)

        driver.find_element_by_id('Detail').send_keys(ran1)
        time.sleep(2)
        driver.find_element_by_id('Wages').send_keys(ran2)
        time.sleep(2)
        driver.find_element_by_id('Location').send_keys(ran3)
        time.sleep(2)
        driver.find_element_by_id('WorkDate').send_keys(random.choice(list1))
        time.sleep(2)
        driver.find_element_by_id('TimeBegin').send_keys(random.choice(list2))
        time.sleep(2)
        driver.find_element_by_id('TimeEnd').send_keys(random.choice(list3))
        time.sleep(5)

        driver.find_element_by_id('Save').click()

        driver.get("http://localhost:3000/JobOwned")
        time.sleep(2)

        y = driver.find_element_by_id('detail')

        assert x!=y



    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
        cls.driver.quit()
        print("complete")

if __name__ == '__main__':
    unittest.main()