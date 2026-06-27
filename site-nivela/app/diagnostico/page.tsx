import fs from 'fs';
import path from 'path';

export default function DiagnosticoCMS() {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  
  let files: string[] = [];
  try {
    if (fs.existsSync(postsDirectory)) {
      files = fs.readdirSync(postsDirectory);
    }
  } catch (e) {
    console.error(e);
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', background: '#0f172a', color: '#f8fafc', minHeight: '100vh' }}>
      <h1>Validação de Estrutura de Conteúdo</h1>
      <p>Status: {files.length > 0 ? 'Funcional' : 'Pasta vazia ou não encontrada'}</p>
      <h2>Arquivos em content/posts:</h2>
      <ul>
        {files.map(file => <li key={file}>{file}</li>)}
      </ul>
    </div>
  );
}