"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Download, Save } from "lucide-react"
import { getTemplate, getPositions, saveCertificate } from "../dashboard/utils/localStorage"
import type { CertificateData, CertificatePositions } from "../../type/Certificate"
import { toast } from "sonner";
import { toPng } from "html-to-image"
import jsPDF from "jspdf"

const CANVAS_WIDTH = 1000
const CANVAS_HEIGHT = 700

export function CertificateGenerator() {
    const [template, setTemplate] = useState<string | null>(null)
    const [positions, setPositions] = useState<CertificatePositions | null>(null)
    const [formData, setFormData] = useState<CertificateData>({
        nama_penerima: "",
        nama_penerbit: "",
        nama_kursus: "",
        tanggal_penerbitan: "",
    })
    const [isGenerating, setIsGenerating] = useState(false)
    const canvasRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const savedTemplate = getTemplate()
        const savedPositions = getPositions()

        if (!savedTemplate || !savedPositions) {
            toast("Template tidak ditemukan", {
                description: "Silakan buat layout terlebih dahulu di Layout Editor",
            })
            return
        }

        setTemplate(savedTemplate)
        setPositions(savedPositions)
    }, [])

    const handleInputChange = useCallback((field: keyof CertificateData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }, [])

    const handleCreateCertificate = useCallback(() => {
        if (!formData.nama_penerima || !formData.nama_penerbit || !formData.nama_kursus || !formData.tanggal_penerbitan) {
            toast("Error", {
                description: "Semua field harus diisi",
            })

            return
        }

        const certificate = {
            id: Date.now(),
            ...formData,
            createdAt: new Date().toISOString(),
        }

        saveCertificate(certificate)
        toast("Success", {
            description: "Sertifikat berhasil dibuat dan disimpan!",
        })

    }, [formData])

    const downloadAsPNG = useCallback(async () => {
        if (!canvasRef.current) return

        setIsGenerating(true)
        try {
            const dataUrl = await toPng(canvasRef.current, {
                quality: 1.0,
                width: CANVAS_WIDTH,
                height: CANVAS_HEIGHT,
                style: {
                    transform: "scale(1)",
                    transformOrigin: "top left",
                },
            })

            const link = document.createElement("a")
            link.download = `sertifikat-${formData.nama_penerima.replace(/\s+/g, "-")}.png`

            link.href = dataUrl
            link.click()

            toast("Success", {
                description: "Sertifikat berhasil didownload sebagai PNG!",
            })
        } catch (error) {
            toast("Error", {
                description: "Gagal menggenerate PNG" + error,

            })
        } finally {
            setIsGenerating(false)
        }
    }, [formData.nama_penerima])


    const downloadAsPDF = useCallback(async () => {
        if (!canvasRef.current) return

        setIsGenerating(true)
        try {
            const dataUrl = await toPng(canvasRef.current, {
                quality: 1.0,
                width: CANVAS_WIDTH,
                height: CANVAS_HEIGHT,
            })

            const pdf = new jsPDF({
                orientation: "landscape",
                unit: "px",
                format: [CANVAS_WIDTH, CANVAS_HEIGHT],
            })

            pdf.addImage(dataUrl, "PNG", 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
            pdf.save(`sertifikat-${formData.nama_penerima.replace(/\s+/g, "-")}.pdf`)


            toast("Success", {
                description: "Sertifikat berhasil didownload sebagai PDF!",
            })

        } catch (error) {
            toast("Error", {
                description: "Gagal menggenerate PDF" + error,
            })
        } finally {
            setIsGenerating(false)
        }
    }, [formData.nama_penerima])


    if (!template || !positions) {
        return (
            <div className="flex items-center justify-center h-96">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                            <h3 className="text-lg font-medium mb-2">Template Tidak Ditemukan</h3>
                            <p className="text-gray-600 mb-4">Silakan buat layout terlebih dahulu di Layout Editor</p>
                            <Button asChild>
                                <a href="/layout-editor">Buka Layout Editor</a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold py-5">Certificate Generator</h1>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex gap-5">
                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle>Data Sertifikat</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="nama">Nama Penerima</Label>
                                <Input
                                    id="nama"
                                    value={formData.nama_penerima}
                                    onChange={(e) => handleInputChange("nama_penerima", e.target.value)}
                                    placeholder="Masukkan nama penerima"
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label htmlFor="kursus">Nama Kursus</Label>
                                <Input
                                    id="kursus"
                                    value={formData.nama_kursus}
                                    onChange={(e) => handleInputChange("nama_kursus", e.target.value)}
                                    placeholder="Masukkan nama kursus"
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label htmlFor="penerbit">Nama Penerbit</Label>
                                <Input
                                    id="penerbit"
                                    value={formData.nama_penerbit}
                                    onChange={(e) => handleInputChange("nama_penerbit", e.target.value)}
                                    placeholder="Masukkan nama penerbit"
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label htmlFor="tanggal">Tanggal Penerbitan</Label>
                                <Input
                                    id="tanggal"
                                    type="date"
                                    value={formData.tanggal_penerbitan}
                                    onChange={(e) => handleInputChange("tanggal_penerbitan", e.target.value)}
                                    className="mt-2"
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle>Cetak Sertifikat</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 pt-4 border-t">
                                <Button
                                    onClick={handleCreateCertificate}
                                    className="w-full flex items-center gap-2"
                                    disabled={!formData.nama_penerima || !formData.nama_penerbit || !formData.nama_kursus || !formData.tanggal_penerbitan}

                                >
                                    <Save className="h-4 w-4" />
                                    Create & Save
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={downloadAsPNG}
                                    className="w-full flex items-center gap-2 bg-transparent"
                                    disabled={!formData.nama_penerima || !formData.nama_penerbit || !formData.nama_kursus || !formData.tanggal_penerbitan || isGenerating}

                                >
                                    <Download className="h-4 w-4" />
                                    Download PNG
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={downloadAsPDF}
                                    className="w-full flex items-center gap-2 bg-transparent"
                                    disabled={!formData.nama_penerima || !formData.nama_penerbit || !formData.nama_kursus || !formData.tanggal_penerbitan || isGenerating}

                                >
                                    <Download className="h-4 w-4" />
                                    Download PDF
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview Section */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Preview Sertifikat</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="border flex items-center justify-center rounded-lg overflow-hidden">

                            <div ref={canvasRef} className="relative bg-white" style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
                                <img
                                    src={template || "/placeholder.svg"}
                                    alt="Certificate Template"
                                    className="absolute inset-0 w-full h-full object-contain"
                                    draggable={false}
                                />

                                {/* Text overlays */}
                                <div
                                    className="absolute text-xl font-bold text-black"
                                    style={{
                                        left: positions.nama_penerima.x,
                                        top: positions.nama_penerima.y,
                                        transform: "translate(-50%, -50%)",
                                    }}
                                >
                                    {formData.nama_penerima || "nama_penerima"}

                                </div>

                                <div
                                    className="absolute text-lg font-semibold text-black"
                                    style={{
                                        left: positions.nama_kursus.x,
                                        top: positions.nama_kursus.y,
                                        transform: "translate(-50%, -50%)",
                                    }}
                                >
                                    {formData.nama_kursus || "nama_kursus"}
                                </div>
                                <div
                                    className="absolute text-xl font-bold text-black"
                                    style={{
                                        left: positions.nama_penerbit.x,
                                        top: positions.nama_penerbit.y,
                                        transform: "translate(-50%, -50%)",
                                    }}
                                >
                                    {formData.nama_penerbit || "nama_penerbit"}
                                </div>

                                <div
                                    className="absolute text-lg text-black"
                                    style={{
                                        left: positions.tanggal_penerbitan.x,
                                        top: positions.tanggal_penerbitan.y,
                                        transform: "translate(-50%, -50%)",
                                    }}
                                >
                                    {formData.tanggal_penerbitan
                                        ? new Date(formData.tanggal_penerbitan).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })
                                        : "penerbitan"}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
