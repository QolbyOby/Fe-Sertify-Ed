import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Download, Calendar, Mail, ShieldUser, CalendarX2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,

} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function CardSertifikat() {
    return (
        <Card className="max-w-sm">
            <CardHeader className="flex flex-row justify-between items-center">
                <div>
                    <CardTitle>UI/UX Design Masterclass</CardTitle>
                    <CardDescription>Digital School</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex items-center text-sm gap-2">
                        <ShieldUser className="h-4 w-4" />
                        <span>Sarah Williams</span>
                    </div>
                    <div className="flex items-center text-sm gap-2">
                        <Mail className="h-4 w-4" />
                        <span>sarah.w@example.com</span>
                    </div>
                    <div className="flex items-center text-sm gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Diterbitkan: 2023-07-05</span>
                    </div>
                    <div className="flex items-center text-sm gap-2">
                        <CalendarX2 className="h-4 w-4" />
                        <span>Kedaluwarsa: 2025-07-05</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full">
                            Lihat Detail
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xl">
                        <DialogHeader>
                            <DialogTitle>Detail Sertifikat</DialogTitle>
                            <DialogDescription>
                                Informasi lengkap tentang sertifikat ini.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                            <div>
                                <h4 className="font-medium text-gray-700">Informasi Penerima</h4>
                                <div className="mt-2 space-y-2 text-sm">
                                    <p><span className="text-gray-500">Nama:</span> <span className="font-medium">Sarah Williams</span></p>
                                    <p><span className="text-gray-500">Email:</span> <span className="font-medium">sarah.w@example.com</span></p>
                                    <p><span className="text-gray-500">Alamat:</span> <span className="font-medium">Jl. Thamrin No. 101, Medan</span></p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-700">Informasi Sertifikat</h4>
                                <div className="mt-2 space-y-2 text-sm">
                                    <p><span className="text-gray-500">Penerbit:</span> <span className="font-medium">Digital School</span></p>
                                    <p><span className="text-gray-500">Kursus:</span> <span className="font-medium">UI/UX Design Masterclass</span></p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-700">Tanggal Penerbitan</h4>
                                <p className="mt-2 text-sm font-medium">2023-07-05</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-700">Tanggal Kedaluwarsa</h4>
                                <p className="mt-2 text-sm font-medium">2025-07-05</p>
                            </div>
                        </div>

                        <div className="flex gap-2 justify-end pt-4 border-t">
                            <Button>
                                <Download className="mr-2 h-4 w-4" /> Unduh
                            </Button>
                            <Button>
                                <QrCode />
                                <span className="ml-2">QR Code</span>
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    )
}