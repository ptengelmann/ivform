import './globals.css'

export const metadata = {
  title: 'IV Creative - Project Brief',
  description: 'Project brief questionnaire for IV Creative clients',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}