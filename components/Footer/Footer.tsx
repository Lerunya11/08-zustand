// components/Footer/Footer.tsx
import css from './Footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {year} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Valeriia Kachanova</p>
          <p>
            Contact us:{' '}
            <a href="mailto:student@notehub.app">student@notehub.app</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
