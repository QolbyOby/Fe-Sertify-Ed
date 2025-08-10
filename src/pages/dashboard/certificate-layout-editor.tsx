"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Rnd } from "react-rnd"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Save, RotateCcw } from "lucide-react"
import { saveTemplate, savePositions, getTemplate, getPositions } from "../dashboard/utils/localStorage"
import type { CertificatePositions } from "../../type/Certificate"
import { toast } from "sonner"

const CANVAS_WIDTH = 1000
const CANVAS_HEIGHT = 700

const DEFAULT_POSITIONS: CertificatePositions = {
    nama_penerima: { x: 400, y: 300 },
    nama_penerbit: { x: 400, y: 510 },
    nama_kursus: { x: 400, y: 580 },
    tanggal_penerbitan: { x: 700, y: 550 },
}

export function CertificateLayoutEditor() {
    const [template, setTemplate] = useState<string | null>(null)
    const [positions, setPositions] = useState<CertificatePositions>(DEFAULT_POSITIONS)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Load saved data on component mount
    useState(() => {
        const savedTemplate = getTemplate()
        const savedPositions = getPositions()

        if (savedTemplate) setTemplate(savedTemplate)
        if (savedPositions) setPositions(savedPositions)
    })

    const handleFileUpload = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0]
            if (!file) return

            if (!file.type.startsWith("image/")) {
                toast("Error", {
                    description: "Please upload an image file (PNG/JPG)",
                })
                return
            }

            const reader = new FileReader()
            reader.onload = (e) => {
                const result = e.target?.result as string
                setTemplate(result)
            }
            reader.readAsDataURL(file)
        },
        [],
    )

    const handlePositionChange = useCallback((field: keyof CertificatePositions, x: number, y: number) => {
        setPositions((prev) => ({
            ...prev,
            [field]: { x, y },
        }))
    }, [])

    const handleSaveLayout = useCallback(() => {
        if (!template) {
            toast("Error", {
                description: "Please upload a template first",
            })
            return
        }

        saveTemplate(template)
        savePositions(positions)

        toast("Success", {
            description: "Layout saved successfully!",
        })
    }, [template, positions])

    const handleResetPositions = useCallback(() => {
        setPositions(DEFAULT_POSITIONS)
    }, [])

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-5">
                <div>
                    <h1 className="text-3xl font-bold text-white    ">Certificate Layout Editor</h1>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={handleResetPositions} className="flex items-center gap-2 bg-transparent">
                        <RotateCcw className="h-4 w-4" />
                        Reset Posisi
                    </Button>

                    <Button onClick={handleSaveLayout} className="flex items-center gap-2" disabled={!template}>
                        <Save className="h-4 w-4" />
                        Simpan Layout
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <div className="flex w-full gap-5">
                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle>Upload Template</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">

                            <div>
                                <Label htmlFor="template-upload">Template Sertifikat</Label>
                                <Input
                                    id="template-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    ref={fileInputRef}
                                    className="mt-2"
                                />
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full flex items-center gap-2"
                            >
                                <Upload className="h-4 w-4" />
                                Pilih File
                            </Button>

                            {template && <div className="text-sm text-green-600">✓ Template berhasil diupload</div>}
                        </CardContent>
                    </Card>
                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle>Koordinat Posisi:</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3 pt-4 border-t">
                                <div className="space-y-2 flex gap-5 text-sm">
                                    <div>
                                        <strong>Nama Penerima:</strong> x: {positions.nama_penerima.x}, y: {positions.nama_penerima.y}
                                    </div>
                                    <div>
                                        <strong>Nama Kursus:</strong> x: {positions.nama_kursus.x}, y: {positions.nama_kursus.y}
                                    </div>
                                    <div>
                                        <strong>Nama Penerbit:</strong> x: {positions.nama_penerbit.x}, y: {positions.nama_penerbit.y}
                                    </div>
                                    <div>
                                        <strong>Tanggal Penerbitan:</strong> x: {positions.tanggal_penerbitan.x}, y: {positions.tanggal_penerbitan.y}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Canvas Section */}
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Preview & Edit Layout</CardTitle>
                        <p className="text-sm text-gray-600">Drag placeholder teks untuk mengatur posisinya</p>
                    </CardHeader>
                    <CardContent>
                        <div className="relative flex items-center justify-center py-5 rounded-lg overflow-hidden">
                            <div className="relative bg-[#212121]" style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
                                {template ? (
                                    <>
                                        <img
                                            src={template || "/placeholder.svg"}
                                            alt="Certificate Template"
                                            className="absolute inset-0 w-full h-full object-contain"
                                            draggable={false}
                                        />

                                        {/* Draggable text placeholders */}
                                        <Rnd
                                            position={positions.nama_penerima}
                                            onDragStop={(_, d) => handlePositionChange("nama_penerima", d.x, d.y)}
                                            enableResizing={false}
                                            bounds="parent"
                                            className="flex items-center justify-center"
                                        >
                                            <div className="bg-blue-500 text-white px-3 py-2 rounded shadow-lg cursor-move text-sm font-medium"
                                                style={{ transform: "translate(-50%, -50%)" }}
                                            >
                                                {"{nama_penerima}"}
                                            </div>
                                        </Rnd>


                                        <Rnd
                                            position={positions.nama_kursus}
                                            onDragStop={(_, d) => handlePositionChange("nama_kursus", d.x, d.y)}
                                            enableResizing={false}
                                            bounds="parent"
                                            className="flex items-center justify-center"
                                        >
                                            <div className="bg-blue-500 text-white px-3 py-2 rounded shadow-lg cursor-move text-sm font-medium"
                                                style={{ transform: "translate(-50%, -50%)" }}
                                            >
                                                {"{nama_kursus}"}
                                            </div>
                                        </Rnd>

                                        <Rnd
                                            position={positions.nama_penerbit}
                                            onDragStop={(_, d) => handlePositionChange("nama_penerbit", d.x, d.y)}
                                            enableResizing={false}
                                            bounds="parent"
                                            className="flex items-center justify-center"
                                        >
                                            <div className="bg-blue-500 text-white px-3 py-2 rounded shadow-lg cursor-move text-sm font-medium"
                                                style={{ transform: "translate(-50%, -50%)" }}
                                            >
                                                {"{nama_penerbit}"}
                                            </div>
                                        </Rnd>
                                        <Rnd
                                            position={positions.tanggal_penerbitan}
                                            onDragStop={(_, d) => handlePositionChange("tanggal_penerbitan", d.x, d.y)}
                                            enableResizing={false}
                                            bounds="parent"
                                            className="flex items-center justify-center"
                                        >
                                            <div className="bg-green-500 text-white px-3 py-2 rounded shadow-lg cursor-move text-sm font-medium"
                                                style={{ transform: "translate(-50%, -50%)" }}
                                            >
                                                {"{penerbitan}"}
                                            </div>
                                        </Rnd>
                                    </>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                        <div className="text-center">
                                            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                            <p>Upload template sertifikat untuk mulai mengedit</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
