# JobTracker Project
University project
# JobTrackr 🧑‍💼💼

> A full-stack web application that streamlines the job search and application process — connecting job seekers with companies in one seamless platform.

---

## ✨ Features

**For Job Seekers**
- Register & log in to a personal account
- Browse job listings without logging in
- Search jobs by title or company name
- View full job details
- Apply for jobs with CV upload (PDF/DOCX)
- Receive notifications on application status
- Track all applications from a personal dashboard

**For Companies**
- Post, edit, and delete job listings
- Toggle job status (open / closed)
- View all applicants per job
- Download applicant CVs
- Accept or reject applications

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript (Blade Templates) |
| Backend | PHP / Laravel |
| Database | MySQL |
| Authentication | Laravel Session Auth |
| File Storage | Laravel Storage (local) |
| Notifications | Database Notifications |

---

## 🚀 How to Run Locally

### Prerequisites
- PHP >= 8.0
- Composer
- MySQL
- Node.js & npm

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/jobtrackr.git
cd jobtrackr

# 2. Install PHP dependencies
composer install

# 3. Install JS dependencies
npm install && npm run dev

# 4. Set up environment
cp .env.example .env
php artisan key:generate

# 5. Configure your database in .env
DB_DATABASE=jobtrackr
DB_USERNAME=root
DB_PASSWORD=

# 6. Run migrations
php artisan migrate

# 7. Create storage symlink
php artisan storage:link

# 8. Start the server
php artisan serve
```

Then open your browser at **http://localhost:8000**

---

## 👩‍💻 Team

| Name | ID |
|---|---|
| Safaa Alnhal | 220220363 |
| Nada Muhaisen | 220221071 |
| Rama Ghanem | 220222537 |
| Wedad Abu Jamea | 220221125 |
| Aya Habib | 220220221 |
| Eman Daher | 220223013 |
| Tasaheel Alshaghnoubi | 220211244 |
| Nesma Abu-Seifan | 220220263 |

---

*Submitted to Eng. Belal B Shawish*
