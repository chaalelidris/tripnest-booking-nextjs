import Navbar from './components/Navbar/Navbar'
import './globals.css'
import { Inter, Nunito } from 'next/font/google'

export const metadata = {
  title: 'Tripnest',
  description: 'Tripnest booking',
}

const font = Nunito({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
