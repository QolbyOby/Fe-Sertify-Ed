import { Link } from 'react-router';
import logo from '../../assets/logo.png';
import { Button } from '../ui/button';

export default function Navbar() {
    return (
        <nav className="absolute top-0 left-0 w-full text-card-foreground shadow-md py-4 px-10 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center ">
                    <div className='flex items-center space-x-2'>
                        <img src={logo} alt="logo" className='w-14' />
                        <Link to="/" className="text-xl font-bold">
                            SertifyEd
                        </Link>
                    </div>
                    
                </div>
                <div className="flex items-center space-x-4">
                    <Link to="/cetak-sertifikat" className="text-sm hover:text-primary">
                        Cetak Sertifikat
                    </Link>
                    <Link to="/verifikasi" className="text-sm hover:text-primary">
                        Verifikasi
                    </Link>
                    <div className="border-l border-gray-300 h-6"></div>
                    <Button>
                        <Link to="/signin" className="text-sm">
                            Login
                        </Link>
                    </Button>
                </div>
            </div>
        </nav>
    )
}