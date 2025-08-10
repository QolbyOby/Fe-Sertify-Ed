export type CertificateStatus = 'tertunda' | 'diterbitkan' | 'dicabut';

export interface Certificate {
    id: number;
    namaPenerima: string;
    emailPenerima: string;
    alamatPenerima: string;
    namaPenerbit: string;
    namaKursus: string;
    tanggalPenerbitan: string;
    tanggalKedaluwarsa: string;
    status: CertificateStatus;
}

export const dummyCertificates: Certificate[] = [
    // {
    //     id: 1,
    //     namaPenerima: "John Doe",
    //     emailPenerima: "john.doe@example.com",
    //     alamatPenerima: "Jl. Merdeka No. 123, Jakarta",
    //     namaPenerbit: "Academy Tech",
    //     namaKursus: "Pengembangan Web Modern",
    //     tanggalPenerbitan: "2023-05-15",
    //     tanggalKedaluwarsa: "2025-05-15",
    //     status: "diterbitkan",
    // },
    // {
    //     id: 2,
    //     namaPenerima: "Jane Smith",
    //     emailPenerima: "jane.smith@example.com",
    //     alamatPenerima: "Jl. Sudirman No. 456, Bandung",
    //     namaPenerbit: "Digital School",
    //     namaKursus: "Data Science Fundamentals",
    //     tanggalPenerbitan: "2023-06-20",
    //     tanggalKedaluwarsa: "2024-06-20",
    //     status: "tertunda",
    // },
    // {
    //     id: 3,
    //     namaPenerima: "Michael Johnson",
    //     emailPenerima: "michael.j@example.com",
    //     alamatPenerima: "Jl. Gatot Subroto No. 789, Surabaya",
    //     namaPenerbit: "Code Institute",
    //     namaKursus: "Full-Stack Development",
    //     tanggalPenerbitan: "2022-11-10",
    //     tanggalKedaluwarsa: "2024-11-10",
    //     status: "dicabut",
    // },
    // {
    //     id: 4,
    //     namaPenerima: "Sarah Williams",
    //     emailPenerima: "sarah.w@example.com",
    //     alamatPenerima: "Jl. Thamrin No. 101, Medan",
    //     namaPenerbit: "UX Design School",
    //     namaKursus: "UI/UX Design Masterclass",
    //     tanggalPenerbitan: "2023-07-05",
    //     tanggalKedaluwarsa: "2025-07-05",
    //     status: "diterbitkan",
    // },
    // {
    //     id: 5,
    //     namaPenerima: "David Brown",
    //     emailPenerima: "david.b@example.com",
    //     alamatPenerima: "Jl. Asia Afrika No. 202, Yogyakarta",
    //     namaPenerbit: "Cloud Academy",
    //     namaKursus: "AWS Certified Solutions Architect",
    //     tanggalPenerbitan: "2023-08-12",
    //     tanggalKedaluwarsa: "2026-08-12",
    //     status: "tertunda",
    // },
    // {
    //     id: 6,
    //     namaPenerima: "Emily Davis",
    //     emailPenerima: "emily.d@example.com",
    //     alamatPenerima: "Jl. Diponegoro No. 303, Bali",
    //     namaPenerbit: "Cyber Security Institute",
    //     namaKursus: "Ethical Hacking",
    //     tanggalPenerbitan: "2022-09-18",
    //     tanggalKedaluwarsa: "2024-09-18",
    //     status: "dicabut",
    // },
    // {
    //     id: 7,
    //     namaPenerima: "Robert Wilson",
    //     emailPenerima: "robert.w@example.com",
    //     alamatPenerima: "Jl. Pemuda No. 404, Semarang",
    //     namaPenerbit: "AI Research Center",
    //     namaKursus: "Machine Learning Advanced",
    //     tanggalPenerbitan: "2023-09-01",
    //     tanggalKedaluwarsa: "2025-09-01",
    //     status: "diterbitkan",
    // }
];