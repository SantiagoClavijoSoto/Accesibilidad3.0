
const originalFontSizes = new Map();
let timeoutId;

// Almacenar los tamaños de fuente originales al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, div, li, span, label').forEach(element => {
        // Omitir elementos dentro del modal
        if (element.closest('#modalAcc')) {
            return;
        }
        let fontSize = window.getComputedStyle(element).fontSize;
        originalFontSizes.set(element, fontSize);
    });

    document.querySelectorAll('#contet1, #contet2, #contet3, #contet5, #contet6, #contet7, #contet8, #contet9, #contet10, #contet11, #contet12, #bton1, #bton2, #bton3, #bton4, #bton5, #bton6, #bton7, #bton8, #bton9, #bton10').forEach(element => {
        element.addEventListener('mouseenter', function () {
            // Cancelar el timeout si ya existe uno
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            // Agregar un retraso antes de agregar la clase 'active'
            timeoutId = setTimeout(() => {
                this.classList.add('active');
            }, 0);
        });

        element.addEventListener('mouseleave', function () {
            // Cancelar el timeout si ya existe uno
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            // Quitar la clase 'active' inmediatamente
            this.classList.remove('active');
        });
    });
});

function changeFontSize(element, change) {
    // Omitir elementos dentro del modal
    if (element.closest('#modalAcc')) {
        return;
    }

    let fontSize = parseFloat(window.getComputedStyle(element).fontSize);

    if ((fontSize >= 46 && change > 0) || (fontSize <= 6 && change < 0)) {
        return;
    }
    element.style.fontSize = `${fontSize + change}px`;
}

function increaseFontSize() {
    document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, li, span, label').forEach(element => {
        // Omitir elementos dentro del modal
        if (!element.closest('#modalAcc')) {
            changeFontSize(element, 5);
        }
    });
}

function resetFontSize() {
    // Restablecer a los tamaños de fuente originales
    originalFontSizes.forEach((originalFontSize, element) => {
        if (!element.closest('#modalAcc')) {
            element.style.fontSize = originalFontSize;
        }
    });
}

function decreaseFontSize() {
    document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, li, span, label').forEach(element => {
        // Omitir elementos dentro del modal
        if (!element.closest('#modalAcc')) {
            changeFontSize(element, -1);
        }
    });
}

var myModal = new bootstrap.Modal(document.getElementById('modalAcc'), {
    backdrop: false
});

myModal._element.addEventListener('shown.bs.modal', function () {
    document.body.style.overflowY = 'visible';
});

myModal._element.addEventListener('hidden.bs.modal', function () {
    document.body.style.overflowY = 'auto';
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'm' && event.ctrlKey) {
        if (myModal._isShown) {
            myModal.hide();
        } else {
            myModal.show();
        }
    }
});

var hasModalOpenedBefore = false;
var messageModal = new bootstrap.Modal(document.getElementById('messageModal'));

myModal._element.addEventListener('shown.bs.modal', function () {
    if (!hasModalOpenedBefore && window.innerWidth > 1100) {
        messageModal.show();
        hasModalOpenedBefore = true;
    }
    document.body.style.overflowY = 'visible';
});

document.getElementById('acceptButton').addEventListener('click', function () {
    messageModal.hide();
});