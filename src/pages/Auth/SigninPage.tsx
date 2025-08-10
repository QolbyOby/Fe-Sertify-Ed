import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router"
import type { User } from "../../type/User"

export default function SigninPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]")
        const foundUser = users.find((u) => u.email === email && u.password === password)

        if (!foundUser) {
            alert("Email atau password salah!")
            return
        }

        localStorage.setItem("currentUser", JSON.stringify(foundUser))
        navigate("/dashboard/layout-editor")
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">
                            <Link to="/signup">Sign Up</Link>
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label>Email</Label>
                            <Input type="email" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} required />
                        </div>
                        <div className="grid gap-2">
                            <Label>Password</Label>
                            <Input type="password" value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} required />
                        </div>
                        <Button type="submit" className="w-full">Sign In</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}








// import { Button } from "@/components/ui/button"
// import {
//     Card,
//     CardAction,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Link } from "react-router"

// export default function SigninPage() {
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen">
//             <Card className="w-full max-w-sm">
//                 <CardHeader>
//                     <CardTitle>Login to your account</CardTitle>
//                     <CardDescription>
//                         Enter your email below to login to your account
//                     </CardDescription>
//                     <CardAction>
//                         <Button variant="link">
//                             <Link to="/signup">Sign Up</Link>
//                         </Button>
//                     </CardAction>
//                 </CardHeader>
//                 <CardContent>
//                     <form>
//                         <div className="flex flex-col gap-6">
//                             <div className="grid gap-2">
//                                 <Label htmlFor="email">Email</Label>
//                                 <Input
//                                     id="email"
//                                     type="email"
//                                     placeholder="m@example.com"
//                                     required
//                                 />
//                             </div>
//                             <div className="grid gap-2">
//                                 <div className="flex items-center">
//                                     <Label htmlFor="password">Password</Label>
//                                     <a
//                                         href="#"
//                                         className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
//                                     >
//                                         Forgot your password?
//                                     </a>
//                                 </div>
//                                 <Input id="password" type="password" required />
//                             </div>
//                         </div>
//                     </form>
//                 </CardContent>
//                 <CardFooter className="flex-col gap-2">
//                     <Link to="/daftar-sertifikat" className="w-full ">
//                         <Button type="submit" className="w-full">
//                             Sign In
//                         </Button>
//                     </Link>
//                 </CardFooter>
//             </Card>
//         </div>
//     )
// }