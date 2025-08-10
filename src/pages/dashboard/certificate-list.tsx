"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText } from "lucide-react"
import { getSavedCertificates, getTemplate, getPositions } from "../dashboard/utils/localStorage"
import type { SavedCertificate } from "../../type/Certificate"
import { toast } from "sonner"
import { toPng } from "html-to-image"
import jsPDF from "jspdf"
import { QRCodeCanvas } from "qrcode.react"

const CANVAS_WIDTH = 1000
const CANVAS_HEIGHT = 700

export function CertificateList() {
    const [certificates, setCertificates] = useState<SavedCertificate[]>([])
    const [isGenerating, setIsGenerating] = useState<number | null>(null)

    // Refs untuk setiap sertifikat (agar bisa render ulang untuk snapshot)
    const previewRefs = useRef<Record<number, HTMLDivElement | null>>({})

    const loadCertificates = useCallback(() => {
        const saved = getSavedCertificates()
        setCertificates(saved)
    }, [])

    useEffect(() => {
        loadCertificates()
    }, [loadCertificates])

    // Fungsi generate image dari ref
    const generateCertificateImage = async (certificateId: number) => {
        const ref = previewRefs.current[certificateId]
        if (!ref) return null

        try {
            return await toPng(ref, {
                quality: 1.0,
                width: CANVAS_WIDTH,
                height: CANVAS_HEIGHT,
            })
        } catch (error) {
            console.error("Gagal generate image:", error)
            return null
        }
    }

    const downloadPNG = useCallback(async (certificate: SavedCertificate) => {
        setIsGenerating(certificate.id)
        try {
            const dataUrl = await generateCertificateImage(certificate.id)
            if (!dataUrl) return

            const link = document.createElement("a")
            link.download = `sertifikat-${certificate.nama_penerima.replace(/\s+/g, "-")}.png`

            link.href = dataUrl
            link.click()

            toast("Success", { description: "Sertifikat berhasil didownload sebagai PNG!" })
        } catch (error) {
            toast("Error", { description: "Gagal menggenerate PNG: " + error })
        } finally {
            setIsGenerating(null)
        }
    }, [])

    const downloadPDF = useCallback(async (certificate: SavedCertificate) => {
        setIsGenerating(certificate.id)
        try {
            const dataUrl = await generateCertificateImage(certificate.id)
            if (!dataUrl) return

            const pdf = new jsPDF({
                orientation: "landscape",
                unit: "px",
                format: [CANVAS_WIDTH, CANVAS_HEIGHT],
            })

            pdf.addImage(dataUrl, "PNG", 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
            pdf.save(`sertifikat-${certificate.nama_penerima.replace(/\s+/g, "-")}.pdf`)


            toast("Success", { description: "Sertifikat berhasil didownload sebagai PDF!" })
        } catch (error) {
            toast("Error", { description: "Gagal menggenerate PDF: " + error })
        } finally {
            setIsGenerating(null)
        }
    }, [])

    const template = getTemplate()
    const positions = getPositions() ?? {
        nama_penerima: { x: 0, y: 0 },
        nama_kursus: { x: 0, y: 0 },
        nama_penerbit: { x: 0, y: 0 },
        tanggal_penerbitan: { x: 0, y: 0 },
    }


    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold py-5">Daftar Sertifikat</h1>
                <div className="text-sm text-gray-500">Total: {certificates.length} sertifikat</div>
            </div>

            {/* Elemen hidden untuk snapshot sertifikat */}
            <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
                {certificates.map((certificate) => (
                    <div
                        key={`preview-${certificate.id}`}
                        ref={(el) => {
                            previewRefs.current[certificate.id] = el
                        }}
                        style={{
                            width: CANVAS_WIDTH,
                            height: CANVAS_HEIGHT,
                            background: "white",
                            position: "relative",
                        }}
                    >
                        <img
                            src={template || "/placeholder.svg"}
                            alt="Certificate Template"
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                left: positions.nama_penerima.x,
                                top: positions.nama_penerima.y,
                                transform: "translate(-50%, -50%)",
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "black",
                            }}
                        >
                            {certificate.nama_penerima}

                        </div>
                        <div
                            style={{
                                position: "absolute",
                                left: positions.nama_kursus.x,
                                top: positions.nama_kursus.y,
                                transform: "translate(-50%, -50%)",
                                fontSize: "18px",
                                fontWeight: "semibold",
                                color: "black",
                            }}
                        >
                            {certificate.nama_kursus}


                        </div>
                        <div
                            style={{
                                position: "absolute",
                                left: positions.nama_penerbit.x,
                                top: positions.nama_penerbit.y,
                                transform: "translate(-50%, -50%)",
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "black",
                            }}
                        >
                            {certificate.nama_penerbit}
                        </div>
                        <div
                            style={{
                                position: "absolute",
                                left: positions.tanggal_penerbitan.x,
                                top: positions.tanggal_penerbitan.y,
                                transform: "translate(-50%, -50%)",
                                fontSize: "18px",
                                color: "black",
                            }}
                        >
                            {new Date(certificate.tanggal_penerbitan).toLocaleDateString("id-ID", {

                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </div>

                        <div style={{ position: "absolute", bottom: "20px", right: "20px" }}>
                            <QRCodeCanvas
                                value={`https://contoh-link.com/verify/${certificate.id}`}
                                size={80}
                                bgColor="#ffffff"
                                fgColor="#000000"
                                level="H"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Sertifikat Tersimpan</CardTitle>
                </CardHeader>
                <CardContent>
                    {certificates.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                            <h3 className="text-lg font-medium mb-2">Belum ada sertifikat</h3>
                            <p className="text-gray-600 mb-4">Buat sertifikat pertama Anda di halaman Generator</p>
                            <Button asChild>
                                <a href="/generator">Buat Sertifikat</a>
                            </Button>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-16">No</TableHead>
                                    <TableHead>Nama Penerima</TableHead>
                                    <TableHead>Nama Kursus</TableHead>
                                    <TableHead>Tanggal Penerbitan</TableHead>
                                    <TableHead>Dibuat</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {certificates.map((certificate, index) => (
                                    <TableRow key={certificate.id}>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell>{certificate.nama_penerima}</TableCell>
                                        <TableCell>{certificate.nama_kursus}</TableCell>
                                        <TableCell>{certificate.nama_penerbit}</TableCell>

                                        <TableCell>{new Date(certificate.tanggal_penerbitan).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}</TableCell>
                                        <TableCell>{new Date(certificate.createdAt).toLocaleDateString("id-ID")}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => downloadPNG(certificate)}
                                                    disabled={isGenerating === certificate.id}
                                                    className="flex items-center gap-1"
                                                >
                                                    <Download className="h-3 w-3" />
                                                    PNG
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => downloadPDF(certificate)}
                                                    disabled={isGenerating === certificate.id}
                                                    className="flex items-center gap-1"
                                                >
                                                    <Download className="h-3 w-3" />
                                                    PDF
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
