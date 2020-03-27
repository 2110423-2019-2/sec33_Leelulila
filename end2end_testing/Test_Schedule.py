from Login import Login
from selenium import webdriver
import time
import unittest
class Test_Login(unittest.TestCase):

    beforeScheduleElement=0
    
    @classmethod
    def setUpClass(cls):
        try:
            cls.driver = webdriver.Chrome("./chromedriver")
        except:
            cls.driver = webdriver.Chrome("./chromedriver.exe")
        cls.driver.implicitly_wait(10)
        cls.driver.maximize_window()

    def test_01_apply_job_then_add_in_pending_job(self):

        driver = self.driver
                                                #login#
        driver.get("http://localhost:3000/login")
        time.sleep(2)
        driver.find_element_by_id('email').send_keys('teemotest1@gmail.com')
        driver.find_element_by_id('pass').send_keys('123456')
        driver.find_element_by_id('loginBtn').click()
        time.sleep(2)
                                                #create job#

        driver.get("http://localhost:3000/Createjob")
        time.sleep(1)

        driver.find_element_by_id('jobname').send_keys('scheduletest')                
        
        driver.find_element_by_id('amount').send_keys('5')

        driver.find_element_by_id('jobdescription').send_keys('scheduletest')

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

                                                #logout#         
        driver.find_element_by_id('logout').click()

                                                #login# 
        driver.get("http://localhost:3000/login")
        time.sleep(2)
        driver.find_element_by_id('email').send_keys('teemotest2@gmail.com')
        driver.find_element_by_id('pass').send_keys('123456')
        driver.find_element_by_id('loginBtn').click()
        time.sleep(2)
                                                #apply new job compare before after job elements# 

        driver.get("http://localhost:3000/Schedule")
        time.sleep(2)

        print(len(driver.find_elements_by_class_name('MuiListItemText-root')),' elements')
        beforeElement = len(driver.find_elements_by_class_name('MuiListItemText-root'))
        time.sleep(2)

        print(len(driver.find_elements_by_class_name('rbc-event-content')),'schedule elements')
        self.beforeScheduleElement = len(driver.find_elements_by_class_name('rbc-event-content')),
        time.sleep(2)

        driver.get('http://localhost:3000/Dashboard')
        time.sleep(2)

        suggest_amount = len(driver.find_elements_by_class_name('MuiListSubheader-root.MuiListSubheader-sticky.MuiListSubheader-gutters'))
        new_index = -1 - suggest_amount
        while(True):
            driver.find_elements_by_class_name('MuiButton-label')[new_index].click()
            time.sleep(2)      
            if('APPLY' == driver.find_elements_by_class_name('MuiButton-label')[-1].text):
                driver.find_elements_by_class_name('MuiButton-label')[-1].click()
                time.sleep(2)
            elif('ALREADY APPLY' == driver.find_elements_by_class_name('MuiButton-label')[-1].text): break
            driver.get('http://localhost:3000/Dashboard')
            time.sleep(2)

        # driver.find_elements_by_class_name('MuiButton-label')[new_index].click()
        # time.sleep(2)   
        # driver.find_elements_by_class_name('MuiButton-label')[-1].click()
        # time.sleep(2)      

        driver.get("http://localhost:3000/Schedule")
        time.sleep(2)

        print(len(driver.find_elements_by_class_name('MuiListItemText-root')),' elements')
        afterElement = len(driver.find_elements_by_class_name('MuiListItemText-root'))
        print(beforeElement,' ',type(beforeElement) )
        beforeElement=int(beforeElement)+1
        afterElement=int(afterElement)
        print('before=',beforeElement,'after=',afterElement)
        assert beforeElement == afterElement
        time.sleep(2)
                                                        #logout#         
        driver.find_element_by_id('logout').click()

        print('Finish1')

    def test_02_accept_job_then_add_in_schedule(self):
                                                                        #login and accept# 

        driver = self.driver
        driver.get("http://localhost:3000/login")
        time.sleep(2)

        driver.find_element_by_id('email').send_keys('teemotest1@gmail.com')

        driver.find_element_by_id('pass').send_keys('123456')

        driver.find_element_by_id('loginBtn').click()
        time.sleep(2)
        
        driver = self.driver

        driver.get("http://localhost:3000/JobOwned")
        time.sleep(2)

        driver.find_elements_by_class_name('MuiButton-label')[10].click()
        time.sleep(2)

        driver.find_elements_by_class_name('MuiListItemText-root')[10].click()
        time.sleep(1)

        # driver.find_elements_by_class_name('MuiButton-label')[10].click()
        # time.sleep(2)


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
        driver.get("http://localhost:3000/Dashboard")
        time.sleep(1)
                                                                            #logout#         
        driver.find_element_by_id('logout').click()

                                                                            #login# 
        driver.get("http://localhost:3000/login")
        time.sleep(2)
        driver.find_element_by_id('email').send_keys('teemotest2@gmail.com')
        driver.find_element_by_id('pass').send_keys('123456')
        driver.find_element_by_id('loginBtn').click()
        time.sleep(2)
                                                                     #count accept job in schedule# 

        driver.get("http://localhost:3000/Schedule")
        time.sleep(2)

        print(len(driver.find_elements_by_class_name('rbc-event-content')),'schedule elements')
        afterScheduleElement = len(driver.find_elements_by_class_name('rbc-event-content'))
        time.sleep(2)
        self.beforeScheduleElement=int(self.beforeScheduleElement)+1
        afterScheduleElement=int(afterScheduleElement)
        print('beforeScheduleElement=',self.beforeScheduleElement,'afterScheduleElement=',afterScheduleElement)
        assert self.beforeScheduleElement == afterScheduleElement
        time.sleep(2)
                                                                #logout#         
        driver.find_element_by_id('logout').click()

                                                             #Delete new job# 
        driver = self.driver
        driver.get("http://localhost:3000/login")
        time.sleep(2)

        driver.find_element_by_id('email').send_keys('teemotest1@gmail.com')

        driver.find_element_by_id('pass').send_keys('123456')

        driver.find_element_by_id('loginBtn').click()
        time.sleep(2)

        driver.get("http://localhost:3000/JobOwned")
        time.sleep(2)

        driver.find_elements_by_class_name('MuiButton-label')[10].click()
        time.sleep(2)

        print(len(driver.find_elements_by_class_name('MuiListItemText-root')))
        driver.find_elements_by_class_name('MuiListItemText-root')[7].click()
        time.sleep(5)        

        print('Finish2')



    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
        cls.driver.quit()
        print("complete")

if __name__ == '__main__':
    unittest.main()