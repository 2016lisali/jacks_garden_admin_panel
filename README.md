# Jack's Garden Admin Panel

Jack's Garden Admin Panel was created with react and react-bootstrap. It is the admin dashboard of Jack's Garden Online Shop.
The backend is served on [https://jacks-garden-server.herokuapp.com](https://jacks-garden-server.herokuapp.com)

Via the admin panel, the admin can:

- login, logout to the site
- create/read/update/delete product
- create/read/update/delete user account (exclude password)
- read/delete orders and update order status.
- read mailing list, send emails to customers

You can find the backend code of this project on [https://github.com/2016lisali/jacks_garden_server](https://github.com/2016lisali/jacks_garden_server) and the online store code on [https://github.com/2016lisali/jacks_garden](https://github.com/2016lisali/jacks_garden)

![project image](https://github.com/2016lisali/lisas_portfolio/blob/main/public/assets/jacks_garden_admin_panel_responsive.jpg)

## Features

- responsive design, display well on mobiles, tablets, laptops and desktops
- all input data will be sanitized in frontend and validated at backend before inserted into database.
- the password will be hashed before inserted into database.

<p align="right">(<a href="#top">back to top</a>)</p>

## Build With

- React
- React-router-dom
- Redux
- Redux/toolkit
- React-bootstrap
- react-chartjs-2
- Sass
- React-hook-form
- parcel
- parcel/service-worker
- yup
- axios
- bcrypt

<p align="right">(<a href="#top">back to top</a>)</p>

## Try it

You can find the demo [here](https://jacksgardenadmin.netlify.app/)

<p align="right">(<a href="#top">back to top</a>)</p>

## How to run the app

1. Either clone or download the app and open the folder in the CLI

   ```sh
   git clone https://github.com/2016lisali/jacks_garden_admin_panel.git
   ```

2. Install all dependencies
   ```sh
   npm install
   ```
3. 3. Create a `.env` file in root folder and enter following fields

   ```env
   PORT = YOUR_PORT_NUMBER
   REACT_APP_BASE_URL_LOCAL = YOUR_SERVER_URL (this is the address of your local server, make sure the server is running)
   REACT_APP_SERVICE_ID = YOUr_EMAILJS_SERVICE_ID
   REACT_APP_TEMPLATE_ID = YOUr_EMAILJS_TEMPLATE_ID
   REACT_APP_PUBLIC_KEY = YOUr_EMAILJS_PUBLIC_KEY
   ```

4. Cd to client folder in terminal and start client server
   ```sh
   npm start
   ```

The webpage will be served at http://localhost:3000

<p align="right">(<a href="#top">back to top</a>)</p>

## Roadmap

- [x] Add Pagination
- [x] Add search bar for products, customers and orders section (30-04-2022)
- [x] Add mailing list section and the functionality of sending emails to the email addresses in the list (20-05-2022)
- [ ] Add Filter and Sort function for products/customers/orders pages (30-06-2022)
- [ ] Create function to allow editing Announcement message in admin panel,
      fetching and displaying the message in online store. (30-06-2022)
- [ ] Add logging page (15-07-2022)
- [ ] Allow admin upload multiple product images (31-07-2022)
- [ ] delete images in the server (15-08-2022)

<p align="right">(<a href="#top">back to top</a>)</p>
