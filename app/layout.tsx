import './globals.css'

export const metadata = {
  title: 'web scraper with nextjs13 app router + typescript',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-900">{children}</body>
    </html>
  )
}
