import subprocess
import os
FFMPEG_PATH = r"C:\ffmpeg\bin\ffmpeg.exe"
def comprimir_video(
    input_video,
    output_video,
    max_width=1280,
    crf=23,
    preset="slow"
):
    """
    Comprime un video manteniendo la relación de aspecto y optimizándolo para web.

    Parámetros:
    - input_video: ruta del video original
    - output_video: ruta del video comprimido
    - max_width: ancho máximo permitido (default 1280)
    - crf: calidad (18 = muy alta, 23 = balance, 28 = más compresión)
    - preset: velocidad de compresión (slow = mejor compresión)
    """

    if not os.path.exists(input_video):
        raise FileNotFoundError("El archivo de entrada no existe")

    comando = [
    FFMPEG_PATH,
    "-i", input_video,
    "-vf", f"scale='min({max_width},iw)':-2",
    "-c:v", "libx264",
    "-profile:v", "high",
    "-pix_fmt", "yuv420p",
    "-crf", str(crf),
    "-preset", preset,
    "-movflags", "+faststart",
    "-c:a", "aac",
    "-b:a", "128k",
    "-y",
    output_video
]

    subprocess.run(comando, check=True)
    print("✅ Video comprimido correctamente")
    
comprimir_video(
    input_video="public\\static\\video\\portada movil.mp4",
    output_video="video.mp4"
)