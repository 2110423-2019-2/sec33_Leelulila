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

    def test_01_create_blog(self):
        
        driver = self.driver
                                                        #login#
        driver.get("http://localhost:3000/login")
        time.sleep(2)
        driver.find_element_by_id('email').send_keys('teemotest1@gmail.com')
        driver.find_element_by_id('pass').send_keys('123456')
        driver.find_element_by_id('loginBtn').click()
        time.sleep(2)
                                                        #count my blog#
        driver.get("http://localhost:3000/Blog")
        time.sleep(1)
        print(driver.find_element_by_id('yourblog').text,'thisis yourblog')
        driver.find_element_by_id('yourblog').click()
        time.sleep(1)
        before_own_blog_amount = len(driver.find_elements_by_id('ListingJobForm'))
        time.sleep(1)
                                                        #create blog#
        driver.get("http://localhost:3000/Blog")
        time.sleep(1)
        #print(driver.find_elements_by_class_name('MuiButton-label')[10].text)
        driver.find_elements_by_class_name('MuiButton-label')[10].click()  
        time.sleep(2) 
        driver.find_element_by_id('blogname').send_keys('BLOG TEST')
        driver.find_element_by_id('topic').send_keys('Test')
        driver.find_element_by_id('image').send_keys('https://www.designwall.com/wp-content/uploads/edd/2018/03/notification-704x440.jpg')
        driver.find_element_by_id('detail').send_keys('This is Blog Test This is Blog Test This is Blog Test')
        driver.find_elements_by_class_name('MuiButton-label')[-1].click()  
        time.sleep(2)         
        time.sleep(1)
        driver.switch_to.alert.accept()
        time.sleep(1)
                                                                #count my blog#
        driver.get("http://localhost:3000/Blog")        
        driver.find_element_by_id('yourblog').click()
        time.sleep(1) 
        after_own_blog_amount = len(driver.find_elements_by_id('ListingJobForm'))
        time.sleep(1)
        print('before_own_blog_amount = ',before_own_blog_amount,'after_own_blog_amount = ',after_own_blog_amount)

        assert before_own_blog_amount+1 == after_own_blog_amount
        time.sleep(2)
        print('Finish1')    
    
    def test_02_comment(self):
        driver = self.driver        

        before_comment_amount = len(driver.find_elements_by_class_name('content'))

        driver.find_element_by_class_name('textarea').send_keys('this is comment test')
        time.sleep(1)
        driver.find_elements_by_id('submit')[0].click()
        time.sleep(2)

        after_comment_amount = len(driver.find_elements_by_class_name('content'))

        print('before_comment_amount = ',before_comment_amount,'after_comment_amount = ',after_comment_amount)
        assert before_comment_amount+1 == after_comment_amount
        time.sleep(2)
        print('Finish2') 

    def test_03_delete_blog(self):
        driver = self.driver
        before_own_blog_amount = len(driver.find_elements_by_id('ListingJobForm'))
        driver.find_elements_by_class_name('MuiSvgIcon-root')[6].click()
        time.sleep(2)
        c=0
        driver.find_elements_by_class_name('MuiButton-label')[14].click()
        # for i in driver.find_elements_by_class_name('MuiButton-label'):
        #     print(i.text,'print',c)
        #     c+=1
        time.sleep(2)
        driver.find_elements_by_class_name('MuiButton-label')[15].click()
        time.sleep(2)
        after_own_blog_amount = len(driver.find_elements_by_id('ListingJobForm'))
        print('DELETE MODE before_own_blog_amount = ',before_own_blog_amount,'after_own_blog_amount = ',after_own_blog_amount)

        assert before_own_blog_amount-1 == after_own_blog_amount
        time.sleep(2)
        print('Finish1') 



    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
        cls.driver.quit()
        print("complete")

if __name__ == '__main__':
    unittest.main()