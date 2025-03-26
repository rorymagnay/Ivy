# Ivy - AI-Powered Essay Writing Platform

Ivy is a modern, AI-powered essay writing platform that helps students write better essays with real-time analysis, feedback, and improvement suggestions.

## Features

- 🤖 AI-powered essay analysis
- 📝 Real-time writing metrics
- 📊 Progress tracking
- 🔄 Auto-save functionality
- ⌨️ Keyboard shortcuts
- 📱 Responsive design
- 🔒 Secure authentication
- 📤 File upload support
- 📈 Analytics dashboard

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn UI
- Radix UI
- OpenAI API
- Prisma
- NextAuth.js
- PostgreSQL

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ivy.git
   cd ivy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Update the environment variables in `.env.local` with your values.

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub.
2. Import your repository to Vercel.
3. Add your environment variables in the Vercel dashboard.
4. Deploy!

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_APP_URL`: Your application URL
- `NEXT_PUBLIC_APP_NAME`: Your application name
- `NEXTAUTH_URL`: NextAuth.js URL
- `NEXTAUTH_SECRET`: NextAuth.js secret
- `DATABASE_URL`: Your database URL
- `OPENAI_API_KEY`: Your OpenAI API key

Optional environment variables:

- `EMAIL_SERVER_HOST`: Email server host
- `EMAIL_SERVER_PORT`: Email server port
- `EMAIL_SERVER_USER`: Email server username
- `EMAIL_SERVER_PASSWORD`: Email server password
- `EMAIL_FROM`: Email sender address

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@ivy.com or join our Slack channel. 