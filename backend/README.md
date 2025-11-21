# Todo Tracker Backend

Backend API untuk aplikasi Todo Tracker menggunakan Node.js, Express.js, Sequelize, dan SQLite.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM untuk database
- **SQLite** - Database (file-based)

## Struktur Project

```
backend/
├── config/
│   └── database.js          # Konfigurasi Sequelize
├── models/
│   └── Todo.js              # Model Todo dengan validations
├── migrations/
│   └── 20240101000000-create-todos.js  # Migration untuk create table
├── routes/
│   └── todos.js             # API routes untuk todos
├── middleware/
│   └── errorHandler.js      # Error handling middleware
├── server.js                 # Entry point aplikasi
└── package.json
```

## Setup & Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Run Migrations

Jalankan migration untuk membuat tabel di database:

```bash
npm run migrate
```

Atau menggunakan sequelize-cli langsung:

```bash
npx sequelize-cli db:migrate
```

### 3. Start Server

**Development mode (dengan auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server akan berjalan di `http://localhost:3001`

## API Endpoints

### Base URL
```
http://localhost:3001
```

### Endpoints

#### 1. GET /todos
Mendapatkan semua todos

**Response:**
```json
[
  {
    "id": 1,
    "title": "Learn Node.js",
    "description": "Study Express and Sequelize",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### 2. POST /todos
Membuat todo baru

**Request Body:**
```json
{
  "title": "Learn Node.js",
  "description": "Study Express and Sequelize"
}
```

**Response (201):**
```json
{
  "id": 1,
  "title": "Learn Node.js",
  "description": "Study Express and Sequelize",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### 3. PUT /todos/:id
Update todo

**Request Body (semua field optional):**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Updated title",
  "description": "Updated description",
  "completed": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### 4. DELETE /todos/:id
Hapus todo

**Response (204):** No content

### Error Responses

**400 Bad Request:**
```json
{
  "error": "Title is required"
}
```

**404 Not Found:**
```json
{
  "error": "Todo not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error"
}
```

## Database

Database SQLite akan dibuat otomatis sebagai file `database.sqlite` di folder `backend/` saat pertama kali menjalankan migration.

### Reset Database

Jika ingin reset database, hapus file `database.sqlite` dan jalankan migration lagi:

```bash
rm database.sqlite
npm run migrate
```

## Validation

- **title**: Required, tidak boleh kosong
- **description**: Optional
- **completed**: Default `false`, boolean

## Design Decisions

1. **SQLite**: Dipilih karena tidak perlu setup database server, cocok untuk development skala kecil
2. **Sequelize**: ORM yang mudah digunakan dengan validations built-in
3. **Migrations**: Menggunakan migrations untuk version control database schema
4. **Error Handling**: Centralized error handling middleware untuk konsistensi response
5. **CORS**: Enabled untuk development (bisa di-disable untuk production)

## Possible Improvements

1. **Authentication**: Tambahkan JWT untuk user authentication
2. **Pagination**: Implement pagination untuk GET /todos
3. **Filtering**: Tambahkan filter by completed status
4. **Search**: Implement search untuk kedepannya kalau mau dibuat serius.
5. **Rate Limiting**: Tambahkan rate limiting untuk mencegah abuse
6. **Testing**: Tambahkan unit tests dan integration tests
7. **Environment Config**: Bisa pakai .env untuk configuration management
8. **Database Indexing**: Bisa tambahkan indexes untuk performance
9. **API Documentation**: Bisa pakai Swagger/OpenAPI untuk dokumentasi

