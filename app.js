// Ventana emergente de Bienvenida
Swal.fire({
    title: '¡Bienvenido!',
    text: 'Gracias por visitar nuestro sitio web!',
    icon: 'info',
    confirmButtonText: 'Aceptar'
});

class pregunta {
    constructor(texto, opcion, respuesta) {
        this.texto = texto;
        this.opcion = opcion;
        this.respuesta = respuesta;
    }
    esCorrecta(opcionSeleccionada) {
        return this.respuesta === this.opcion[opcionSeleccionada];
    }
}

class quiz {
    constructor(preguntas) {
        this.puntaje = 0;
        this.preguntas = preguntas;
        this.preguntaActualIndex = 0;
    }

    getPreguntaActual() {
        return this.preguntas[this.preguntaActualIndex];
    }

    correccion(opcionSeleccionada) {
        const preguntaActual = this.getPreguntaActual();
        if (preguntaActual.esCorrecta(opcionSeleccionada)) {
            this.puntaje++;
            Swal.fire("¡Correcto!", "¡Respuesta correcta!", "success");
        } else {
            Swal.fire("Incorrecto", "Respuesta incorrecta", "error");
        }
        this.preguntaActualIndex++;
    }

    finalizar() {
        return this.preguntaActualIndex >= this.preguntas.length;
    }
}

const preguntas = [
    new pregunta(
        "¿Cómo enfrentan los conflictos las personas inhibidas?",
        ["Evitan los conflictos", "No se sienten dueños de sus sentimientos", "Controlan los conflictos de forma eficiente", "Afrontan los conflictos de manera asertiva"],
        "No se sienten dueños de sus sentimientos"
    ),
    new pregunta(
        "¿Qué consecuencia tiene la inhibición en relación a las emociones?",
        ["Explosiones emocionales", "Supresión de emociones", "Control emocional adecuado", "Expresión emocional constante"],
        "Supresión de emociones"
    ),
    new pregunta(
        "¿Cómo se sienten las personas inhibidas con respecto a su dependencia de otras personas?",
        ["Les agrada la dependencia", "Quieren romper la dependencia pero no se atreven", "Se sienten completamente independientes", "No les molesta la dependencia"],
        "Quieren romper la dependencia pero no se atreven"
    ),
    new pregunta(
        "¿Cómo se comporta una persona inhibida frente a las expectativas de los demás?",
        ["Se adapta equilibradamente", "Las rechaza totalmente", "Crea sus propias reglas y expectativas", "Se adapta excesivamente"],
        "Se adapta excesivamente"
    ),
    new pregunta(
        "¿Cuál es una característica común de la inhibición?",
        ["Expresión adecuada de sentimientos y deseos", "Sumisión, pasividad y retraimiento", "Adaptación equilibrada a las reglas externas", "Priorización de intereses y derechos propios"],
        "Sumisión, pasividad y retraimiento"
    ),
    new pregunta(
        "¿Por qué las personas inhibidas se sienten mal cuando los demás no les responden como desean?",
        ["Porque son conscientes de sus propios intereses", "Porque expresan abiertamente lo que sienten y quieren", "Porque esperan que los demás adivinen sus necesidades", "Porque son asertivas al comunicarse con los demás"],
        "Porque esperan que los demás adivinen sus necesidades"
    ),
    new pregunta(
        "¿Por qué las personas inhibidas evitan el contacto ocular y hablan con voz baja e insegura?",
        ["Porque se sienten cómodas en las interacciones sociales", "Porque no les importa la opinión de los demás", "Porque muestran incomodidad al relacionarse con otras personas", "Porque son confiadas en sus comunicaciones"],
        "Porque muestran incomodidad al relacionarse con otras personas"
    ),
    new pregunta(
        "En un proyecto de programación en equipo, tienes dudas sobre cómo abordar un problema técnico y te preocupa que tus ideas no sean valoradas. ¿Cuál sería una respuesta asertiva en esta situación?",
        ["Expresar tu punto de vista de manera respetuosa", "Mantenerte en silencio y aceptar las decisiones del equipo", "Adaptarte a las ideas del equipo sin expresar tus propias dudas", "Esperar a que alguien más proponga una idea similar y apoyarla"],
        "Expresar tu punto de vista de manera respetuosa"
    ),
    new pregunta(
        "¿Cómo deberías actuar si tienes una idea para mejorar el proyecto en una reunión de trabajo pero te sientes inseguro/a de compartirla?",
        ["Compartir abiertamente tu idea y explicar sus beneficios", "Guardar la idea para ti y no compartirla", "Pedir permiso para hablar y mencionar tímidamente tu idea", "Esperar a que alguien más presente una idea similar y apoyarla"],
        "Compartir abiertamente tu idea y explicar sus beneficios"
    ),
    new pregunta(
        "¿Cómo deberías responder si alguien hace un comentario despectivo hacia ti durante una cena con amigos?",
        ["Abordar el comentario de manera respetuosa", "Ignorar el comentario y cambiar de tema rápidamente", "Reírte del comentario para evitar conflictos", "Retirarte de la situación sin decir nada"],
        "Abordar el comentario de manera respetuosa"
    ),
];

