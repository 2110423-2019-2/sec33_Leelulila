from Login import Login
from Create_Job import Create_Job
from selenium import webdriver
import time
import unittest
class Test_Dashboard(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome("/Users/thusk/Documents/CP/Project/SE/sec33_Leelulila/end2end_testing/chromedriver")
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

        print(driver.find_elements_by_class_name('MuiButton-label')[-1].text)
        assert 'ALREADY APPLY' == driver.find_elements_by_class_name('MuiButton-label')[-1].text #Modal
        time.sleep(2)

        print('Finish1')

    def test_02_ready_Btn(self):
        driver = self.driver
        driver.get('http://localhost:3000/Dashboard')
        time.sleep(2)

        
        driver.find_elements_by_class_name('MuiButton-label')[11].click()
        time.sleep(2)      

        assert 'APPLY' == driver.find_elements_by_class_name('MuiButton-label')[-1].text #Modal
        time.sleep(2)

        print('Finish2')
    
    def test_03_owner_Btn(self):
        driver = self.driver
        driver.get('http://localhost:3000/Dashboard')
        time.sleep(2)

        
        driver.find_elements_by_class_name('MuiButton-label')[-4].click()
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