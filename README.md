# DriveFleet — Car Rental Platform

A full-stack premium car rental platform built with Next.js and Express. Users can browse vehicles, book cars, manage their listings, and handle everything through a clean dark automotive-themed interface.

🔗 **Live Site:** [https://ph-assignment-9-indol.vercel.app](https://ph-assignment-9-indol.vercel.app)  
🖥️ **Server Repo:** [https://github.com/u2404057-cuet/ph-assignment-9-server](https://github.com/u2404057-cuet/ph-assignment-9-server)

---

## Features

- Secure email/password and Google OAuth authentication via Better Auth with JWT stored in HTTP-only cookies
- Full car listing management — add, edit, and delete your own vehicles with live availability toggling
- Booking system with driver request option, special notes, and automatic booking count tracking
- Search by car name and filter by car type using MongoDB `$regex` on the Explore Cars page
- Clean responsive UI across mobile, tablet, and desktop built with HeroUI and Tailwind CSS

---

## Tech Stack

| Side | Stack |
|------|-------|
| Frontend | Next.js (Pages Router), Tailwind CSS, HeroUI |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | Better Auth, Google OAuth 2.0, JWT |

---

## Getting Started

```bash
git clone https://github.com/u2404057-cuet/ph-assignment-9.git
cd ph-assignment-9
npm install
npm run dev
```

---

## Environment Variables

```env
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

---

## Author

**Rahimul Hoque** — Student ID: 2404057, CUET
