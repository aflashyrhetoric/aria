import Head from 'next/head'
import { useState, useEffect } from 'react'
import { getAllUsers } from './api/api-helpers'
import { User } from '.prisma/client'

export default function Home() {
  const [users, setUsers] = useState<User[]>([])

  const initializeUsers = async () => {
    const u = await getAllUsers()
    setUsers(u)
  }

  useEffect(() => {
    initializeUsers()
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        {users.length > 0 && (
          <>
            {users.map(u => (
              <ul>
                <li>Name: {u.name}</li>
                <li>Email: {u.email}</li>
              </ul>
            ))}
          </>
        )}
      </main>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
