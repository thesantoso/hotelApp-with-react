# hotelApp

Hotel App built with React Native.
This project is completed to fulfil the final project 3 of Studi Independen React & React Native for Front End Developer Hacktiv8, Kampus Merdeka.
It's far away from perfect but it's worth to be the medium of practicing React Native.

STATUS: COMPLETED


## API

https://rapidapi.com/apidojo/api/hotels4/


## FEATURES

- Search with keywords
- Popular Hotels
- Booking (minus payment system)
- Login & Profile (with ability to update profile information)
- Wishlist
- View Hotel Detail (Image, Location, Facilities, and Price per night)


## LOGIN INFORMATION

username: testing
password: 123456789


## USER INTERFACE

**Home**

![WhatsApp Image 2022-05-26 at 10 01 27 PM](https://user-images.githubusercontent.com/53704057/170504084-bb1fabd8-2afb-4c63-b556-61b9e9955e07.jpeg)

**Profile (Not login yet)**

![WhatsApp Image 2022-05-26 at 10 01 28 PM](https://user-images.githubusercontent.com/53704057/170504177-61755e8d-4a6b-4c92-b591-5fcd4e6894cc.jpeg)

**Profile**

![WhatsApp Image 2022-05-26 at 10 01 33 PM](https://user-images.githubusercontent.com/53704057/170504550-07dc0843-f9ba-4f2a-90bc-64600f9f11ff.jpeg)

**Settings**

![WhatsApp Image 2022-05-26 at 10 01 29 PM (1)](https://user-images.githubusercontent.com/53704057/170504232-49a90aca-44bb-4e18-a5d0-29f62abc1345.jpeg)

**Login**

![WhatsApp Image 2022-05-26 at 10 01 29 PM](https://user-images.githubusercontent.com/53704057/170504277-29ecfcc5-0805-4457-9db7-5aeccb3b5119.jpeg)

**Hotel Detail**

![WhatsApp Image 2022-05-26 at 10 01 30 PM (1)](https://user-images.githubusercontent.com/53704057/170504328-2dde0630-cce6-487f-a2c5-89947a9ffa9e.jpeg)

**Wishlist**

![WhatsApp Image 2022-05-26 at 10 01 30 PM](https://user-images.githubusercontent.com/53704057/170504356-b94edbf6-f86e-46f4-8cba-8d6fb837b79f.jpeg)

**Booking**

![WhatsApp Image 2022-05-26 at 10 01 31 PM](https://user-images.githubusercontent.com/53704057/170504401-58f6393a-eac4-4141-b724-dfd18e709d81.jpeg)

**Search**

![WhatsApp Image 2022-05-26 at 10 01 32 PM (1)](https://user-images.githubusercontent.com/53704057/170504431-6124db7a-3d01-42ad-9db6-ba69d1c32ff6.jpeg)

**Loading**

![WhatsApp Image 2022-05-26 at 10 01 32 PM](https://user-images.githubusercontent.com/53704057/170504480-3f187b23-d1cd-4a40-b080-645efb45bff0.jpeg)


## NOTES & LIMITATIONS

- There's a case (rarely happen) where the Hotel Detail wouldn't appear due to the fetching problem, some Hotels after being fetched don't generate the same object structure as the others which cause the screen error cause they don't get a specific object values
- When we select ex: Jakarta card (to display Hotels in Jakarta), the results isn't actually Hotels in Jakarta but Hotels with word "Jakarta" in it. This happen because the API search based on query, even though in the documentation we could put country words for the query itself.
- Only Popular Hotels could get added to wishlist, since Hotels object between fetching from API Popular Hotels is different with fetching from API Search Hotels. I couldn't get it work to have them in 1 array cause they would display differently in Wishlist.
- Searched hotels would appear with the same images due to the fetching result didn't have the object structure where image thumbnail is provided, but in Popular Hotels objects they have it.
- When you book a hotel with wrong information (ex: wrong email format), the app doesn't display any error, the error sign only by unworking Book Now button (you wouldn't get to the Home)
