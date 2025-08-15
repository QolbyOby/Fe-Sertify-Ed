import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import type { User } from "../../type/User"

export default function SignupPage() {
    const navigate = useNavigate()
    const [form, setForm] = useState<User>({
        email: "",
        password: "",
        name: "",
        institutionName: "",
        address: "",
        ethereumAddress: "",
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]")

        if (users.find((u) => u.email === form.email)) {
            alert("Email sudah terdaftar!")
            return
        }

        users.push(form)
        localStorage.setItem("users", JSON.stringify(users))

        alert("Sign up berhasil! Silakan login.")
        navigate("/signin")
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>Enter your email below to create your account</CardDescription>
                    <CardAction>
                        <Button variant="link">
                            <Link to="/signin">Sign In</Link>
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <div className="flex-1 grid gap-2">
                                <Label>Email</Label>
                                <Input id="email" type="email" value={form.email} onChange={handleChange} required />
                            </div>
                            <div className="flex-1 grid gap-2">
                                <Label>Password</Label>
                                <Input id="password" type="password" value={form.password} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Name</Label>
                            <Input id="name" value={form.name} onChange={handleChange} required />
                        </div>
                        <div className="grid gap-2">
                            <Label>Institution Name</Label>
                            <Input id="institutionName" value={form.institutionName} onChange={handleChange} required />
                        </div>
                        <div className="grid gap-2">
                            <Label>Address</Label>
                            <Input id="address" value={form.address} onChange={handleChange} required />
                        </div>
                        <div className="grid gap-2">
                            <Label>Ethereum Address</Label>
                            <Input id="ethereumAddress" value={form.ethereumAddress} onChange={handleChange} required />
                        </div>
                        <Button type="submit" className="w-full">Sign Up</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
