# Jack's Garden Admin Panel

Jack's Garden Admin Panel was created with react and react-bootstrap. It is the admin dashboard of Jack's Garden Online Shop.
The backend is served at [https://jacks-garden-server.herokuapp.com](https://jacks-garden-server.herokuapp.com)

The admin can login, logout to the site, create/read/update/delete product, create/read/update/delete customer account,
read/delete orders and update order status.

You can find the backend code of this project on [https://github.com/2016lisali/jacks_garden_server](https://github.com/2016lisali/jacks_garden_server) and the online store code on [https://github.com/2016lisali/jacks_garden](https://github.com/2016lisali/jacks_garden)

![project image](https://github.com/2016lisali/lisali/blob/main/public/assets/jacks_garden_admin_panel_responsive.jpg)

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
3. Cd to client folder in terminal and start client server
   ```sh
   npm start
   ```

The webpage will be served at http://localhost:3000

<p align="right">(<a href="#top">back to top</a>)</p>

## Roadmap

- [x] Add Ny Account page
- [x] Add back to top links
- [ ] Add Filter and Sort function for products/customers/orders pages
- [ ] Create function to allow editing Announcement message in admin panel,
      fetching and displaying the message in the store site.
- [ ] Add logging page
- [ ] delete images in the server

<p align="right">(<a href="#top">back to top</a>)</p>
