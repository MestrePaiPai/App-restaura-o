const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let nextProcess;
const isDev = !app.isPackaged;
const appPort = process.env.PORT || '4123';

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, maxTries = 60) {
  for (let i = 0; i < maxTries; i += 1) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status < 500) return true;
    } catch (_) {
      // keep trying
    }
    await wait(500);
  }
  return false;
}

function startNextProdServer() {
  const nodeExe = process.execPath;
  const nextBin = path.join(process.resourcesPath, 'app.asar.unpacked', 'node_modules', 'next', 'dist', 'bin', 'next');
  const cwd = app.getAppPath();

  nextProcess = spawn(nodeExe, [nextBin, 'start', '-p', appPort], {
    cwd,
    env: { ...process.env, NODE_ENV: 'production' },
    stdio: 'pipe'
  });

  nextProcess.stderr.on('data', (d) => console.error(`[next] ${d}`));
  nextProcess.stdout.on('data', (d) => console.log(`[next] ${d}`));
}

async function createWindow() {
  const win = new BrowserWindow({
    width: 1300,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, 'preload.cjs')
    }
  });

  const url = isDev ? 'http://localhost:3000' : `http://localhost:${appPort}`;
  const ready = await waitForServer(url);

  if (!ready) {
    await dialog.showMessageBox(win, {
      type: 'error',
      title: 'Erro ao iniciar aplicação',
      message: 'Não foi possível iniciar a interface gráfica da aplicação.'
    });
    app.quit();
    return;
  }

  await win.loadURL(url);
}

app.whenReady().then(async () => {
  if (!isDev) startNextProdServer();
  await createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  if (nextProcess && !nextProcess.killed) nextProcess.kill('SIGTERM');
});
