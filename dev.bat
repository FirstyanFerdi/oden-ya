@echo off
echo ==================================================
echo   Kedai Oden - Berteduh dari Hujan (Oden-ya)
echo ==================================================

if not exist "node_modules\" (
    echo [INFO] Dependensi belum terpasang.
    echo [INFO] Memasang dependensi otomatis...
    call npm install
    if errorlevel 1 (
        echo [INFO] npm gagal, mencoba dengan yarn...
        call corepack yarn install
    )
)

echo.
echo [OK] Menjalankan server lokal...
echo [OK] Buka http://localhost:5173 di peramban Anda.
echo.
call npm run dev
if errorlevel 1 (
    node node_modules\vite\bin\vite.js
)
pause
