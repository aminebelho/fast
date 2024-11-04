import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
    <head>
      <title>Mon Tableau de Bord de Tâches</title>
    </head>
    <body>{children}</body>
  </html>
  );
}
