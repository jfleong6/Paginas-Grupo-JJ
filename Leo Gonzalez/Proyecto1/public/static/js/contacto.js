// Por esto:
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBv9Z4i5GnXJBjtvsE-ASV5XV7gQbZiOrg",
  authDomain: "lego-tech.firebaseapp.com",
  projectId: "lego-tech",
  storageBucket: "lego-tech.firebasestorage.app",
  messagingSenderId: "587009192781",
  appId: "1:587009192781:web:07e04cd2e7cbf41b55bd04",
  measurementId: "G-SHMFHFCG7N"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const contactoForm = document.querySelector('.form-contacto');

contactoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // 1. Capturar los datos del formulario
  const formData = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    telefono: document.getElementById('telefono').value,
    evento: document.getElementById('evento').value,
    mensaje: document.getElementById('mensaje').value
  };

  try {
    // 2. Crear el documento en la colección "mail"
    await addDoc(collection(db, "mail"), {
      to: 'lego1031@gmail.com',
      // Importante: El "from" debe usar tu dominio verificado en Resend
      from: 'Grupo JJ <contacto@lego-tech.online>', 
      replyTo: formData.email, 
      message: {
        subject: `Formulario de Contacto - ${formData.nombre}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #000; padding: 20px; text-align: center;">
              <h1 style="color: #fff; margin: 0; font-size: 24px;">LEGO TECH</h1>
              <p style="color: #ccc; margin: 0; font-size: 14px;">Parte de Grupo JJ</p>
            </div>
            <div style="padding: 30px; line-height: 1.6; color: #333;">
              <h2 style="color: #000; border-bottom: 2px solid #f4f4f4; padding-bottom: 10px;">Nuevo Cliente Interesado</h2>
              <p>Has recibido un nuevo mensaje desde el portal corporativo de <strong>www.lego-tech.online</strong>.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Nombre:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.nombre}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Correo:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Teléfono:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.telefono || 'No proporcionado'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Evento:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.evento}</td>
                </tr>
              </table>

              <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
                <strong>Mensaje:</strong><br>
                ${formData.mensaje}
              </div>
            </div>
            <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777;">
              <p>© 2026 Grupo JJ | Todos los derechos reservados.<br>
              Este es un correo automático generado por el sistema de contacto.</p>
            </div>
          </div>
        `,
      },
    });

    alert("¡Mensaje enviado con éxito!");
    contactoForm.reset(); // Limpiar formulario

  } catch (error) {
    console.error("Error al enviar:", error);
    alert("Hubo un error al enviar el mensaje.");
  }
});