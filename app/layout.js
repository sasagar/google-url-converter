import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Google driveのURLを直リンにする君',
  description: 'Google driveの共有URLを直リンクのURLに変えてくれるはずの子',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-slate-800 text-slate-100`}>{children}</body>
    </html>
  )
}
