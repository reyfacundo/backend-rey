# CoderHouse Backend 1 - Rey

---

##  Live Preview  
[https://backend-rey.onrender.com/](https://backend-rey.onrender.com/)

---

##  Features  

### **Views**
- `/` — **Products view** with pagination.  
- `/realtimeproducts` — Live-updating product list using **Socket.io**, plus pagination and a form for product posting.  
- `/contact` — Static contact page.  

---

### **Products API**
- `GET /api/products`  
  → Get all products (supports `?limit` and `?page` query params for pagination).  
- `GET /api/products/:pid`  
  → Get a product by its ID.  
- `POST /api/products`  
  → Add a new product (supports file upload for thumbnails).
   #### Example JSON (if not uploading a file):
  ```json
  {
    "title": "Sample Product",
    "description": "A great item",
    "category": "Electronics",
    "code": "ABC123",
    "stock": 10,
    "price": 99.99,
    "status": true
  }
- `PUT /api/products/:pid`  
  → Update an existing product by ID.  
- `DELETE /api/products/:pid`  
  → Delete a product by ID.  

---

### **Carts API**
- `POST /api/carts`  
  → Create a new cart.  
- `GET /api/carts`  
  → Get all carts.  
- `GET /api/carts/:cid`  
  → Get a specific cart and its products by ID.  
- `POST /api/carts/:cid/product/:pid`  
  → Add a product to a cart (accepts `quantity` in the body).  

---

##  Tech Stack  
- **Node.js** + **Express** for backend and routing.  
- **MongoDB** + **Mongoose** for database and models.  
- **Handlebars** for server-side rendering.  
- **Socket.io** for real-time updates.  
- **Multer** for file uploads.  

---

##  Getting Started  

1. Clone the repo:
   ```bash
   git clone https://github.com/reyfacundo/backend-rey.git

2. Install dependencies:
   ```bash
   cd backend-rey
   npm install
   npm run dev
