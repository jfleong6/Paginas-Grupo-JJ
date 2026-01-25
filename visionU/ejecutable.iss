; --- SCRIPT DE INSTALACIÓN: VISION U - GRUPO JJ ---

[Setup]
AppName=VisionU
AppVersion=1.0.0
AppPublisher=Grupo JJ
AppPublisherURL=https://grupo-jj.web.app/
AppSupportURL=https://grupo-jj.web.app/
AppUpdatesURL=https://grupo-jj.web.app/
AppContact=Soporte Técnico Grupo JJ

; Configuración del Instalador
DefaultDirName={commonpf}\VisionU_GrupoJJ
DefaultGroupName=VisionU
OutputDir=output
OutputBaseFilename=Instalador_VisionU_v1.0
; Ruta al icono para el instalador
SetupIconFile=dist\VisionU_App\_internal\static\img\icono.ico
UninstallDisplayIcon={app}\VisionU_App.exe
Compression=lzma2/ultra64
SolidCompression=yes
PrivilegesRequired=admin

WizardStyle=modern
DisableWelcomePage=no
DisableFinishedPage=no

[Languages]
Name: "spanish"; MessagesFile: "compiler:Languages\Spanish.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked
Name: "startup"; Description: "Iniciar VisionU automáticamente al encender el PC"; GroupDescription: "Opciones adicionales:"

[Dirs]
; Permisos completos para evitar errores al generar PDFs temporales
Name: "{app}"; Permissions: users-full

[Files]
; 1. Ejecutable y dependencias principales
Source: "dist\VisionU_App\VisionU_App.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "dist\VisionU_App\_internal\*"; DestDir: "{app}\_internal"; Flags: ignoreversion recursesubdirs createallsubdirs

; 2. Recursos de la interfaz (Flask)
; IMPORTANTE: Se copian a {app}\templates y {app}\static para que app.py los encuentre
Source: "dist\VisionU_App\_internal\templates\*"; DestDir: "{app}\templates"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "dist\VisionU_App\_internal\static\*"; DestDir: "{app}\static"; Flags: ignoreversion recursesubdirs createallsubdirs

; 3. ARCHIVOS DE CONFIGURACIÓN Y PLANTILLA (Ruta Raíz)
; Estos archivos quedan al lado del .exe para que sean modificables
Source: "config_campos.json"; DestDir: "{app}"; Flags: confirmoverwrite
Source: "Hojas de respuestas - sesión2.pdf"; DestDir: "{app}"; Flags: ignoreversion

; 4. Si usas la carpeta plantilla por separado, inclúyela también
Source: "plantilla\*"; DestDir: "{app}\plantilla"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\VisionU"; Filename: "{app}\VisionU_App.exe"
Name: "{commondesktop}\VisionU"; Filename: "{app}\VisionU_App.exe"; Tasks: desktopicon
Name: "{userstartup}\VisionU"; Filename: "{app}\VisionU_App.exe"; Tasks: startup

[Run]
Filename: "{app}\VisionU_App.exe"; Description: "Lanzar VisionU ahora"; Flags: nowait postinstall skipifsilent

[UninstallDelete]
Type: filesandordirs; Name: "{app}\static\temp"
Type: files; Name: "{app}\*.log"

[Code]
function InitializeSetup(): Boolean;
var
  ResultCode: Integer;
begin
  Result := True;
  // Cerramos cualquier instancia previa para evitar errores de archivos bloqueados
  Exec('taskkill.exe', '/f /im VisionU_App.exe', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
end;