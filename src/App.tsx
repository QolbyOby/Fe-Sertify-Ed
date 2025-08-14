import { useEffect } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/home/HomePage";
import SertifikatPage from "./pages/sertifikat/SertifikatPage";
import VerifikasiPage from "./pages/verifikasi/VerifikasiPage";
import SigninPage from "./pages/Auth/SigninPage";
import SignupPage from "./pages/Auth/SignupPage";
import { Toaster } from "sonner";
import { CertificateGenerator } from "./pages/dashboard/certificate-generator";
import { CertificateList } from "./pages/dashboard/certificate-list";
import { CertificateLayoutEditor } from "./pages/dashboard/certificate-layout-editor";
import Layout from "./pages/dashboard/layout";
import MainLayout from "./pages/layout";

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  return (
    <div className="flex min-h-svh flex-col relative">

      <div className="pointer-events-none absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-purple-900 via-fuchsia-900 to-blue-900 opacity-60 blur-[160px] mix-blend-lighten" />
      <div className="pointer-events-none absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-900 via-purple-900 to-fuchsia-900 opacity-50 blur-[140px] mix-blend-lighten" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-fuchsia-900 via-purple-900 to-blue-900 opacity-40 blur-[140px] mix-blend-lighten" />
      
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/cetak-sertifikat" element={<SertifikatPage />} />
          <Route path="/verifikasi" element={<VerifikasiPage />} />
        </Route>
        <Route path="/dashboard" element={<Layout />}>
          <Route path="generator" element={<CertificateGenerator />} />
          <Route path="certificates" element={<CertificateList />} />
          <Route path="layout-editor" element={<CertificateLayoutEditor />} />
        </Route>
      </Routes>
      <Toaster position="top-center" />
    </div>
  )
}

export default App