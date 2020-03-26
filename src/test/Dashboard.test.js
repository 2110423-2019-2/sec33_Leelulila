import React from 'react';
import { shallow, mount, render } from 'enzyme';
// import Dashboard from '../components/page/Dashboard';
// import ListingJobForm from '../components/ListingJobForm'

const mockDb = [
    {"_id":{"$numberInt":"162"},"job":{"JobName":"สอนเลข ขอพี่ชาย","JobDetail":"สอนเลขให้กับน้อง","Wages":"1000","Amount":"5","Location":"สยาม","BeginTime":"08:00","EndTime":"09:00","Date":"2020-02-04","CurrentEmployee":["teetiwatanatada@gmail.com","teemo@gmail.com","dragonmaster@eiei.com"],"CurrentAcceptedEmployee":["thus3@hotmail.com"],"Employer":"thus2@hotmail.com","Status":"Ready","TFvector":[{"$numberInt":"1"},{"$numberInt":"0"},{"$numberInt":"0"},{"$numberInt":"1"},{"$numberInt":"0"},{"$numberInt":"1"},{"$numberInt":"0"},{"$numberInt":"0"},{"$numberInt":"0"},{"$numberInt":"0"}]},"notify1":[],"notify2":[],"notify3":["thus3@hotmail.com"]}
    ,{"_id":{"$numberInt":"188"},"job":{"JobName":"testbyselenium","JobDetail":"testbyselenium","Wages":"500","Amount":"1","Location":"testbyselenium","BeginTime":"18:00","EndTime":"19:00","Date":"2020-03-21","CurrentEmployee":[],"CurrentAcceptedEmployee":[],"Employer":"e2etest@hotmail.com","Status":"Ready","TFvector":[{"$numberInt":"1"},{"$numberInt":"0"},{"$numberInt":"0"},{"$numberInt":"0"},{"$numberInt":"0"},{"$numberInt":"0"},{"$numberInt":"0"},{"$numberInt":"0"},{"$numberInt":"0"},{"$numberInt":"0"}]},"notify1":[],"notify2":[],"notify3":[]}
];
const mockSearch = "สอน";
const mockListing = [{"_id":{"$numberInt":"162"},"job":{"JobName":"สอนเลข ขอพี่ชาย","JobDetail":"สอนเลขให้กับน้อง","Wages":"1000","Amount":"5","Location":"สยาม","BeginTime":"08:00","EndTime":"09:00","Date":"2020-02-04","CurrentEmployee":["teetiwatanatada@gmail.com","teemo@gmail.com","dragonmaster@eiei.com"],"CurrentAcceptedEmployee":["thus3@hotmail.com"],"Employer":"thus2@hotmail.com","Status":"Ready","TFvector":[{"$numberInt":"1"},{"$numberInt":"0"},{"$numberInt":"0"},{"$numberInt":"1"},{"$numberInt":"0"},{"$numberInt":"1"},{"$numberInt":"0"},{"$numberInt":"0"},{"$numberInt":"0"},{"$numberInt":"0"}]},"notify1":[],"notify2":[],"notify3":["thus3@hotmail.com"]}]; 

// describe('<Dashboard />', () => {
//     it('should render without throwing an error', () => {
//       const component = shallow(<Dashboard />);
//       component.setState({
//           db: mockDb,
//           search: mockSearch,
//           user:"thus@hotmail.com",
//           ready: true,
//           listing: mockListing
//       })
//       expect(component.find(ListingJobForm).length).toBe(1);
//     });
//     it('should mount in a full DOM', () => {
//       const component = mount(<Dashboard />);
//       expect(component.find('#suggestionPlane').length).toBe(1);
//     });
//     it('should render to static HTML', () => {
//       const component = render(<Dashboard />);
//       expect(component.text()).toEqual('All Jobs');
//     });
//   });