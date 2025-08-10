import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Wallet, CircleCheck } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import sertifikat from "@/assets/sertifikat.png";
import { Loader2 } from "lucide-react"
import Lottie from "lottie-react";
import animationempty from "@/assets/lottie/No Data.json";


export default function SertifikatPage() {
    const [connected, setConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const [loading, setLoading] = useState(false)
    const qrRef = useRef<HTMLDivElement>(null);

    // Simulasi connect wallet
    const handleConnectWallet = async () => {
        setLoading(true);
        // Simulasi proses koneksi 2 detik
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setWalletAddress("0x71C7...976F");
        setConnected(true);
        setLoading(false);
    };

    // Download sertifikat PNG statis
    const handleDownloadCertificate = () => {
        const link = document.createElement("a");
        link.href = sertifikat;
        link.download = "sertifikat.png";
        link.click();
    };

    // Download QR code
    const handleDownloadQRCode = () => {
        if (!qrRef.current) return;
        const canvas = qrRef.current.querySelector("canvas");
        if (!canvas) return;

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "qrcode.png";
        link.click();
    };

    return (
        <div className="flex flex-col items-center min-h-screen">
            {/* Header */}
            <div className="flex w-full max-w-6xl px-3 mt-36 justify-between">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
                    Sertifikat
                </h1>
                {!connected ? (
                    <Button onClick={handleConnectWallet} disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Connecting...
                            </>
                        ) : (
                            <>
                                <Wallet className="mr-2" />
                                Connect Wallet
                            </>
                        )}
                    </Button>
                ) : (
                    <Button variant="outline">
                        <Wallet className="mr-2" />
                        {walletAddress}
                    </Button>
                )}
            </div>

            {!connected && (
                <div className="h-[800px] w-[800px] pt-10">
                    <Lottie animationData={animationempty} loop={true} />
                </div>
            )}

            {/* Konten setelah wallet connect */}
            {connected && (
                <div className="max-w-6xl w-full">
                    <Card className="mt-9 w-fit">
                        <CardContent className="flex items-center gap-4">
                            <CircleCheck />
                            <div className="font-semibold text-lg">Wallet Connected</div>
                            <Badge>{walletAddress}</Badge>
                        </CardContent>
                    </Card>

                    <h1 className="font-bold text-lg my-5">Daftar Sertifikat</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <CardContent>
                                <img
                                    src={sertifikat}
                                    className="w-full h-full"
                                    alt="Sertifikat"
                                />
                            </CardContent>
                            <CardFooter className="flex gap-2">
                                <Button
                                    onClick={handleDownloadCertificate}
                                    className="flex-1"
                                >
                                    Download PNG
                                </Button>
                                <Button
                                    onClick={handleDownloadQRCode}
                                    className="flex-1"
                                >
                                    Download QR Code
                                </Button>
                            </CardFooter>

                            {/* QR Code hidden untuk download */}
                            <div ref={qrRef} className="hidden">
                                <QRCodeCanvas
                                    value="https://contoh-link-verifikasi.com/sertifikat/123456"
                                    size={150}
                                    bgColor="#ffffff"
                                    fgColor="#000000"
                                    level="H"
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}





// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Wallet, CircleCheck } from "lucide-react";
// import { QRCodeCanvas } from "qrcode.react";
// import sertifikat from "@/assets/sertifikat.png";
// import { useRef } from "react";

// export default function SertifikatPage() {
//     const qrRef = useRef<HTMLDivElement>(null);

//     // Download sertifikat PNG statis
//     const handleDownloadCertificate = () => {
//         const link = document.createElement("a");
//         link.href = sertifikat; // langsung ambil dari assets
//         link.download = "sertifikat.png";
//         link.click();
//     };

//     // Download QR code
//     const handleDownloadQRCode = () => {
//         if (!qrRef.current) return;
//         const canvas = qrRef.current.querySelector("canvas");
//         if (!canvas) return;

//         const link = document.createElement("a");
//         link.href = canvas.toDataURL("image/png");
//         link.download = "qrcode.png";
//         link.click();
//     };

//     return (
//         <div className="flex flex-col items-center min-h-screen">
//             <div className="flex w-full max-w-6xl px-3 mt-36 justify-between">
//                 <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
//                     Sertifikat
//                 </h1>
//                 <Button>
//                     <Wallet />
//                     Connect Wallet
//                 </Button>
//             </div>

//             <div className="max-w-6xl w-full">
//                 <Card className="mt-9 w-fit">
//                     <CardContent className="flex items-center gap-4">
//                         <CircleCheck />
//                         <div className="font-semibold text-lg">Wallet Connected</div>
//                         <Badge>0x71C7...976F</Badge>
//                     </CardContent>
//                 </Card>

//                 <h1 className="font-bold text-lg my-5">Daftar Sertifikat</h1>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <Card>
//                         <CardContent>
//                             <img src={sertifikat} className="w-full h-full" alt="Sertifikat" />
//                         </CardContent>
//                         <CardFooter className="flex gap-2">
//                             <Button onClick={handleDownloadCertificate} className="flex-1">
//                                 Download PNG
//                             </Button>
//                             <Button onClick={handleDownloadQRCode} className="flex-1">
//                                 Download QR Code
//                             </Button>
//                         </CardFooter>

//                         {/* QR Code hidden untuk diunduh */}
//                         <div ref={qrRef} className="hidden">
//                             <QRCodeCanvas
//                                 value="https://contoh-link-verifikasi.com/sertifikat/123456"
//                                 size={150}
//                                 bgColor="#ffffff"
//                                 fgColor="#000000"
//                                 level="H"
//                             />
//                         </div>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     );
// }






// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter} from "@/components/ui/card";
// import { Wallet, CircleCheck } from "lucide-react";
// import sertifikat from "@/assets/sertifikat.png"

// export default function SertifikatPage() {
//     return (
//         <div className="flex flex-col items-center  min-h-screen">
//             <div className="flex w-full max-w-6xl px-3  mt-36 justify-between">
//                 <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Sertifikat</h1>
//                 <Button>
//                     <Wallet />
//                     0x71C7...976F
//                 </Button>
//             </div>
//             <div className="max-w-6xl w-full">
//                 <Card className="mt-9 w-fit">
//                     <CardContent className="flex items-center gap-4">
//                         <CircleCheck />
//                         <div className="font-semibold text-lg ">Wallet Connected</div>
//                         <Badge>0x71C7...976F</Badge>
//                     </CardContent>
//                 </Card>
//                 <h1 className="font-bold text-lg my-5">Daftar Sertifikat</h1>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <Card>
//                         <CardContent>
//                             <img src={sertifikat} className="w-full h-full" alt="" />
//                         </CardContent>
//                         <CardFooter className="flex gap-2">
//                             <Button className="flex-1">Download PNG</Button>
//                             <Button className="flex-1">Download QR Code</Button>
//                         </CardFooter>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     )
// }