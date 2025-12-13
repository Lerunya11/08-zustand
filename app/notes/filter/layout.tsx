// app/notes/filter/layout.tsx
import type { ReactNode } from 'react';
import css from './LayoutNotes.module.css';

type NotesFilterLayoutProps = {
  children: ReactNode;  
  sidebar: ReactNode;   
};

const NotesFilterLayout = ({ children, sidebar }: NotesFilterLayoutProps) => {
  return (
    <section className={css.layout}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.content}>{children}</div>
    </section>
  );
};

export default NotesFilterLayout;
