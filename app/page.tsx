// app/page.tsx
import css from './Home.module.css';

export default function HomePage() {
  return (
    <main className={css.container}>
      <div>
        <h1 className={css.title}>Welcome to NoteHub</h1>

        <p className={css.description}>
          NoteHub is a simple and efficient application for managing personal notes. 
          It helps you keep your thoughts organized and accessible in one place — whether youre at home or on the go.
        </p>

        <p className={css.description}>
          The app provides an intuitive interface for creating, editing, and viewing notes. 
          With features like keyword search and structured organization, NoteHub offers a clean and productive 
          environment for everyone who values clarity and efficiency.
        </p>
      </div>
    </main>
  );
}
