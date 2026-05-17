import './globals.css'

export const metadata = {
  title: 'GenAI Chat',
  description: 'An intelligent AI assistant for code, ideas, and more.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
