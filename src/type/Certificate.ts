export interface Position {
    x: number
    y: number
}

export interface CertificatePositions {
    nama_penerima: Position
    nama_penerbit: Position
    nama_kursus: Position
    tanggal_penerbitan: Position
}

export interface SavedCertificate {
    id: number
    nama_penerima: string
    nama_penerbit: string
    nama_kursus: string
    tanggal_penerbitan: string
    createdAt: string
}

export interface CertificateData {
    nama_penerima: string
    nama_penerbit: string
    nama_kursus: string
    tanggal_penerbitan: string
}
