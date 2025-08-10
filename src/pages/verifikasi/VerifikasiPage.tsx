import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";
import sertifikat from "@/assets/sertifikat.png";
import QrScanner from "qr-scanner"; // npm install qr-scanner
import { toast } from "sonner";
import Lottie from 'lottie-react';
import successAnim from "@/assets/lottie/notification.json";

export default function VerifikasiPage() {
    const [qrPreview, setQrPreview] = useState<string | null>(null);
    const [qrResult, setQrResult] = useState<string | null>(null);
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(false);

    // Upload & preview QR Code (belum verifikasi)
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Preview QR Code
        const reader = new FileReader();
        reader.onload = () => setQrPreview(reader.result as string);
        reader.readAsDataURL(file);

        // Decode QR untuk simpan hasilnya (tapi belum verifikasi)
        try {
            const result = await QrScanner.scanImage(file);
            setQrResult(result);
        } catch (err) {
            console.error("Gagal membaca QR Code:", err);
            alert("Gagal membaca QR Code!");
        }
    };

    // Klik verifikasi setelah upload
    const handleVerify = () => {
        if (!qrResult) {
            alert("Silakan upload QR Code terlebih dahulu!");
            return;
        }
        setLoading(true);
        setVerified(false);

        // Simulasi proses loading 3 detik
        setTimeout(() => {
            if (qrResult.includes("sertifikat/123456")) {
                setVerified(true);
            } else {
                alert("QR Code tidak valid!");
                setVerified(false);
            }
            setLoading(false);
            toast.custom(() => (
                <div className="flex items-center gap-6 p-4 bg-white rounded-lg shadow-lg">
                    <div className="w-24 h-24">
                        <Lottie animationData={successAnim} loop={false} />
                    </div>
                    <div >
                        <p className="font-semibold text-gray-800">Berhasil!</p>
                        <p className="text-gray-500 text-sm">
                            Sertifikat telah diverifikasi.
                        </p>
                    </div>
                </div>
            ))
        }, 3000);
    };

    return (
        <div className="flex flex-col items-center justify-center py-44">
            <Card>
                <CardContent>
                    <div className="flex">
                        {/* Upload QR Code */}
                        <div className="w-96 space-y-4">
                            <h3 className="text-white font-semibold text-lg">Scan QR Code</h3>

                            <div className="bg-neutral-800 rounded-2xl p-8 h-[335px] flex flex-col items-center justify-center">
                                {qrPreview ? (
                                    <img
                                        src={qrPreview}
                                        alt="QR Preview"
                                        className="max-h-[250px] object-contain"
                                    />
                                ) : (
                                    <Download className="w-16 h-16 text-white mb-4" />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="text-white text-sm mt-4"
                                />
                            </div>

                            <Button
                                className="w-full"
                                onClick={handleVerify}
                                disabled={loading}
                            >
                                {loading ? "Memverifikasi..." : "Verify Certificate"}
                            </Button>
                        </div>

                        {/* Pemisah */}
                        <div className="flex flex-col items-center justify-center px-7 overflow-hidden">
                            <Separator orientation="vertical" className="h-fit" />
                            <span className="text-white text-sm py-2">OR</span>
                            <Separator orientation="vertical" />
                        </div>

                        {/* Input Manual */}
                        <div className="w-72 space-y-4">
                            <h3 className="text-white font-semibold text-lg">Enter Certificate ID</h3>

                            <div className="space-y-4">
                                <Input placeholder="Masukkan ID sertifikat" />
                                <Button
                                    className="w-full"
                                    onClick={() => {
                                        setLoading(true);
                                        setTimeout(() => {
                                            setVerified(true);
                                            setLoading(false);
                                        }, 3000);
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? "Memverifikasi..." : "Verify Certificate"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Hasil verifikasi */}
            {verified && (
                <div className="mt-6 animate-fadeIn">
                    <h2 className="text-white text-xl font-bold mb-4">Sertifikat Terverifikasi ✅</h2>
                    <img
                        src={sertifikat}
                        alt="Sertifikat"
                        className="max-w-2xl rounded-lg shadow-lg"
                    />
                </div>
            )}
        </div>
    );
}





// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import { Download } from "lucide-react";

// export default function VerifikasiPage() {
//     return (
//         <div
//             className="flex flex-col items-center justify-center min-h-screen"
//         >
//             <Card className="">
//                 <CardContent>
//                     <div className="flex">
//                         <div className="w-96 space-y-4">
//                             <h3 className="text-white font-semibold text-lg">Scan QR Code</h3>

//                             <div className="bg-neutral-800 rounded-2xl p-8 h-[335px] flex items-center justify-center">
//                                 <div className="text-center">
//                                     <Download className="w-16 h-16 text-white " />
//                                 </div>
//                             </div>

//                             <p className="text-gray-300 text-sm">
//                                 Upload certificate QR code
//                             </p>
//                         </div>

//                         <div className="flex flex-col items-center justify-center px-7 overflow-hidden">
//                             <Separator orientation="vertical" className="h-fit" />
//                             <span className="text-white text-sm py-2">OR</span>
//                             <Separator orientation="vertical" />
//                         </div>

//                         <div className="w-72 space-y-4">
//                             <h3 className="text-white font-semibold text-lg">Enter Certificate ID</h3>

//                             <div className="space-y-4">
//                                 <Input />
//                                 <Button className="w-full">
//                                     Verify Certificate
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }