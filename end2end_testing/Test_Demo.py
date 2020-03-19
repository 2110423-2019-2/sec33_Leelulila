from automated_web_test_Drive.Locators.locators_01 import Locators
from  automated_web_test_Drive.Pages.login_page import Login
from selenium.webdriver.support.ui import Select
from selenium import webdriver
import time
import unittest
class test_01_remaining_code(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome("C:/Users/USER/PycharmProjects/System_Stone_Drive/chromedriver.exe")
        cls.driver.implicitly_wait(10)
        cls.driver.maximize_window()

    def test_remaining_code(self):
        driver = self.driver
        login2 = Login(driver)
        login2.logining()
        time.sleep(3)


        driver.find_element_by_css_selector(Locators.eq_list_and_device_css).click()
        time.sleep(3)

        #assert for check this page is eq and device Home
        assert "รายชื่ออุปกรณ์ / เครื่องจักร" == driver.find_element_by_css_selector(Locators.eq_and_device_Home_css).text



                                            ##################
                                            #1.remaining_code#
                                            ##################

        driver.find_element_by_id(Locators.remaining_code_id).click()
        time.sleep(3)



        driver.find_element_by_css_selector(Locators.barcode_css).click()
        time.sleep(2)




                                        #########################
                                        #2.add_reponsible_person#
                                        #########################

        driver.find_element_by_id(Locators.add_reponsible_person_id).click()
        time.sleep(2)

        #assert for check this page is step1
        assert "ขั้นตอน 1 : เลือกผู้รับผิดชอบหลัก" == driver.find_element_by_css_selector(Locators.check_step1_css).text
        time.sleep(2)

        #press 'next' when no selevt person
        driver.find_element_by_id(Locators.next_to_step_2_id).click()
        assert driver.find_element_by_id(Locators.show_no_select_person_display_id).is_displayed() == True
        time.sleep(2)

        #Select person to respon equipment
        driver.find_element_by_css_selector(Locators.select_person_css).click()
        time.sleep(2)
        driver.find_element_by_id(Locators.next_to_step_2_id).click()
        time.sleep(2)

        #assert for check this page is step2
        assert "ขั้นตอน 2 : ระบุอุปกรณ์และเครื่องจักร" == driver.find_element_by_css_selector(Locators.check_step2_css).text

        #press show info. with none select location
        driver.find_element_by_id(Locators.display_tool_id).click()
        assert driver.find_element_by_id(Locators.show_no_select_location_display_id).is_displayed() == True
        time.sleep(2)

        #Select Tools
        driver.find_element_by_css_selector(Locators.select_defult_css).click()
        time.sleep(2)
        Select(driver.find_element_by_css_selector(Locators.select_defult_css)).select_by_value("195")
        time.sleep(2)
        driver.find_element_by_id(Locators.display_tool_id).click()
        time.sleep(2)

        #press show info. with none select tools
        driver.find_element_by_id(Locators.next_to_step_3_id).click()
        assert driver.find_element_by_id(Locators.show_no_select_tool_display_id).is_displayed() == True
        time.sleep(2)
        driver.find_elements_by_css_selector(Locators.select_equipment_css)[0].click()
        driver.find_elements_by_css_selector(Locators.select_equipment_css)[1].click()
        time.sleep(2)
        driver.find_element_by_id(Locators.next_to_step_3_id).click()
        time.sleep(2)

        #assert for check this page is step3
        assert "ขั้นตอน 3 ตรวจสอบข้อมูล" == driver.find_element_by_css_selector(Locators.check_step3_css).text
        time.sleep(2)

        #click_confirm
        driver.find_element_by_id(Locators.confirm_Btn_id).click()
        time.sleep(2)

        #assert for check display is appear
        assert driver.find_element_by_id(Locators.result_display_id).is_displayed() == True

        #return_Home
        driver.find_element_by_css_selector(Locators.return_eq_list_and_device_css).click()
        time.sleep(4)

        #assert for check this page is eq and device Home
        assert "รายชื่ออุปกรณ์ / เครื่องจักร" == driver.find_element_by_css_selector(Locators.eq_and_device_Home_css).text




                                            ###################
                                            #3.show 10 records#
                                            ###################

        #assert for check dufult is "แสดง 10 รายการ"
        assert "แสดง 10 รายการ" == driver.find_element_by_css_selector(Locators.show_now_records_css).text

        #change 10 records to 100 records
        driver.find_element_by_css_selector(Locators.show_now_records_css).click()
        time.sleep(2)
        driver.find_elements_by_css_selector(Locators.show_records_css)[1].click()

        #assert for check now is "แสดง 100 รายการ"
        assert "แสดง 100 รายการ" == driver.find_element_by_css_selector(Locators.show_now_records_css).text
        time.sleep(2)

        #change 100 records to 300 records
        driver.find_element_by_css_selector(Locators.show_now_records_css).click()
        time.sleep(2)
        driver.find_elements_by_css_selector(Locators.show_records_css)[2].click()

        #assert for check now is "แสดง 300 รายการ"
        assert "แสดง 300 รายการ" == driver.find_element_by_css_selector(Locators.show_now_records_css).text
        time.sleep(2)

        #change 300 records to 10 records
        driver.find_element_by_css_selector(Locators.show_now_records_css).click()
        time.sleep(2)
        driver.find_elements_by_css_selector(Locators.show_records_css)[0].click()

        #assert for check now is "แสดง 10 รายการ"
        assert "แสดง 10 รายการ" == driver.find_element_by_css_selector(Locators.show_now_records_css).text
        time.sleep(2)




                                        ###################
                                        #4.excel download #
                                        ###################

        driver.find_element_by_css_selector(Locators.download_exel_css).click()
        time.sleep(2)



                                    #######################
                                    #5.print current page #
                                    #######################
        driver.find_element_by_css_selector(Locators.print_current_page_css).click()
        time.sleep(2)

        driver.switch_to.window(driver.window_handles[0])
        time.sleep(4)


                                    ####################
                                    #6.certificate file#
                                    ####################
        driver.find_elements_by_css_selector(Locators.certificate_file_css)[0].click()
        time.sleep(2)

        assert driver.find_element_by_id(Locators.heading_certificate_id).is_displayed() == True
        time.sleep(2)

        driver.find_element_by_css_selector(Locators.close_certificate_css).click()
        time.sleep(2)

                                    ###############
                                    #7.Manual File#
                                    ###############

        driver.find_elements_by_css_selector(Locators.certificate_file_css)[1].click()
        time.sleep(2)

        assert driver.find_element_by_css_selector(Locators.heading_manual_css).is_displayed() == True
        time.sleep(2)

        driver.find_element_by_css_selector(Locators.close_manual_css).click()
        time.sleep(4)

    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
        cls.driver.quit()
        print("complete")

if __name__ == '__main__':
    unittest.main()