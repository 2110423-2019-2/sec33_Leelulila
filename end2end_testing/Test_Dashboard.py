from Login import Login
from Create_Job import Create_Job
from selenium import webdriver
import time
import unittest
class Test_Dashboard(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        try:
            cls.driver = webdriver.Chrome("./chromedriver")
        except:
            cls.driver = webdriver.Chrome("./chromedriver.exe")
        cls.driver.implicitly_wait(10)
        cls.driver.maximize_window()

    def test_01_already_Btn(self):
        
        driver = self.driver
        login = Login(driver)
        login.logining()
        time.sleep(2)

        print(len(driver.find_elements_by_class_name('MuiButton-label')))

        driver.find_elements_by_class_name('MuiButton-label')[10].click()
        time.sleep(5)      

        if(driver.find_elements_by_class_name('MuiButton-label')[-1].text != 'ALREADY APPLY'):
            driver.find_elements_by_class_name('MuiButton-label')[-1].click()
            time.sleep(2)

            driver.find_elements_by_class_name('MuiButton-label')[10].click()
            time.sleep(2)

        print(driver.find_elements_by_class_name('MuiButton-label')[-1].text)
        assert 'ALREADY APPLY' == driver.find_elements_by_class_name('MuiButton-label')[-1].text #Modal
        time.sleep(2)

        print('Finish1')

    def test_02_ready_Btn(self):
        driver = self.driver
        driver.get('http://localhost:3000/Dashboard')
        time.sleep(2)

        i = 15
        while(True):
            driver.find_elements_by_class_name('MuiButton-label')[i].click()
            time.sleep(2)      
            if('APPLY' == driver.find_elements_by_class_name('MuiButton-label')[-1].text):
                break
            i+=1
            driver.get('http://localhost:3000/Dashboard')
            time.sleep(2)

        driver.find_elements_by_class_name('MuiButton-label')[i].click()
        time.sleep(2) 

        assert 'APPLY' == driver.find_elements_by_class_name('MuiButton-label')[-1].text #Modal
        time.sleep(2)

        print('Finish2')

    def test_03_create_job(self):

        driver = self.driver
        driver.get("http://localhost:3000/Createjob")
        time.sleep(1)

        driver.find_element_by_id('jobname').send_keys('testbyselenium')                
        
        driver.find_element_by_id('amount').send_keys('5')

        driver.find_element_by_id('jobdescription').send_keys('testbyselenium')

        driver.find_element_by_id('timebegin').send_keys('1800')

        driver.find_element_by_id('timeend').send_keys('1900')

        driver.find_element_by_id('location').send_keys('testbyselenium')

        driver.find_element_by_id('workDate').send_keys('21032020')

        driver.find_element_by_id('wages').send_keys('500')

        driver.find_elements_by_class_name('PrivateSwitchBase-input-358')[0].click()        
        
        driver.find_elements_by_class_name("MuiButton-label")[-1].click()

        time.sleep(1)
        driver.switch_to.alert.accept()
        time.sleep(1)
        driver.switch_to.alert.accept()
        time.sleep(2)

        suggest_amount = len(driver.find_elements_by_class_name('MuiListSubheader-root.MuiListSubheader-sticky.MuiListSubheader-gutters'))
        own_index = -1 - suggest_amount
        driver.find_elements_by_class_name('MuiButton-label')[own_index].click()
        time.sleep(2)      

        assert 'OWNED' == driver.find_elements_by_class_name('MuiButton-label')[-1].text #Modal
        time.sleep(2)

        print('Finish3')

    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
        cls.driver.quit()
        print("complete")

if __name__ == '__main__':
    unittest.main()