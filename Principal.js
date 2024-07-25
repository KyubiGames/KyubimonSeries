function mostrarImagenes() {
    const imagenesContenedor = document.getElementById('imagenes-contenedor');

    //Ejemplo de imágenes que se agregarán (puedes agregar las tuyas)
    const imagenes = [
        { src: 'Imágenes/Logos/WEBP/Pokemon Rubi.webp', url:'https://example.com/Pokémon-rubi', portada: 'Imágenes/Portadas/WEBP/Pokemon Rubi.webp', fondo: '#bf0106' },
        { src: 'Imágenes/Logos/WEBP/Pokeone.webp', url: 'https://example.com/pokemon-esmeralda', portada: 'Imágenes/Portadas/WEBP/Pokeone.webp', fondo: '#e5e5e5'},
        { src: 'Imágenes/Logos/WEBP/Pokemon Esmeralda.webp', url: 'https://example.com/pokemon-esmeralda', portada: 'Imágenes/Portadas/WEBP/Pokemon Esmeralda.webp', fondo: '#099556'},
        { src: 'Imágenes/Logos/WEBP/Pokemon Zafiro.webp', url: 'https://example.com/pokemon-zafiro', portada: 'Imágenes/Portadas/WEBP/Pokemon Zafiro.webp', fondo: '#1d6ab6'},
        { src: 'Imágenes/Logos/WEBP/Pokemon Amarillo.webp', url: 'https://example.com/pokemon-esmeralda', portada: 'Imágenes/Portadas/WEBP/Pokemon Amarillo.webp', fondo: '#f8ce4b'},
    ]; 

    //Limpiar el contenedor antes de agregar nuevas imágenes
    imagenesContenedor.innerHTML = '';

    //Agregar imágenes al contenedor
    imagenes.forEach(imagen => {
        const div = document.createElement('div');
        div.classList.add('imagen-contenedor');

        const a = document.createElement('a');
        a.href = imagen.url;
        a.target = '_blank'; // Abre en una nueva pestaña

        const img = document.createElement('img');
        img.src = imagen.src;

        // Añadir eventos de mouseover y mouseout
        img.addEventListener('mouseover', () => cambiarFondo(imagen.fondo, imagen.portada));
        img.addEventListener('mouseout', restaurarFondo);

        a.appendChild(img)
        div.appendChild(a);
        imagenesContenedor.appendChild(div);
    });

    // Añadir la clase para mostrar la animación
    setTimeout(() => {
        imagenesContenedor.classList.add('mostrar');
    }, 10); // Pequeña demora para asegurarse de que las imágenes se hayan agregado antes de iniciar la transición.
}

function cambiarFondo(color, portadaSrc) {
    const imagenesContenedor = document.getElementById('imagenes-contenedor');
    const botonSeries = document.getElementById('botón-series');
    const portadaContenedor = document.getElementById('portada-contenedor');

    imagenesContenedor.style.backgroundColor = color;
    botonSeries.style.backgroundColor = color;
    portadaContenedor.style.backgroundColor = color;

    // Mostrar la portada
    mostrarPortada(portadaSrc);
}

function restaurarFondo() {
    const imagenesContenedor = document.getElementById('imagenes-contenedor');
    const botonSeries = document.getElementById('botón-series');
    const portadaContenedor = document.getElementById('portada-contenedor');

    imagenesContenedor.style.backgroundColor = '';
    botonSeries.style.backgroundColor = '';
    portadaContenedor.style.backgroundColor = '';

    // Ocultar la portada
    ocultarPortada();
}

function mostrarPortada(portadaSrc) {
    const portadaContenedor = document.getElementById('portada-contenedor');
    portadaContenedor.innerHTML = ''; //Limpiar cualquier imagen anterior

    const img = document.createElement('img');
    img.src = portadaSrc;
    portadaContenedor.appendChild(img);

    portadaContenedor.style.display = 'block'; //Mostrar el contenedor de la portada
}

function ocultarPortada() {
    const portadaContenedor = document.getElementById('portada-contenedor');
    portadaContenedor.style.display = 'none'; //Ocultar el contenedor de la portada
    portadaContenedor.innerHTML = ''; // Limpiar la imagen
}

function ocultarImagenes() {
    const imagenesContenedor = document.getElementById('imagenes-contenedor');
    imagenesContenedor.classList.remove('mostrar'); // Ocultar con animación

    //Esperar que la animación de opacidad termine antes de limpiar el contenido
    setTimeout(() => {
        imagenesContenedor.innerHTML = ''; // Limpiar el contenido después de la transición
    }, 500);
}

function toggleMostrarOcultarImagenes() {
    const imagenesContenedor = document.getElementById('imagenes-contenedor');
    const botonSeries = document.getElementById('botón-series');

    if (imagenesContenedor.innerHTML === '') {
        mostrarImagenes();
        botonSeries.classList.add('mostrar-imagenes');
    } else {
        ocultarImagenes();
        botonSeries.classList.remove('mostrar-imagenes');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');

    let currentImage = 'image1';
    let rotateForward = true;
    let rotationAngle = 0;

    function toggleMode() {
        const body = document.body;

        // Alternar las clases de modo claro y oscuro en el cuerpo del documento
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
    }

    // Establecer el modo claro al cargar la página
    document.body.classList.add('light-mode');

    const switchImageAndMode = () => {
        if (currentImage === 'image1') {
            image1.classList.add('final-rotation');
            setTimeout(() => {
                image1.classList.remove('active', 'reverse', 'final-rotation');
                currentImage = 'image2';
                image2.classList.add('active');
                rotationAngle += 360;
                image1.style.transform = `rotate(${rotationAngle}deg)`;
                image2.style.transform = `rotate(${rotationAngle}deg)`;
                toggleMode(); // Cambiar a modo oscuro
            }, 500); // Cambia de imagen a la mitad de la rotación
        } else {
            image2.classList.add('final-rotation');
            setTimeout(() => {
                image2.classList.remove('active', 'reverse', 'final-rotation');
                currentImage = 'image1';
                image1.classList.add('active');
                rotationAngle += 360;
                image2.style.transform = `rotate(${rotationAngle}deg)`;
                image1.style.transform = `rotate(${rotationAngle}deg)`;
                toggleMode(); // Cambiar a modo claro
            }, 500); // Cambia de imagen a la mitad de la rotación
        }

        // Alternar la dirección de la rotación para la próxima vez
        rotateForward = !rotateForward;
    };

    image1.addEventListener('click', switchImageAndMode);
    image2.addEventListener('click', switchImageAndMode);
});
