import type { CertificatePositions, SavedCertificate } from "../../../type/Certificate"

export const STORAGE_KEYS = {
    CERTIFICATE_TEMPLATE: "certificateTemplate",
    CERTIFICATE_POSITIONS: "certificatePositions",
    SAVED_CERTIFICATES: "savedCertificates",
} as const

export const saveTemplate = (template: string) => {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATE_TEMPLATE, template)
}

export const getTemplate = (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.CERTIFICATE_TEMPLATE)
}

export const savePositions = (positions: CertificatePositions) => {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATE_POSITIONS, JSON.stringify(positions))
}

export const getPositions = (): CertificatePositions | null => {
    const positions = localStorage.getItem(STORAGE_KEYS.CERTIFICATE_POSITIONS)
    return positions ? JSON.parse(positions) : null
}

export const saveCertificate = (certificate: SavedCertificate) => {
    const certificates = getSavedCertificates()
    certificates.push(certificate)
    localStorage.setItem(STORAGE_KEYS.SAVED_CERTIFICATES, JSON.stringify(certificates))
}

export const getSavedCertificates = (): SavedCertificate[] => {
    const certificates = localStorage.getItem(STORAGE_KEYS.SAVED_CERTIFICATES)
    return certificates ? JSON.parse(certificates) : []
}

export const deleteCertificate = (id: number) => {
    const certificates = getSavedCertificates()
    const filtered = certificates.filter((cert) => cert.id !== id)
    localStorage.setItem(STORAGE_KEYS.SAVED_CERTIFICATES, JSON.stringify(filtered))
}
