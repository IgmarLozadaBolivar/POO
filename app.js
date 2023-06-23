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
        }
        this.preguntaActualIndex++;
    }

    finalizar() {
        return this.preguntaActualIndex >= this.preguntas.length;
    }
}

const preguntas = [
    new pregunta(
        "Cual de los siguientes lenguajes no pertenece a la Programacion Orientada a Objetos?",
        ["Python", "TypeScript", "PHP", "Cython"],
        "Cython"
    ),
    new pregunta(
        "Cual es el lenguaje mas utilizado?",
        ["Python", "C++", "Java", "Todas son correctas"],
        "Todas son correctas"
    ),
    new pregunta(
        "Cuales es el lenguaje menos utilizado?",
        ["C", "JavaScript", "Java", "PHP"],
        "C"
    )
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
        Swal.fire({
            title: "Quiz Finalizado",
            html: `Puntaje: ${quizInstance.puntaje} de ${quizInstance.preguntas.length}<br><br><span class="animate__animated animate__bounceIn animate__slower animate__infinite">¡Felicitaciones!</span>`,
            icon: "info",
            confirmButtonText: "Repetir Quiz",
            showCancelButton: false
        }).then((result) => {
            if (result.isConfirmed) {
                resetQuiz();
            }
        });

        startConfetti(5000);
    } else {
        desplegarPregunta();
    }
});

function resetQuiz() {
    quizInstance.puntaje = 0;
    quizInstance.preguntaActualIndex = 0;
    desplegarPregunta();
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