import { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}

export default function ErrorMessage({children}: ErrorMessageProps) {
  return (
    <p className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 text-center">{children}</p>
  )
}
