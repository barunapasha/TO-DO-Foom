#  Todo Tracker Test Frontend
# 1. Cara Menjalankan Proyek

Untuk menjalankan proyek ini di lingkungan pengembangan lokal Anda, ikuti langkah-langkah berikut:

1.  **Prasyarat:** Pastikan Anda memiliki **Node.js**, dan **bun** atau **npm** terinstal.
2.  **Instalasi Dependensi:** Proyek ini memerlukan dependensi yang tercantum dalam `package.json`.
    ```bash
    bun install
    # atau
    npm install
    ```
3.  **Menjalankan Server Pengembangan:**
    ```bash
    bun run dev
    # atau
    npm dev
    ```
4.  **Akses Aplikasi:** Buka peramban Anda dan navigasi ke `http://localhost:3000` (atau *port* yang ditunjukkan di konsol).

# 2. Keputusan Desain
1. **Framework & Bahasa:** Menggunakan **Next.js 14** (App Router) dan **TypeScript** untuk pengembangan aplikasi React yang modern, terstruktur, dan *type-safe*.

2. **Styling:** Menggunakan **Tailwind CSS** untuk implementasi UI yang cepat dan *utility-first*. Gaya global didefinisikan dalam `globals.css`.

3. **State Management Sederhana:** State aplikasi (daftar *todos*, status *loading*, dan *error*) dikelola menggunakan **React Hooks** (`useState` dan `useEffect`) di komponen utama (`page.tsx`).

4. **Client Components:** Komponen yang menangani interaksi pengguna dan *state* lokal, seperti `page.tsx`, `TodoForm.tsx`, dan `TodoItem.tsx`, ditandai sebagai *Client Components* dengan `'use client'`.

5. **Data Fetching:** Fungsi API (misalnya, `fetchTodos`, `createTodo`) diimpor dari `@/lib/api` dan dipanggil langsung di komponen untuk memuat data saat aplikasi di-mount dan setelah operasi CRUD yang sukses (seperti menambahkan atau menghapus *todo*).


# 3. Peningkatan yang Mungkin (Possible Improvements)
1. **Global State Management:** Pertimbangkan untuk menggunakan *library* manajemen *state* terpusat (seperti Zustand, Jotai, atau Redux Toolkit) untuk skala aplikasi yang lebih besar, daripada hanya bergantung pada *state* lokal dan *props drilling* sederhana.

2. **Optimasi Data Fetching:** Menggunakan *library* seperti **SWR** atau **React Query (TanStack Query)** untuk:
    * Mencapai *caching* data.
    * *Automatic revalidation* (memuat ulang data secara otomatis).
    * Manajemen *loading* dan *error state* yang lebih granular.
3. **Notifikasi Pengguna:** Ganti penggunaan fungsi `alert()` (di `TodoForm.tsx` dan `TodoItem.tsx`) dengan sistem notifikasi UI yang lebih baik (*toasts* atau *snackbar*) untuk memberikan umpan balik non-intrusif pada operasi sukses atau gagal.

4. **Validasi Formulir:** Terapkan validasi formulir yang lebih kuat pada `TodoForm.tsx` (selain hanya memeriksa *title* tidak kosong) dan berikan umpan balik validasi visual langsung di bawah *input*.

5. **Testing:** Menambahkan *unit tests* untuk komponen React dan fungsi API menggunakan *library* seperti Jest/Vitest dan React Testing Library.