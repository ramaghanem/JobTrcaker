# JobTrackr 🧑‍💼💼

JobTrackr is a full-stack job platform built with Laravel that connects job seekers with companies.

The system supports two main roles:
- Job Seekers
- Companies

Each role has its own dashboard and features.

---

## ✨ Features

### 👤 Job Seeker
- Register & login
- Browse job listings
- Search jobs by title or company
- Apply for jobs with CV upload (PDF / DOCX)
- View application status (Pending / Accepted / Rejected)
- Receive notifications when application status changes
- Jobseeker dashboard with statistics

### 🏢 Company
- Register & login as company
- Create, edit, and delete job listings
- View applicants for each job
- Download applicant CVs
- Accept or reject applications
- Company dashboard with statistics
- Notifications when new applications are submitted

---

## 🛠 Tech Stack

- Laravel 12
- PHP 8.4
- MySQL
- Tailwind CSS
- Blade Templates
- Laravel Notifications
- File Upload (Storage)

---

## 🚀 How to Run Locally

```bash
git clone https://github.com/safaaAlnhal-cloud/jobtrackr.git
cd jobtrackr
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan storage:link
npm run dev
php artisan serve