const quizInstance = new quiz(preguntas);

function desplegarPregunta() {
    const pregunta = quizInstance.getPreguntaActual();
    const opciones = pregunta.opcion
        .map((opcion, index) => {
            return `<li><label><input type="radio" name="opcion" value="${index}"> ${opcion}</label></li>`;
        })
        .join("");

    document.getElementById("quiz-container").innerHTML = `
        <div class="pregunta">${pregunta.texto}</div>
        <ul class="opcion">${opciones}</ul>
    `;
}

desplegarPregunta();

document.getElementById("submit-button").addEventListener("click", () => {
    const opcionSeleccionada = document.querySelector('input[name="opcion"]:checked');

    if (opcionSeleccionada === null) {
        Swal.fire({
            title: "Error",
            text: "Por favor, selecciona una opción de respuesta antes de enviar.",
            icon: "error",
            confirmButtonText: "Cerrar"
        });
        return;
    }

    const seleccionarOpcion = Number(opcionSeleccionada.value);
    quizInstance.correccion(seleccionarOpcion);

    if (quizInstance.finalizar()) {
        let mensaje = "";
        if (quizInstance.puntaje > 5) {
            mensaje = `Puntaje: ${quizInstance.puntaje} de ${quizInstance.preguntas.length}<br><br><span class="animate__animated animate__bounceIn animate__slower animate__infinite">¡Felicitaciones!</span>`;
            startConfetti(5000);
        } else {
            mensaje = `Puntaje: ${quizInstance.puntaje} de ${quizInstance.preguntas.length}<br><br>Debes mejorar tu escucha activa`;
        }

        Swal.fire({
            title: "Quiz Finalizado",
            html: mensaje,
            icon: "info",
            confirmButtonText: "Repetir Quiz",
            showCancelButton: false,
            onOpen: () => {
                const confirmButton = Swal.getConfirmButton();
                anime({
                    targets: confirmButton,
                    scale: [1, 1.1, 1],
                    duration: 1000,
                    loop: true,
                    easing: "easeInOutQuad"
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                resetQuiz();
            }
        });

    } else {
        desplegarPregunta();
    }
});

function resetQuiz() {
    quizInstance.puntaje = 0;
    quizInstance.preguntaActualIndex = 0;
    const quizContainer = document.getElementById("quiz-container");
    const confettiCanvas = document.getElementById("confetti-canvas");

    anime({
        targets: quizContainer,
        opacity: 0,
        duration: 500,
        easing: "easeOutQuad",
        complete: () => {
            desplegarPregunta();

            anime({
                targets: quizContainer,
                opacity: 1,
                duration: 500,
                easing: "easeInQuad"
            });

            confettiCanvas.innerHTML = "";
        }
    });
    // Ventana emergente de Bienvenida
    Swal.fire({
        title: '¡Bienvenido otra vez!',
        text: 'No has sido capaz de responder bien?',
        icon: 'info',
        confirmButtonText: 'Si'
    });
}


function startConfetti(duration) {
    const confettiSettings = {
        target: "confetti-canvas",
        max: "150",
        size: "2",
        animate: true,
        props: ["circle", "square", "triangle", "line"],
        colors: [[165, 104, 246], [230, 61, 135], [0, 199, 228], [253, 214, 126], [40, 180, 99]]
    };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    setTimeout(() => {
        confetti.clear();
    }, duration);
}