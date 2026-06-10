# Furnify

> An interactive 3D furniture e-commerce platform that combines seamless shopping workflows with high-fidelity, real-time web-based 3D product visualization.

---

## Project Information

| Field | Details |
|-------|---------|
| Subject | Web Systems and Technologies |
| Academic Year | 2025-2026 |
| Project Category | Web Development / E-commerce / 3D Graphics |
| Instructor | Ma'am Divine Grace Caabay |

### Members

* Lawrence F. Magnetico
* John Paul D. Macanas

---

## Project Description

Furnify is a modern, full-stack e-commerce web application engineered to transform how users browse and purchase furniture online. By bridging traditional retail mechanics with cutting-edge 3D web graphics, Furnify provides customers with an interactive storefront where they can inspect item dimensions, materials, and designs from any angle before checkout. 

Built with scalability in mind, the platform uses Next.js for high-performance server rendering and optimized routing, backed by Supabase for robust database interactions, real-time state synchronization, and user session management. The application solves the limitations of flat 2D e-commerce catalogs by giving buyers a realistic, tactile sense of space and design, resulting in a highly immersive and confident shopping experience.

---

## Features

* **Interactive 3D Product Visualization:** Rotate, zoom, and inspect selected furniture models in full 3D space using an optimized WebGL runtime.
* **Dynamic Product Catalog:** Explore premium curated home collections structured cleanly by categories with smooth layout transitions.
* **Persistent Cart Management:** Add, update, and track furniture items seamlessly via an animated slide-out Cart Drawer and unified global state context.
* **Optimized Checkout Workflow:** A responsive, multi-step checkout form equipped with robust client-side validation and structured order parsing.
* **Secure Cloud Integration:** Built-in server-side authorization and reactive database tables to securely maintain customer profiles and purchase history.

---

## Technologies Used

* Next.js (App Router)
* React.js (v19)
* Three.js / React Three Fiber / Drei (3D Graphics Core)
* Supabase SSR & Database Client
* Tailwind CSS (Styling Engine)
* Framer Motion (Fluid Layout Animations)
* Radix UI Primitives (Accessible UI Components)

---

## Installation Guide

> Follow these steps to run the Furnify application locally on your machine.

1. **Clone the repository**
```bash
   git clone https://github.com/lawrens16/furnify.git
```

2. **Navigate into the project folder**
```bash
   cd furnify
```

3. **Install the dependencies**
```bash
   npm install
```

4. **Run the development server**
```bash
   npm run dev
```

5. Open your browser and navigate to `http://localhost:3000` to browse the shop!

---

## Screenshots

> Upload your screenshots inside the `screenshots/` folder and reference them here.

### Home Showcase
<!-- ![Home Showcase](screenshots/home.png) -->

### Product Catalog & Shop
<!-- ![Product Catalog](screenshots/catalog.png) -->

### Interactive 3D Viewer
<!-- ![3D Viewer](screenshots/viewer.png) -->

---

## Live Demo

**Live URL:** [https://furnify-psu.vercel.app/](https://furnify-psu.vercel.app/)

> ⚠️ **Notice:** If the live demo appears inaccessible or shows an error, the project instances may have been automatically paused due to platform inactivity limits on Vercel or the Supabase free-tier database. Please notify the owner, Lawrence Magnetico, to wake or restart the deployment instances.

---

## Video Demonstration **(N/A)**

---

## Future Improvements

* **Custom AR Room Placement:** Integrate WebXR capabilities to let users view 3D furniture configurations inside their own room using a mobile camera.
* **Interactive Custom Room Builder:** Create a draggable canvas layout allowing buyers to map their floor dimensions and arrange multiple furniture products together.
* **Real-time Order Status Tracking:** Introduce transactional email updates and live delivery tracking dashboards for customer convenience.
