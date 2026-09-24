const codespaceName = process.env.CODESPACE_NAME;

export const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';