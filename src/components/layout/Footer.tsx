import footerImg from '../../assets/footer_img.png';

export default function Footer() {
    return (
        <footer
            className="w-full h-[163px] flex items-center justify-center"
            style={{
                backgroundImage: `url(${footerImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <span className="text-white text-sm mt-12 font-medium drop-shadow">
                © 2025 SertifyEd. All rights reserved.
            </span>
        </footer>
    )
}