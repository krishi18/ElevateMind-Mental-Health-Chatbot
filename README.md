# ElevateMind: Your Personal Mental Wellness Journey

ElevateMind is a web application designed to help you proactively manage and improve your mental well-being.  It provides a secure and user-friendly platform to track your mood, stress levels, and personal reflections, empowering you to gain valuable insights and cultivate positive mental health habits.

**Visit the live website:** https://elevatemind.onrender.com/


## Key Features:

* **Daily Check-ins:** Effortlessly log your daily mood (1-10 rating), stress levels, and personal thoughts.  The intuitive interface and autosave feature make it simple to maintain a consistent record of your mental state.

* **Data Visualization:**  Gain a clear understanding of your mental health trends with interactive charts displaying your mood and stress levels over time.  Identify patterns, track your progress, and celebrate your achievements.

* **Secure & Private:** Your data is handled with the utmost care and security.  We employ robust measures, including JWT authentication, bcrypt password hashing, HTTPS encryption, and input sanitization, to ensure the confidentiality and integrity of your information.

* **Personalized Profile:** Create a personalized profile with a profile picture (using Cloudinary), manage your notification preferences, and maintain control over your data.

* **Email Reminders:** Set personalized email reminders to maintain consistency with your mental wellness practices.

* **Responsive Design:** Access ElevateMind seamlessly from any device – desktop, tablet, or mobile phone – thanks to its fully responsive design.  Accessibility best practices are implemented throughout the application.

* **SEO Optimized:**  ElevateMind is optimized for search engines, making it easier for others to discover this valuable resource.


## Technology Stack:

ElevateMind is built using a robust and modern technology stack:

* **Frontend:** React, Tailwind CSS, Framer Motion, Chart.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Authentication:** JWTs (JSON Web Tokens), bcrypt
* **Image Hosting:** Cloudinary
* **Email Service:** Nodemailer
* **Deployment:** Render (Frontend & Backend)
* **Analytics:** Google Analytics


## Getting Started (For Developers):

1. **Clone the Repository:** `git clone https://github.com/MaThanMiThun1999/ElevateMind`
2. **Backend Setup:**
    * Navigate to the backend directory: `cd server`
    * Install dependencies: `npm install`
    * Create a `.env` file:  Copy the `.env.example` file and populate it with your API keys, database connection string, and other environment variables.  **Keep your environment variables secure!**
3. **Frontend Setup:**
    * Navigate to the frontend directory: `cd client`
    * Install dependencies: `npm install`
4. **Run the Application:**
    * Start the backend server: `npm start` (in the `server` directory)
    * Start the frontend development server: `npm run dev` (in the `client` directory)


## Contributing:

We welcome contributions from the community! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.


## Security:

Security is a top priority. ElevateMind implements these key security features:

* **JWT Authentication:** Secure session management.
* **bcrypt Hashing:** Strong password protection.
* **HTTPS Encryption:** Secure communication.
* **Input Sanitization:** Protection against XSS attacks.
* **Email Verification:** Enhanced account security.
* **Regular Security Audits:**  Proactive vulnerability identification and remediation.


## License:
Copyright (c) 2024 MaThanMiThun1999

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



## Navigation:

* [Features](./docs/Features.md):  Detailed overview of ElevateMind's features.
* [API Documentation](./docs/API.md): Comprehensive API reference for developers.
* [System Architecture](./docs/Architecture.md):  Technical overview of the application's architecture.