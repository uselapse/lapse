import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Resource Not Found</h2>
      <Link href="/">Return</Link>
    </div>
  )
}
