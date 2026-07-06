import about from '../data/about'

export default function AppFooter() {
  // TODO-08: Thẻ footer lấy động các thông tin từ about.js
    return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container d-flex align-items-center justify-content-center gap-3">
        <img src={about.logo} alt="logo" width="24" height="24" />
        <span>{about.copyright} | {about.course} | {about.version}</span>
      </div>
    </footer>
  )
    }
