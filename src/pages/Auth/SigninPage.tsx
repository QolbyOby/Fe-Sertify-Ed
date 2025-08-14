import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function SigninPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>(""); // Default value for easier testing
    const [password, setPassword] = useState<string>(""); // Default value for easier testing
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("https://sertifyed-seven.vercel.app/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Email atau password salah!");
            }

            // Buat objek currentUser baru dari data API dan input form
            // Karena API tidak mengembalikan nama, kita gunakan email sebagai nama sementara
            const currentUserData = {
                name: email, // Menampilkan email di sidebar
                email: email,
                accessToken: result.data.accessToken,
                refreshToken: result.data.refreshToken,
                // Properti lain diisi string kosong agar sesuai dengan tipe data User
                password: '',
                institutionName: '',
                address: '',
                ethereumAddress: ''
            };

            // Simpan data sesi pengguna ke localStorage
            localStorage.setItem("currentUser", JSON.stringify(currentUserData));

            // Arahkan ke dashboard
            navigate("/dashboard/layout-editor");

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan";
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

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
                            <Input
                                type="email"
                                value={email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Password</Label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}